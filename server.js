const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = __dirname;
const sessionPath = path.join(root, 'data', 'yahoo-session.json');

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

let oauthState = '';
let session = fs.existsSync(sessionPath) ? JSON.parse(fs.readFileSync(sessionPath, 'utf8')) : null;

function saveSession(nextSession) {
  fs.mkdirSync(path.dirname(sessionPath), { recursive: true });
  session = nextSession;
  fs.writeFileSync(sessionPath, JSON.stringify(nextSession, null, 2));
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
  const target = path.resolve(root, urlPath === '/' ? 'index.html' : `.${urlPath}`);
  if (!target.startsWith(root) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) return false;
  const type = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' }[path.extname(target)] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` });
  fs.createReadStream(target).pipe(res);
  return true;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (url.pathname === '/api/yahoo/status') return json(res, 200, { configured: Boolean(config.clientId && config.clientSecret), connected: Boolean(session), leagueKey: config.leagueKey || null });
    if (url.pathname === '/auth/yahoo') {
      if (!config.clientId || !config.clientSecret) return json(res, 503, { error: '.env içinde Yahoo anahtarları eksik' });
      oauthState = crypto.randomBytes(24).toString('hex');
      const authUrl = new URL('https://api.login.yahoo.com/oauth2/request_auth');
      authUrl.search = new URLSearchParams({ client_id: config.clientId, redirect_uri: config.redirectUri, response_type: 'code', state: oauthState }).toString();
      res.writeHead(302, { Location: authUrl.toString() }); return res.end();
    }
    if (url.pathname === '/auth/yahoo/callback') {
      if (url.searchParams.get('state') !== oauthState) throw new Error('Geçersiz OAuth state');
      const token = await exchangeToken({ grant_type: 'authorization_code', redirect_uri: config.redirectUri, code: url.searchParams.get('code') });
      saveSession(token); res.writeHead(302, { Location: '/?yahoo=connected' }); return res.end();
    }
    if (url.pathname === '/api/yahoo/dashboard') return json(res, 200, await dashboard());
    if (!serveStatic(req, res)) json(res, 404, { error: 'Not found' });
  } catch (error) {
    json(res, 500, { error: error.message });
  }
});

server.listen(config.port, () => console.log(`Fantasy League: http://localhost:${config.port}`));
