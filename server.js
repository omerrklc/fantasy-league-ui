const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = __dirname;
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const OAUTH_MAX_AGE_MS = 10 * 60 * 1000;

function loadEnv() {
  const envPath = path.join(root, '.env');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

loadEnv();

const config = {
  clientId: process.env.YAHOO_CLIENT_ID || '',
  clientSecret: process.env.YAHOO_CLIENT_SECRET || '',
  redirectUri: process.env.YAHOO_REDIRECT_URI || 'http://localhost:8787/auth/yahoo/callback',
  leagueKey: process.env.YAHOO_LEAGUE_KEY || '',
  port: Number(process.env.PORT || 8787),
  production: process.env.NODE_ENV === 'production',
};

const oauthRequests = new Map();
const browserSessions = new Map();

function securityHeaders(extra = {}) {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    ...extra,
  };
}

function json(res, status, payload, extraHeaders = {}) {
  res.writeHead(status, securityHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  }));
  res.end(JSON.stringify(payload));
}

function redirect(res, location, cookies = []) {
  const headers = securityHeaders({ Location: location, 'Cache-Control': 'no-store' });
  if (cookies.length) headers['Set-Cookie'] = cookies;
  res.writeHead(302, headers);
  res.end();
}

function requestCookies(req) {
  const cookies = {};
  for (const part of (req.headers.cookie || '').split(';')) {
    const separator = part.indexOf('=');
    if (separator < 1) continue;
    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    try { cookies[name] = decodeURIComponent(value); } catch { cookies[name] = value; }
  }
  return cookies;
}

function cookie(name, value, maxAge) {
  const parts = [`${name}=${encodeURIComponent(value)}`, 'Path=/', `Max-Age=${maxAge}`, 'SameSite=Lax', 'HttpOnly'];
  if (config.production || config.redirectUri.startsWith('https://')) parts.push('Secure');
  return parts.join('; ');
}

function activeSession(req) {
  const id = requestCookies(req).emac_session;
  const session = id ? browserSessions.get(id) : null;
  if (!session) return null;
  if (session.expiresAt <= Date.now()) {
    browserSessions.delete(id);
    return null;
  }
  return session;
}

function createSession(token, profile) {
  const id = crypto.randomBytes(32).toString('base64url');
  const session = {
    id,
    token,
    profile,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  browserSessions.set(id, session);
  return session;
}

function cleanupMemory() {
  const now = Date.now();
  for (const [state, request] of oauthRequests) {
    if (now - request.createdAt > OAUTH_MAX_AGE_MS) oauthRequests.delete(state);
  }
  for (const [id, session] of browserSessions) {
    if (session.expiresAt <= now) browserSessions.delete(id);
  }
}

function pkceChallenge(verifier) {
  return crypto.createHash('sha256').update(verifier).digest('base64url');
}

async function yahooProfile(idToken, expectedNonce) {
  if (!idToken) throw new Error('Yahoo ID Token dönmedi');
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Geçersiz Yahoo ID Token');
  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  const certResponse = await fetch('https://api.login.yahoo.com/openid/v1/certs');
  if (!certResponse.ok) throw new Error('Yahoo imza anahtarları alınamadı');
  const { keys = [] } = await certResponse.json();
  const jwk = keys.find(key => key.kid === header.kid && key.alg === header.alg);
  if (!jwk || !['ES256', 'RS256'].includes(header.alg)) throw new Error('Yahoo imza anahtarı geçersiz');
  const algorithm = header.alg === 'ES256'
    ? { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' }
    : { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
  const key = await crypto.webcrypto.subtle.importKey('jwk', jwk, algorithm, false, ['verify']);
  const verified = await crypto.webcrypto.subtle.verify(
    algorithm,
    key,
    Buffer.from(parts[2], 'base64url'),
    Buffer.from(`${parts[0]}.${parts[1]}`),
  );
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const now = Math.floor(Date.now() / 1000);
  if (!verified || claims.iss !== 'https://api.login.yahoo.com' || !audience.includes(config.clientId)
    || claims.exp <= now || claims.iat > now + 60 || claims.nonce !== expectedNonce) {
    throw new Error('Yahoo kimlik doğrulaması başarısız');
  }
  return {
    id: claims.sub,
    name: claims.name || 'Yahoo Kullanıcısı',
    email: claims.email || null,
    picture: claims.picture || null,
  };
}

async function exchangeToken(params) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const body = new URLSearchParams({ client_id: config.clientId, ...params });
  if (config.clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`;
    body.delete('client_id');
  }
  const response = await fetch('https://api.login.yahoo.com/oauth2/get_token', { method: 'POST', headers, body });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || payload.error || 'Yahoo token isteği başarısız');
  return { ...payload, expires_at: Date.now() + Number(payload.expires_in || 3600) * 1000 };
}

async function accessToken(session) {
  if (!session?.token) throw new Error('Yahoo hesabı bağlı değil');
  if (session.token.expires_at > Date.now() + 60_000) return session.token.access_token;
  if (!session.token.refresh_token) throw new Error('Yahoo oturumunun yenilenmesi gerekiyor');
  const refreshed = await exchangeToken({
    grant_type: 'refresh_token',
    redirect_uri: config.redirectUri,
    refresh_token: session.token.refresh_token,
  });
  session.token = { ...session.token, ...refreshed, refresh_token: refreshed.refresh_token || session.token.refresh_token };
  return session.token.access_token;
}

async function yahoo(session, pathname) {
  const token = await accessToken(session);
  const separator = pathname.includes('?') ? '&' : '?';
  const response = await fetch(`https://fantasysports.yahooapis.com/fantasy/v2/${pathname}${separator}format=json`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Yahoo Fantasy API ${response.status}`);
  return payload;
}

async function dashboard(session) {
  if (!config.leagueKey) {
    return { needsLeagueKey: true, leagues: await yahoo(session, 'users;use_login=1/games;game_codes=nba/leagues') };
  }
  const key = encodeURIComponent(config.leagueKey);
  const [league, standings, scoreboard, teams, transactions] = await Promise.all([
    yahoo(session, `league/${key}`), yahoo(session, `league/${key}/standings`),
    yahoo(session, `league/${key}/scoreboard`), yahoo(session, `league/${key}/teams`),
    yahoo(session, `league/${key}/transactions`),
  ]);
  return { leagueKey: config.leagueKey, league, standings, scoreboard, teams, transactions, syncedAt: new Date().toISOString() };
}

function serveStatic(req, res) {
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const requestedPath = urlPath === '/' ? 'index.html' : `.${urlPath}`;
  const resolvedPath = path.resolve(root, requestedPath);
  const relativePath = path.relative(root, resolvedPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return false;
  const target = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()
    ? path.join(resolvedPath, 'index.html')
    : resolvedPath;
  if (!fs.existsSync(target) || fs.statSync(target).isDirectory()) return false;
  const extension = path.extname(target);
  const type = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
    '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  }[extension] || 'application/octet-stream';
  const cacheControl = extension === '.html' ? 'no-cache' : 'public, max-age=3600';
  res.writeHead(200, securityHeaders({ 'Content-Type': `${type}; charset=utf-8`, 'Cache-Control': cacheControl }));
  fs.createReadStream(target).pipe(res);
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  cleanupMemory();
  try {
    if (url.pathname === '/healthz' && req.method === 'GET') {
      return json(res, 200, { status: 'ok', yahooConfigured: Boolean(config.clientId && config.redirectUri) });
    }
    if (url.pathname === '/api/yahoo/status' && req.method === 'GET') {
      const session = activeSession(req);
      return json(res, 200, {
        configured: Boolean(config.clientId && config.redirectUri), connected: Boolean(session?.token),
        leagueKey: config.leagueKey || null, userConnected: Boolean(session?.profile),
      });
    }
    if (url.pathname === '/api/yahoo/user' && req.method === 'GET') {
      const session = activeSession(req);
      if (!session?.profile) return json(res, 401, { error: 'Yahoo kullanıcı oturumu bulunamadı' });
      return json(res, 200, { user: session.profile });
    }
    if (url.pathname === '/api/logout' && req.method === 'POST') {
      const id = requestCookies(req).emac_session;
      if (id) browserSessions.delete(id);
      return json(res, 200, { ok: true }, { 'Set-Cookie': cookie('emac_session', '', 0) });
    }
    if (url.pathname === '/auth/yahoo' && req.method === 'GET') {
      if (!config.clientId || !config.redirectUri) return json(res, 503, { error: 'Yahoo bağlantısı sunucuda yapılandırılmadı' });
      const purpose = url.searchParams.get('purpose') === 'login' ? 'login' : 'fantasy';
      const verifier = crypto.randomBytes(64).toString('base64url');
      const oauthRequest = {
        state: crypto.randomBytes(24).toString('base64url'), nonce: crypto.randomBytes(24).toString('base64url'),
        verifier, purpose, createdAt: Date.now(),
      };
      oauthRequests.set(oauthRequest.state, oauthRequest);
      const authUrl = new URL('https://api.login.yahoo.com/oauth2/request_auth');
      authUrl.search = new URLSearchParams({
        client_id: config.clientId, redirect_uri: config.redirectUri, response_type: 'code',
        scope: 'openid profile email', state: oauthRequest.state, nonce: oauthRequest.nonce,
        code_challenge: pkceChallenge(verifier), code_challenge_method: 'S256', language: 'tr-tr',
      }).toString();
      return redirect(res, authUrl.toString(), [cookie('yahoo_oauth_state', oauthRequest.state, 600)]);
    }
    if (url.pathname === '/auth/yahoo/callback' && req.method === 'GET') {
      const state = url.searchParams.get('state');
      const oauthRequest = state ? oauthRequests.get(state) : null;
      const cookieState = requestCookies(req).yahoo_oauth_state;
      if (!oauthRequest || !state || cookieState !== state || Date.now() - oauthRequest.createdAt > OAUTH_MAX_AGE_MS) {
        return redirect(res, '/?yahoo_login=denied&reason=invalid_state', [cookie('yahoo_oauth_state', '', 0)]);
      }
      oauthRequests.delete(state);
      if (url.searchParams.get('error')) {
        return redirect(res, `/?yahoo_login=denied&reason=${encodeURIComponent(url.searchParams.get('error'))}`, [cookie('yahoo_oauth_state', '', 0)]);
      }
      const code = url.searchParams.get('code');
      if (!code) return redirect(res, '/?yahoo_login=denied&reason=missing_code', [cookie('yahoo_oauth_state', '', 0)]);
      const token = await exchangeToken({
        grant_type: 'authorization_code', redirect_uri: config.redirectUri,
        code, code_verifier: oauthRequest.verifier,
      });
      const profile = await yahooProfile(token.id_token, oauthRequest.nonce);
      const session = createSession(token, profile);
      const destination = oauthRequest.purpose === 'login' ? '/?yahoo_login=success' : '/?yahoo=connected';
      return redirect(res, destination, [
        cookie('yahoo_oauth_state', '', 0), cookie('emac_session', session.id, SESSION_MAX_AGE_SECONDS),
      ]);
    }
    if (url.pathname === '/api/yahoo/dashboard' && req.method === 'GET') {
      const session = activeSession(req);
      if (!session) return json(res, 401, { error: 'Yahoo hesabıyla giriş yapılması gerekiyor' });
      return json(res, 200, await dashboard(session));
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') return json(res, 405, { error: 'Method not allowed' }, { Allow: 'GET, HEAD' });
    if (!serveStatic(req, res)) return json(res, 404, { error: 'Not found' });
  } catch (error) {
    console.error('Request failed:', error.message);
    return json(res, 500, { error: 'İşlem tamamlanamadı. Lütfen tekrar dene.' });
  }
});

server.listen(config.port, '0.0.0.0', () => console.log(`Fantasy League: http://localhost:${config.port}`));
