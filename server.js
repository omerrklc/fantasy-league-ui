const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = __dirname;
const sessionPath = path.join(root, 'data', 'yahoo-session.json');
const userSessionPath = path.join(root, 'data', 'yahoo-user-session.json');

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
};

const oauthRequests = new Map();
let session = fs.existsSync(sessionPath) ? JSON.parse(fs.readFileSync(sessionPath, 'utf8')) : null;
let userSession = fs.existsSync(userSessionPath) ? JSON.parse(fs.readFileSync(userSessionPath, 'utf8')) : null;

function saveSession(nextSession) {
  fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
  session = nextSession;
  fs.writeFileSync(sessionPath, JSON.stringify(nextSession, null, 2));
}

function saveUserSession(nextSession) {
  fs.mkdirSync(path.dirname(userSessionPath), { recursive: true });
  userSession = nextSession;
  fs.writeFileSync(userSessionPath, JSON.stringify(nextSession, null, 2));
}

function requestCookies(req) {
  return Object.fromEntries((req.headers.cookie || '').split(';').map(part => part.trim().split('=').map(decodeURIComponent)).filter(parts => parts.length === 2));
}

async function yahooProfile(idToken, expectedNonce) {
  if (!idToken) throw new Error('Yahoo ID Token dönmedi');
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Geçersiz Yahoo ID Token');
  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8'));
  const claims = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  const certResponse = await fetch('https://api.login.yahoo.com/openid/v1/certs');
  if (!certResponse.ok) throw new Error('Yahoo imza anahtarları alınamadı');
  const { keys } = await certResponse.json();
  const jwk = keys.find(key => key.kid === header.kid && key.alg === header.alg);
  if (!jwk || !['ES256', 'RS256'].includes(header.alg)) throw new Error('Yahoo imza anahtarı geçersiz');
  const algorithm = header.alg === 'ES256'
    ? { name: 'ECDSA', namedCurve: 'P-256', hash: 'SHA-256' }
    : { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' };
  const key = await crypto.webcrypto.subtle.importKey('jwk', jwk, algorithm, false, ['verify']);
  const verified = await crypto.webcrypto.subtle.verify(algorithm, key, Buffer.from(parts[2], 'base64url'), Buffer.from(`${parts[0]}.${parts[1]}`));
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  const now = Math.floor(Date.now() / 1000);
  if (!verified || claims.iss !== 'https://api.login.yahoo.com' || !audience.includes(config.clientId) || claims.exp <= now || claims.iat > now + 60 || claims.nonce !== expectedNonce) throw new Error('Yahoo kimlik doğrulaması başarısız');
  return { id: claims.sub, name: claims.name || 'Yahoo Kullanıcısı', email: claims.email || null, picture: claims.picture || null };
}

function json(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(payload));
}

async function exchangeToken(params) {
  const auth = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64');
  const response = await fetch('https://api.login.yahoo.com/oauth2/get_token', {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || payload.error || 'Yahoo token request failed');
  return { ...payload, expires_at: Date.now() + payload.expires_in * 1000 };
}

async function accessToken() {
  if (!session) throw new Error('Yahoo hesabı bağlı değil');
  if (session.expires_at > Date.now() + 60_000) return session.access_token;
  const refreshed = await exchangeToken({
    grant_type: 'refresh_token',
    redirect_uri: config.redirectUri,
    refresh_token: session.refresh_token,
  });
  saveSession({ ...session, ...refreshed, refresh_token: refreshed.refresh_token || session.refresh_token });
  return session.access_token;
}

async function yahoo(pathname) {
  const token = await accessToken();
  const separator = pathname.includes('?') ? '&' : '?';
  const response = await fetch(`https://fantasysports.yahooapis.com/fantasy/v2/${pathname}${separator}format=json`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Yahoo API ${response.status}`);
  return payload;
}

async function dashboard() {
  if (!config.leagueKey) {
    return { needsLeagueKey: true, leagues: await yahoo('users;use_login=1/games;game_codes=nba/leagues') };
  }
  const key = encodeURIComponent(config.leagueKey);
  const [league, standings, scoreboard, teams, transactions] = await Promise.all([
    yahoo(`league/${key}`), yahoo(`league/${key}/standings`), yahoo(`league/${key}/scoreboard`),
    yahoo(`league/${key}/teams`), yahoo(`league/${key}/transactions`),
  ]);
  return { leagueKey: config.leagueKey, league, standings, scoreboard, teams, transactions, syncedAt: new Date().toISOString() };
}

function serveStatic(req, res) {
  const urlPath = new URL(req.url, 'http://localhost').pathname;
  const requestedPath = urlPath === '/' ? 'index.html' : `.${urlPath}`;
  const resolvedPath = path.resolve(root, requestedPath);
  const target = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isDirectory()
    ? path.join(resolvedPath, 'index.html')
    : resolvedPath;
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return false;
  const type = {
    '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json',
    '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp'
  }[path.extname(target)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` });
  fs.createReadStream(target).pipe(res);
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname === '/api/yahoo/status') return json(res, 200, { configured: Boolean(config.clientId && config.clientSecret), connected: Boolean(session), leagueKey: config.leagueKey || null, userConnected: Boolean(userSession?.profile) });
    if (url.pathname === '/api/yahoo/user') {
      if (!userSession?.profile) return json(res, 401, { error: 'Yahoo kullanıcı oturumu bulunamadı' });
      return json(res, 200, { user: userSession.profile });
    }
    if (url.pathname === '/auth/yahoo') {
      if (!config.clientId || !config.clientSecret) return json(res, 503, { error: '.env içinde Yahoo anahtarları eksik' });
      const purpose = url.searchParams.get('purpose') === 'login' ? 'login' : 'fantasy';
      const oauthRequest = { state: crypto.randomBytes(24).toString('hex'), nonce: crypto.randomBytes(20).toString('hex'), purpose, createdAt: Date.now() };
      oauthRequests.set(oauthRequest.state, oauthRequest);
      const authUrl = new URL('https://api.login.yahoo.com/oauth2/request_auth');
      const authParams = { client_id: config.clientId, redirect_uri: config.redirectUri, response_type: 'code', state: oauthRequest.state, language: 'tr-tr' };
      if (purpose === 'login') Object.assign(authParams, { scope: 'openid profile email', nonce: oauthRequest.nonce });
      authUrl.search = new URLSearchParams(authParams).toString();
      const secureCookie = config.redirectUri.startsWith('https://') ? '; Secure' : '';
      res.writeHead(302, { Location: authUrl.toString(), 'Set-Cookie': `yahoo_oauth_state=${encodeURIComponent(oauthRequest.state)}; HttpOnly; SameSite=Lax; Path=/auth/yahoo; Max-Age=600${secureCookie}` }); return res.end();
    }
    if (url.pathname === '/auth/yahoo/callback') {
      const state = url.searchParams.get('state');
      const oauthRequest = oauthRequests.get(state);
      const cookieState = requestCookies(req).yahoo_oauth_state;
      if (!oauthRequest || cookieState !== state || Date.now() - oauthRequest.createdAt > 10 * 60_000) throw new Error('Geçersiz veya süresi dolmuş OAuth state');
      const purpose = oauthRequest.purpose;
      oauthRequests.delete(state);
      const clearStateCookie = 'yahoo_oauth_state=; HttpOnly; SameSite=Lax; Path=/auth/yahoo; Max-Age=0';
      if (url.searchParams.get('error')) {
        res.writeHead(302, { Location: `/?yahoo_login=denied&reason=${encodeURIComponent(url.searchParams.get('error'))}`, 'Set-Cookie': clearStateCookie }); return res.end();
      }
      const token = await exchangeToken({ grant_type: 'authorization_code', redirect_uri: config.redirectUri, code: url.searchParams.get('code') });
      const profile = purpose === 'login' ? await yahooProfile(token.id_token, oauthRequest.nonce) : null;
      if (purpose === 'login') saveUserSession({ ...token, profile, auth_purpose: purpose });
      else saveSession({ ...token, auth_purpose: purpose });
      res.writeHead(302, { Location: purpose === 'login' ? '/?yahoo_login=success' : '/?yahoo=connected', 'Set-Cookie': clearStateCookie }); return res.end();
    }
    if (url.pathname === '/api/yahoo/dashboard') return json(res, 200, await dashboard());
    if (!serveStatic(req, res)) json(res, 404, { error: 'Not found' });
  } catch (error) {
    json(res, 500, { error: error.message });
  }
});

server.listen(config.port, () => console.log(`Fantasy League: http://localhost:${config.port}`));
