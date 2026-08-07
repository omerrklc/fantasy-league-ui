const news = [
  { title: "Dončić ilk sıradan seçildi", meta: "Draft gecesi · 2 saat önce", color: "linear-gradient(145deg,#1d61bd,#09142c)" },
  { title: "Sezonun ilk büyük takası onaylandı", meta: "Takas merkezi · 6 saat önce", color: "linear-gradient(145deg,#9fc319,#253806)" },
  { title: "Waiver'da sürpriz hamle", meta: "Serbest oyuncular · Dün", color: "linear-gradient(145deg,#753b98,#24163d)" },
];
const teams = [
  ["Eren's Dynasty", "8 - 2", ".800", "#b6d22b", "ED"],
  ["Can's Crew", "7 - 3", ".700", "#328dff", "CC"],
  ["Elite Squad", "6 - 4", ".600", "#c767ff", "ES"],
  ["Bucket Getters", "5 - 5", ".500", "#ffae38", "BG"],
];
const allTeams = [...teams, ["Court Kings", "4 - 6", ".400", "#5bd6d1", "CK"], ["Fast Break", "3 - 7", ".300", "#e0d35b", "FB"], ["Triple Double", "3 - 7", ".300", "#e87373", "TD"], ["The Sixth Men", "2 - 8", ".200", "#8da9ff", "SM"]];
const archiveNews = [...news,
  { title: "Haftanın derbisi için kadrolar açıklandı", meta: "Maç merkezi · 2 gün önce", color: "linear-gradient(145deg,#d3a637,#382909)" },
  { title: "Eren's Dynasty yenilmezlik serisini sürdürdü", meta: "Hafta 3 sonuçları · 4 gün önce", color: "linear-gradient(145deg,#2a87e2,#0b1e41)" },
  { title: "Komiserlik ceza kararını duyurdu", meta: "Lig ofisi · 6 gün önce", color: "linear-gradient(145deg,#d75b69,#35101a)" },
];
const currentGames = [
  { state: 'CANLI · 4. ÇEYREK', live: true, left: ['Eren\'s Dynasty', 'ED', '#b6d22b', '842'], right: ['Can\'s Crew', 'CC', '#328dff', '816'], note: '1 gün 4 saat kaldı', leader: 'Eren\'s Dynasty önde' },
  { state: 'CANLI · 3. ÇEYREK', live: true, left: ['Elite Squad', 'ES', '#c767ff', '774'], right: ['Bucket Getters', 'BG', '#ffae38', '801'], note: '1 gün 4 saat kaldı', leader: 'Bucket Getters önde' },
  { state: 'TAMAMLANDI', live: false, left: ['Court Kings', 'CK', '#5bd6d1', '928'], right: ['Triple Double', 'TD', '#e87373', '887'], note: 'Hafta 4 · Pazartesi', leader: 'Court Kings kazandı' },
  { state: 'BAŞLAMADI', live: false, left: ['Fast Break', 'FB', '#e0d35b', '—'], right: ['The Sixth Men', 'SM', '#8da9ff', '—'], note: 'Pazar · 21.00', leader: 'Kadrolar açıklanacak' },
];
const schedule = [
  { week: 2, label: '22 - 28 Temmuz', games: [
    { state: 'TAMAMLANDI', left: ['Eren\'s Dynasty', 'ED', '#b6d22b', '811'], right: ['Bucket Getters', 'BG', '#ffae38', '774'], note: 'Hafta 2 · Pazartesi', leader: 'Eren\'s Dynasty kazandı' },
    { state: 'TAMAMLANDI', left: ['Can\'s Crew', 'CC', '#328dff', '836'], right: ['Elite Squad', 'ES', '#c767ff', '844'], note: 'Hafta 2 · Pazartesi', leader: 'Elite Squad kazandı' },
    { state: 'TAMAMLANDI', left: ['Court Kings', 'CK', '#5bd6d1', '791'], right: ['The Sixth Men', 'SM', '#8da9ff', '760'], note: 'Hafta 2 · Pazartesi', leader: 'Court Kings kazandı' },
  ]},
  { week: 3, label: '29 Temmuz - 4 Ağustos', games: [
    { state: 'TAMAMLANDI', left: ['Eren\'s Dynasty', 'ED', '#b6d22b', '904'], right: ['Elite Squad', 'ES', '#c767ff', '869'], note: 'Hafta 3 · Pazartesi', leader: 'Eren\'s Dynasty kazandı' },
    { state: 'TAMAMLANDI', left: ['Can\'s Crew', 'CC', '#328dff', '782'], right: ['Bucket Getters', 'BG', '#ffae38', '801'], note: 'Hafta 3 · Pazartesi', leader: 'Bucket Getters kazandı' },
    { state: 'TAMAMLANDI', left: ['Fast Break', 'FB', '#e0d35b', '822'], right: ['Triple Double', 'TD', '#e87373', '818'], note: 'Hafta 3 · Pazartesi', leader: 'Fast Break kazandı' },
  ]},
  { week: 4, label: '5 - 11 Ağustos', games: currentGames },
];
let weekIndex = schedule.length - 1;

document.querySelector('#news-feed').innerHTML = news.map(item => `
  <article class="news-item" tabindex="0">
    <div class="news-art" style="--news-color:${item.color}"></div>
    <div><h3>${item.title}</h3><p>${item.meta}</p></div><span class="news-arrow">›</span>
  </article>`).join('');

document.querySelector('#standings').innerHTML = teams.map((team, index) => `
  <div class="standing"><span class="rank">${index + 1}</span><span class="mini-mark" style="--mark-color:${team[3]}">${team[4]}</span><span class="team-name">${team[0]}</span><span class="record">${team[1]}</span><span class="ratio">${team[2]}</span></div>`).join('');

document.querySelector('#all-news-list').innerHTML = archiveNews.map(item => `
  <article class="news-item"><div class="news-art" style="--news-color:${item.color}"></div><div><h3>${item.title}</h3><p>${item.meta}</p></div><span class="news-arrow">›</span></article>`).join('');
document.querySelector('#full-standings').innerHTML = allTeams.map((team, index) => `
  <div class="standing"><span class="rank">${index + 1}</span><span class="mini-mark" style="--mark-color:${team[3]}">${team[4]}</span><span class="team-name">${team[0]}</span><span class="record">${team[1]}</span><span class="ratio">${team[2]}</span></div>`).join('');

function renderMatchups() {
  const selectedWeek = schedule[weekIndex];
  document.querySelector('#week-label').textContent = selectedWeek.label;
  document.querySelector('#matchup-list').innerHTML = selectedWeek.games.map(game => `
  <article class="game-card" data-game-state="${game.live ? 'live' : game.state === 'TAMAMLANDI' ? 'finished' : 'upcoming'}">
    <div class="game-top"><span class="game-state ${game.live ? 'live' : ''}">${game.state}</span><span>${game.note}</span></div>
    <div class="game-teams">
      <div class="game-side"><span class="small-mark" style="--small-mark:${game.left[2]}">${game.left[1]}</span><strong>${game.left[0]}</strong></div>
      <div class="game-score">${game.left[3]} <span>–</span> ${game.right[3]}</div>
      <div class="game-side"><strong>${game.right[0]}</strong><span class="small-mark" style="--small-mark:${game.right[2]}">${game.right[1]}</span></div>
    </div>
    <div class="game-footer"><span>HAFTA ${selectedWeek.week} EŞLEŞMESİ</span><b>${game.leader}</b></div>
  </article>`).join('');
  applyFilter(document.querySelector('[data-filter].selected').dataset.filter);
}

function applyFilter(filter) {
  document.querySelectorAll('.game-card').forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.gameState !== filter;
  });
}

renderMatchups();

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('selected', item === button));
  applyFilter(filter);
}));

document.querySelectorAll('[data-week-direction]').forEach(button => button.addEventListener('click', () => {
  const step = button.dataset.weekDirection === 'previous' ? -1 : 1;
  const nextIndex = weekIndex + step;
  if (nextIndex < 0 || nextIndex >= schedule.length) return;
  weekIndex = nextIndex;
  renderMatchups();
}));

const toast = document.querySelector('#toast');
function showToast(view) {
  const labels = { feed: 'Akış sayfasındasın', matchups: 'Eşleşmeler yakında eklenecek', teams: 'Takımlar sayfası yakında eklenecek', more: 'Lig ayarları yakında eklenecek' };
  toast.textContent = labels[view]; toast.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}
document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const view = button.dataset.view;
  const pageId = { matchups: 'matchups-view', teams: 'teams-view', 'all-news': 'all-news-view' }[view];
  const activeNav = view === 'matchups' || view === 'teams' ? view : 'feed';
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === activeNav));
  document.querySelectorAll('.app-shell > header, .app-shell > .league-picker, .app-shell > section').forEach(item => {
    item.hidden = pageId ? item.id !== pageId : item.id.endsWith('-view');
  });
  if (!pageId && view !== 'feed') showToast(view);
}));

const yahooCard = document.querySelector('#yahoo-sync');
const yahooTitle = document.querySelector('#yahoo-sync-title');
const yahooDetail = document.querySelector('#yahoo-sync-detail');
const yahooButton = document.querySelector('#yahoo-connect');

async function refreshYahooStatus() {
  try {
    const response = await fetch('/api/yahoo/status', { cache: 'no-store' });
    if (!response.ok) throw new Error('backend-offline');
    const status = await response.json();
    yahooCard.classList.toggle('connected', status.connected);
    if (!status.configured) {
      yahooTitle.textContent = 'Yahoo API anahtarları bekleniyor';
      yahooDetail.textContent = '.env dosyasına Consumer Key ve Secret eklenmeli.';
      yahooButton.textContent = 'KURULUM BEKLİYOR'; yahooButton.disabled = true;
    } else if (!status.connected) {
      yahooTitle.textContent = 'Yahoo Fantasy bağlantısı hazır';
      yahooDetail.textContent = 'Komiser hesabıyla güvenli giriş yap.';
      yahooButton.textContent = "YAHOO'YA BAĞLAN";
    } else {
      yahooTitle.textContent = 'Yahoo Fantasy bağlı';
      yahooDetail.textContent = status.leagueKey ? `Lig: ${status.leagueKey}` : 'Lig anahtarı seçilmeyi bekliyor.';
      yahooButton.textContent = 'VERİYİ YENİLE';
    }
  } catch {
    const isPublishedDemo = location.hostname.endsWith('github.io') || location.hostname.includes('githack.com');
    yahooCard.classList.toggle('error', !isPublishedDemo);
    yahooTitle.textContent = isPublishedDemo ? 'Yahoo entegrasyonu hazırlanıyor' : 'Yahoo backend çevrimdışı';
    yahooDetail.textContent = isPublishedDemo ? 'API onayı sonrası canlı lig verileri burada görünecek.' : 'Canlı veri için uygulamayı Node sunucusuyla aç.';
    yahooButton.textContent = isPublishedDemo ? 'YAKINDA' : 'YEREL KURULUM'; yahooButton.disabled = true;
  }
}

yahooButton.addEventListener('click', async () => {
  if (!yahooCard.classList.contains('connected')) return location.assign('/auth/yahoo');
  yahooButton.textContent = 'SENKRONİZE...';
  try {
    const response = await fetch('/api/yahoo/dashboard', { cache: 'no-store' });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error);
    yahooDetail.textContent = payload.needsLeagueKey ? 'Yahoo ligleri bulundu; lig anahtarı seçilmeli.' : `Son senkron: ${new Date(payload.syncedAt).toLocaleTimeString('tr-TR')}`;
    yahooButton.textContent = 'GÜNCEL';
  } catch (error) {
    yahooDetail.textContent = error.message; yahooButton.textContent = 'TEKRAR DENE';
  }
});

refreshYahooStatus();
