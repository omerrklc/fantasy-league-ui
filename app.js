const news = [
  { title: "Dončić ilk sıradan seçildi", meta: "Draft gecesi · 2 saat önce", color: "linear-gradient(145deg,#1d61bd,#09142c)", players: ['Luka Dončić'] },
  { title: "Durant–Edwards takası onaylandı", meta: "Takas merkezi · 6 saat önce", color: "linear-gradient(145deg,#9fc319,#253806)", players: ['Kevin Durant', 'Anthony Edwards'] },
  { title: "Waiver'da Chet Holmgren sürprizi", meta: "Serbest oyuncular · Dün", color: "linear-gradient(145deg,#753b98,#24163d)", players: ['Chet Holmgren'] },
];
const teams = [
  ["Eren's Dynasty", "8 - 2", ".800", "#b6d22b", "ED"],
  ["Can's Crew", "7 - 3", ".700", "#328dff", "CC"],
  ["Elite Squad", "6 - 4", ".600", "#c767ff", "ES"],
  ["Bucket Getters", "5 - 5", ".500", "#ffae38", "BG"],
];
const allTeams = [...teams, ["Court Kings", "4 - 6", ".400", "#5bd6d1", "CK"], ["Fast Break", "3 - 7", ".300", "#e0d35b", "FB"], ["Triple Double", "3 - 7", ".300", "#e87373", "TD"], ["The Sixth Men", "2 - 8", ".200", "#8da9ff", "SM"]];
const archiveNews = [...news,
  { title: "Jokić'ten triple-double gecesi", meta: "Oyuncu performansı · Dün", color: "linear-gradient(145deg,#c1993d,#302309)", players: ['Nikola Jokić'] },
  { title: "Alperen Şengün haftanın oyuncusu", meta: "Haftanın ödülleri · 2 gün önce", color: "linear-gradient(145deg,#d64c37,#32100d)", players: ['Alperen Şengün'] },
  { title: "Cade Cunningham 60 FP üretti", meta: "Maç performansı · 2 gün önce", color: "linear-gradient(145deg,#287be1,#091c3b)", players: ['Cade Cunningham'] },
  { title: "Tyrese Maxey kadroya geri döndü", meta: "Sakatlık raporu · 3 gün önce", color: "linear-gradient(145deg,#b13f72,#2c0d1e)", players: ['Tyrese Maxey'] },
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

const trades = [
  { id: 1, type: 'incoming', status: 'CEVAP BEKLİYOR', statusClass: 'incoming', from: "Eren's Dynasty", to: "Can's Crew", time: '18 dk önce', offered: [['JT','Jayson Tatum','SF · BOS','#278dff']], requested: [['SC','Stephen Curry','PG · GSW','#ffd51b']], note: 'Playoff öncesi iki takım için de dengeli bir hamle.', actions: true },
  { id: 2, type: 'review', status: 'KOMİSER İNCELEMESİNDE', statusClass: 'review', from: 'Elite Squad', to: 'Bucket Getters', time: '2 saat önce', offered: [['LD','Luka Dončić','PG · LAL','#a63bd4']], requested: [['SG','Shai Gilgeous-Alexander','PG · OKC','#2c8cff'],['JJ','Jaren Jackson Jr.','PF · MEM','#df4dbd']], note: 'Oylama: 3 onay · 1 itiraz', actions: false },
  { id: 3, type: 'finished', status: 'ONAYLANDI', statusClass: 'approved', from: 'Court Kings', to: 'Triple Double', time: 'Dün · 21.14', offered: [['TH','Tyrese Haliburton','PG · IND','#44d1da']], requested: [['JB','Jaylen Brown','SG · BOS','#ec536b']], note: 'Oyuncular yeni kadrolarına eklendi.', actions: false },
  { id: 4, type: 'finished', status: 'REDDEDİLDİ', statusClass: 'rejected', from: "Can's Crew", to: 'Elite Squad', time: '3 gün önce', offered: [['MB','Malik Beasley','SG · DET','#ffcc21']], requested: [['BA','Bam Adebayo','C · MIA','#e04a7e']], note: 'Teklif takım sahibi tarafından reddedildi.', actions: false }
];
let activeTradeFilter = 'all';

const notifications = [
  { id: 1, type: 'trade', icon: '⇄', color: '#ffd51b', title: 'Yeni takas teklifi aldın', text: "Eren's Dynasty, Jayson Tatum karşılığında Stephen Curry'yi istiyor.", time: '18 dk önce', unread: true, target: 'trades', action: 'TEKLİFİ GÖR' },
  { id: 2, type: 'match', icon: '▣', color: '#35df72', title: 'Eşleşmede öne geçtin', text: "Can's Crew karşısında skor 842-816. Haftanın bitmesine 1 gün kaldı.", time: '28 dk önce', unread: true, target: 'matchups', action: 'MAÇA GİT' },
  { id: 3, type: 'warning', icon: '!', color: '#ec4e72', title: 'Kadro kilidine 2 saat kaldı', text: 'Aktif kadronda oynamayan bir oyuncu bulunuyor. Kadronu kontrol et.', time: '1 saat önce', unread: true, target: 'roster', action: 'KADROYU GÖR' },
  { id: 4, type: 'news', icon: '✦', color: '#e64bd3', title: 'Haftanın derbisi açıklandı', text: 'Elite Squad ile Bucket Getters cumartesi 21.00’de karşılaşıyor.', time: '3 saat önce', unread: true, target: 'all-news', action: 'HABERİ OKU' },
  { id: 5, type: 'trade', icon: '✓', color: '#36d972', title: 'Takas işlemi onaylandı', text: 'Court Kings ve Triple Double arasındaki takas komiser tarafından onaylandı.', time: 'Dün · 21.14', unread: false, target: 'trades', action: 'DETAYLAR' },
  { id: 6, type: 'match', icon: '★', color: '#288cff', title: 'Hafta 3 tamamlandı', text: "Eren's Dynasty haftayı lider tamamladı. Tüm sonuçlar eşleşmelerde.", time: 'Dün · 09.30', unread: false, target: 'matchups', action: 'SONUÇLARI GÖR' }
];
let activeNotificationFilter = 'all';

const liveCategories = [
  ['PTS', '524', '498', 'home'], ['REB', '188', '201', 'away'], ['AST', '132', '118', 'home'],
  ['3PM', '61', '57', 'home'], ['STL', '34', '29', 'home'], ['BLK', '21', '24', 'away'],
  ['FG%', '.492', '.481', 'home'], ['FT%', '.817', '.834', 'away'], ['TO', '53', '58', 'home']
];
const livePlayers = [
  { side: 'home', mark: 'JT', name: 'Jayson Tatum', team: 'BOS', line: '31 PTS · 8 REB · 5 AST', fp: 52.4, progress: '4. ÇEYREK · 03:18', color: '#278dff' },
  { side: 'away', mark: 'SC', name: 'Stephen Curry', team: 'GSW', line: '27 PTS · 4 REB · 7 AST', fp: 47.8, progress: '4. ÇEYREK · 05:42', color: '#ffd51b' },
  { side: 'home', mark: 'AD', name: 'Anthony Davis', team: 'DAL', line: '22 PTS · 12 REB · 3 BLK', fp: 50.1, progress: '3. ÇEYREK · 01:06', color: '#a540d5' },
  { side: 'away', mark: 'JB', name: 'Jaylen Brown', team: 'BOS', line: '24 PTS · 6 REB · 3 AST', fp: 38.9, progress: '4. ÇEYREK · 03:18', color: '#ec4f70' }
];
const remainingPlayers = [
  { side: 'home', mark: 'NJ', name: 'Nikola Jokić', team: 'DEN', time: 'BU GECE · 22.30', projection: '56.4 FP', color: '#46d3dd' },
  { side: 'away', mark: 'SG', name: 'Shai Gilgeous-Alexander', team: 'OKC', time: 'BU GECE · 23.00', projection: '51.8 FP', color: '#3c8eff' },
  { side: 'home', mark: 'DM', name: 'Donovan Mitchell', team: 'CLE', time: 'YARIN · 02.00', projection: '43.2 FP', color: '#e7496a' },
  { side: 'away', mark: 'BA', name: 'Bam Adebayo', team: 'MIA', time: 'YARIN · 02.30', projection: '39.7 FP', color: '#de4b83' }
];
const rosterPlayers = [
  { slot: 'PG', mark: 'LD', name: 'Luka Dončić', meta: 'PG · G', game: 'Bugün · 22.30', line: '28.6 PTS · 8.2 REB · 8.0 AST', fp: '52.8', type: 'starter', color: '#4f91ff', status: 'HAZIR' },
  { slot: 'SG', mark: 'SG', name: 'Shai Gilgeous-Alexander', meta: 'PG · SG', game: 'Bugün · 23.00', line: '31.4 PTS · 6.2 AST · 2.0 STL', fp: '51.6', type: 'starter', color: '#4cb6ff', status: 'CANLI' },
  { slot: 'G', mark: 'JB', name: 'Jalen Brunson', meta: 'PG · G', game: 'Yarın · 02.30', line: '26.1 PTS · 7.4 AST · 2.8 3PM', fp: '43.9', type: 'starter', color: '#f59a40', status: 'HAZIR' },
  { slot: 'SF', mark: 'JT', name: 'Jayson Tatum', meta: 'SF · PF', game: 'Bugün · 21.00', line: '27.2 PTS · 8.7 REB · 4.9 AST', fp: '47.2', type: 'starter', color: '#2dcc92', status: 'CANLI' },
  { slot: 'PF', mark: 'AD', name: 'Anthony Davis', meta: 'PF · C', game: 'Yarın · 03.00', line: '24.3 PTS · 11.8 REB · 2.4 BLK', fp: '50.1', type: 'starter', color: '#b975e8', status: 'HAZIR' },
  { slot: 'F', mark: 'SB', name: 'Scottie Barnes', meta: 'SF · PF', game: 'Bugün · 20.30', line: '19.6 PTS · 8.1 REB · 6.0 AST', fp: '41.4', type: 'starter', color: '#e84e65', status: 'HAZIR' },
  { slot: 'C', mark: 'NJ', name: 'Nikola Jokić', meta: 'C', game: 'Bugün · 22.30', line: '26.8 PTS · 12.3 REB · 9.1 AST', fp: '56.4', type: 'starter', color: '#e9bd45', status: 'CANLI' },
  { slot: 'UTIL', mark: 'DB', name: 'Devin Booker', meta: 'SG · SF', game: 'Yarın · 04.00', line: '27.0 PTS · 6.8 AST · 2.6 3PM', fp: '42.7', type: 'starter', color: '#d66de7', status: 'HAZIR' },
  { slot: 'UTIL', mark: 'BA', name: 'Bam Adebayo', meta: 'C', game: 'Yarın · 02.30', line: '20.4 PTS · 10.1 REB · 4.2 AST', fp: '39.7', type: 'starter', color: '#ef547e', status: 'HAZIR' },
  { slot: 'BN', mark: 'DM', name: 'Donovan Mitchell', meta: 'SG · G', game: 'Bugün · 21.30', line: '25.9 PTS · 5.2 AST · 3.4 3PM', fp: '40.8', type: 'bench', color: '#c44555', status: 'YEDEK' },
  { slot: 'BN', mark: 'TH', name: 'Tyrese Haliburton', meta: 'PG · G', game: 'Yarın · 01.00', line: '18.2 PTS · 9.6 AST · 1.3 STL', fp: '38.5', type: 'bench', color: '#f1cc42', status: 'YEDEK' },
  { slot: 'BN', mark: 'JB', name: 'Jaylen Brown', meta: 'SG · SF', game: 'Bugün · 21.00', line: '23.8 PTS · 5.9 REB · 3.5 AST', fp: '36.9', type: 'bench', color: '#49b583', status: 'YEDEK' },
  { slot: 'IL', mark: 'VW', name: 'Victor Wembanyama', meta: 'PF · C', game: 'Sakatlık raporu bekleniyor', line: '22.7 PTS · 10.5 REB · 3.6 BLK', fp: '—', type: 'injured', color: '#92929f', status: 'IL' }
];
const rosterPortraits = {
  'Luka Dončić': { sheet: 1, x: '3.04%', y: '8.64%' },
  'Shai Gilgeous-Alexander': { sheet: 1, x: '34.14%', y: '8.64%' },
  'Jalen Brunson': { sheet: 1, x: '65.25%', y: '8.64%' },
  'Jayson Tatum': { sheet: 1, x: '96.27%', y: '8.64%' },
  'Anthony Davis': { sheet: 1, x: '3.04%', y: '85.84%' },
  'Scottie Barnes': { sheet: 1, x: '34.14%', y: '85.84%' },
  'Nikola Jokić': { sheet: 1, x: '65.25%', y: '85.84%' },
  'Devin Booker': { sheet: 1, x: '96.27%', y: '85.84%' },
  'Bam Adebayo': { sheet: 2, x: '3.04%', y: '8.64%' },
  'Donovan Mitchell': { sheet: 2, x: '34.14%', y: '8.64%' },
  'Tyrese Haliburton': { sheet: 2, x: '65.25%', y: '8.64%' },
  'Jaylen Brown': { sheet: 2, x: '96.27%', y: '8.64%' },
  'Victor Wembanyama': { sheet: 2, x: '3.04%', y: '85.84%' },
  'Cade Cunningham': { sheet: 3, x: '3.04%', y: '8.64%' },
  'Kawhi Leonard': { sheet: 3, x: '34.14%', y: '8.64%' },
  'Kevin Durant': { sheet: 3, x: '65.25%', y: '8.64%' },
  'Tyrese Maxey': { sheet: 3, x: '96.27%', y: '8.64%' },
  'Jamal Murray': { sheet: 3, x: '3.04%', y: '85.84%' },
  'Jalen Johnson': { sheet: 3, x: '34.14%', y: '85.84%' },
  'Jalen Duren': { sheet: 3, x: '65.25%', y: '85.84%' },
  'Chet Holmgren': { sheet: 3, x: '96.27%', y: '85.84%' },
  'Anthony Edwards': { sheet: 4, x: '3.04%', y: '8.64%' },
  'Paolo Banchero': { sheet: 4, x: '34.14%', y: '8.64%' },
  'Karl-Anthony Towns': { sheet: 4, x: '65.25%', y: '8.64%' },
  'Amen Thompson': { sheet: 4, x: '96.27%', y: '8.64%' },
  'Pascal Siakam': { sheet: 4, x: '3.04%', y: '85.84%' },
  'Trae Young': { sheet: 4, x: '34.14%', y: '85.84%' },
  'Domantas Sabonis': { sheet: 4, x: '65.25%', y: '85.84%' },
  'Alperen Şengün': { sheet: 4, x: '96.27%', y: '85.84%' }
};
let activeRosterFilter = 'all';

function rosterPortrait(player) {
  const portrait = rosterPortraits[player.name];
  if (!portrait) return player.mark;
  return `<span class="roster-photo roster-photo-sheet-${portrait.sheet}" style="--player-x:${portrait.x};--player-y:${portrait.y}" role="img" aria-label="${player.name} piksel portresi"></span>`;
}
const liveEvents = [
  { time: 'ŞİMDİ', mark: 'JT', color: '#278dff', title: 'Jayson Tatum üçlüğü buldu', detail: '+3 PTS · Eren\'s Dynasty skoru 842.0 oldu', value: '+3.0 FP' },
  { time: '2 DK', mark: 'SC', color: '#ffd51b', title: 'Stephen Curry asist yaptı', detail: '+1 AST · Can\'s Crew farkı kapatıyor', value: '+1.5 FP' },
  { time: '5 DK', mark: 'AD', color: '#a540d5', title: 'Anthony Davis blok yaptı', detail: '+1 BLK · Blok kategorisinde fark 3', value: '+3.0 FP' },
  { time: '9 DK', mark: 'JB', color: '#ec4f70', title: 'Jaylen Brown maça döndü', detail: '4. çeyrek başladı', value: 'CANLI' }
];
const liveState = { home: 842, away: 816, paused: false, tick: 0 };

function newsPortraitArt(item) {
  const names = (item.players || []).filter(name => rosterPortraits[name]).slice(0, 2);
  if (!names.length) return '';
  return `<span class="news-player-art ${names.length > 1 ? 'duo' : 'solo'}">${names.map(name => rosterPortrait({ name, mark: name.split(' ').map(part => part[0]).join('').slice(0, 2) })).join('')}</span>`;
}

document.querySelector('#news-feed').innerHTML = news.map(item => `
  <article class="news-item" tabindex="0">
    <div class="news-art ${item.image ? 'has-photo' : ''} ${item.players ? 'has-player' : ''}" style="--news-color:${item.color};${item.image ? `--news-image:url('${item.image}')` : ''}">${newsPortraitArt(item)}</div>
    <div><h3>${item.title}</h3><p>${item.meta}</p></div><span class="news-arrow">›</span>
  </article>`).join('');

document.querySelector('#standings').innerHTML = teams.map((team, index) => `
  <div class="standing"><span class="rank">${index + 1}</span><span class="mini-mark" style="--mark-color:${team[3]}">${team[4]}</span><span class="team-name">${team[0]}</span><span class="record">${team[1]}</span><span class="ratio">${team[2]}</span></div>`).join('');

document.querySelector('#all-news-list').innerHTML = archiveNews.map(item => `
  <article class="news-item"><div class="news-art ${item.image ? 'has-photo' : ''} ${item.players ? 'has-player' : ''}" style="--news-color:${item.color};${item.image ? `--news-image:url('${item.image}')` : ''}">${newsPortraitArt(item)}</div><div><h3>${item.title}</h3><p>${item.meta}</p></div><span class="news-arrow">›</span></article>`).join('');
document.querySelector('#full-standings').innerHTML = allTeams.map((team, index) => `
  <div class="standing"><span class="rank">${index + 1}</span><span class="mini-mark" style="--mark-color:${team[3]}">${team[4]}</span><span class="team-name">${team[0]}</span><span class="record">${team[1]}</span><span class="ratio">${team[2]}</span></div>`).join('');

function renderMatchups() {
  const selectedWeek = schedule[weekIndex];
  document.querySelector('#week-label').textContent = selectedWeek.label;
  document.querySelector('#matchup-list').innerHTML = selectedWeek.games.map(game => `
  <article class="game-card" data-game-state="${game.live ? 'live' : game.state === 'TAMAMLANDI' ? 'finished' : 'upcoming'}" data-open-live="${game.live ? 'true' : 'false'}" tabindex="0">
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

function playerRows(players) {
  return players.map(player => `<div class="trade-player"><span style="--player-color:${player[3]}">${player[0]}</span><p><b>${player[1]}</b><small>${player[2]}</small></p></div>`).join('');
}

function renderTrades() {
  const visibleTrades = trades.filter(trade => activeTradeFilter === 'all' || trade.type === activeTradeFilter);
  document.querySelector('#trade-list').innerHTML = visibleTrades.map(trade => `
    <article class="trade-card panel" data-trade-id="${trade.id}">
      <div class="trade-card-top"><span class="trade-status ${trade.statusClass}">${trade.status}</span><small>${trade.time}</small></div>
      <div class="trade-teams"><span>${trade.from}</span><i>⇄</i><span>${trade.to}</span></div>
      <div class="trade-assets"><div><em>GİDEN</em>${playerRows(trade.offered)}</div><div class="trade-divider">⇄</div><div><em>GELEN</em>${playerRows(trade.requested)}</div></div>
      <div class="trade-card-bottom"><p>${trade.note}</p>${trade.actions ? '<div><button class="reject-trade" data-trade-action="reject">REDDET</button><button class="accept-trade" data-trade-action="accept">KABUL ET</button></div>' : '<button class="trade-detail" data-trade-action="detail">DETAYLAR →</button>'}</div>
    </article>`).join('');
}

renderTrades();

function updateNotificationCount() {
  const count = notifications.filter(item => item.unread).length;
  document.querySelector('#notification-badge').textContent = count;
  document.querySelector('#notification-badge').hidden = count === 0;
  document.querySelector('#unread-filter-count').textContent = count;
}

function renderNotifications() {
  const visible = notifications.filter(item => activeNotificationFilter === 'all' || item.unread);
  document.querySelector('#notification-list').innerHTML = visible.length ? visible.map(item => `
    <article class="notification-card ${item.unread ? 'unread' : ''}" data-notification-id="${item.id}" style="--notification-color:${item.color}">
      <span class="notification-type">${item.icon}</span>
      <div><div class="notification-card-top"><h3>${item.title}</h3><small>${item.time}</small></div><p>${item.text}</p><button data-notification-target="${item.target}">${item.action} →</button></div>
      ${item.unread ? '<i class="unread-dot"></i>' : ''}
    </article>`).join('') : '<div class="notification-empty"><span>✓</span><h3>Hepsini okudun</h3><p>Yeni bir gelişme olduğunda burada göreceksin.</p></div>';
  updateNotificationCount();
}

renderNotifications();

function renderLiveCenter() {
  document.querySelector('#live-category-grid').innerHTML = liveCategories.map(category => `
    <div class="category-item ${category[3]}"><span>${category[1]}</span><b>${category[0]}</b><span>${category[2]}</span><i></i></div>`).join('');
  document.querySelector('#live-player-list').innerHTML = livePlayers.map(player => `
    <article class="live-player ${player.side}"><span class="live-player-mark" style="--live-player-color:${player.color}">${player.mark}</span><div><b>${player.name}</b><small>${player.team} · ${player.line}</small><em><i></i>${player.progress}</em></div><strong>${player.fp.toFixed(1)}<small>FP</small></strong></article>`).join('');
  document.querySelector('#remaining-player-list').innerHTML = remainingPlayers.map(player => `
    <article class="remaining-player ${player.side}"><span style="--remaining-color:${player.color}">${player.mark}</span><div><b>${player.name}</b><small>${player.team} · ${player.time}</small></div><strong>${player.projection}<small>TAHMİN</small></strong></article>`).join('');
  renderLiveTimeline(); updateLiveScores();
}

function renderRoster() {
  const visiblePlayers = rosterPlayers.filter(player => activeRosterFilter === 'all' || player.type === activeRosterFilter);
  const groupLabels = { starter: 'AKTİF KADRO', bench: 'YEDEKLER', injured: 'SAKAT LİSTESİ' };
  const grouped = ['starter', 'bench', 'injured'].map(type => {
    const players = visiblePlayers.filter(player => player.type === type);
    if (!players.length) return '';
    return `<section class="roster-group" data-roster-group="${type}"><div class="roster-group-title"><b>${groupLabels[type]}</b><span>${players.length} OYUNCU</span></div>${players.map(player => `
      <article class="roster-player ${player.type}">
        <span class="roster-slot">${player.slot}</span>
        <span class="roster-player-mark roster-player-photo" style="--roster-color:${player.color}">${rosterPortrait(player)}</span>
        <div class="roster-player-info"><div><b>${player.name}</b><em class="${player.status === 'CANLI' ? 'live' : ''}">${player.status}</em></div><small>${player.meta} · ${player.game}</small><p>${player.line}</p></div>
        <strong>${player.fp}<small>FP</small></strong>
      </article>`).join('')}</section>`;
  }).join('');
  document.querySelector('#roster-list').innerHTML = grouped || '<div class="roster-empty">Bu bölümde oyuncu bulunmuyor.</div>';
}

document.querySelectorAll('[data-roster-filter]').forEach(button => button.addEventListener('click', () => {
  activeRosterFilter = button.dataset.rosterFilter;
  document.querySelectorAll('[data-roster-filter]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('selected', selected); item.setAttribute('aria-selected', selected);
  });
  renderRoster();
}));

renderRoster();

function renderLiveTimeline() {
  document.querySelector('#live-timeline').innerHTML = liveEvents.map((event, index) => `
    <article class="timeline-event ${index === 0 ? 'latest' : ''}"><small>${event.time}</small><span style="--event-color:${event.color}">${event.mark}</span><div><b>${event.title}</b><p>${event.detail}</p></div><strong>${event.value}</strong></article>`).join('');
  document.querySelector('#live-event-count').textContent = liveEvents.length;
}

function updateLiveScores() {
  document.querySelector('#live-home-score').textContent = liveState.home.toFixed(1);
  document.querySelector('#live-away-score').textContent = liveState.away.toFixed(1);
  const lead = liveState.home - liveState.away;
  document.querySelector('#live-lead-copy').textContent = `${lead >= 0 ? "Eren's Dynasty" : "Can's Crew"} +${Math.abs(lead).toFixed(1)}`;
  const chance = Math.max(35, Math.min(78, Math.round(50 + lead / 2)));
  document.querySelector('#live-win-chance').textContent = `%${chance} KAZANMA ŞANSI`;
  document.querySelector('#live-lead-bar').style.width = `${chance}%`;
  document.querySelector('#live-updated-at').textContent = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function simulateLiveTick() {
  if (liveState.paused || document.querySelector('#live-view').hidden) return;
  const player = livePlayers[liveState.tick % livePlayers.length];
  const delta = [1.2, 2.5, 3, 1.5][liveState.tick % 4];
  if (player.side === 'home') liveState.home += delta; else liveState.away += delta;
  player.fp += delta;
  liveEvents.unshift({ time: 'ŞİMDİ', mark: player.mark, color: player.color, title: `${player.name} fantasy puanı kazandı`, detail: `Canlı istatistik güncellemesi · +${delta.toFixed(1)} FP`, value: `+${delta.toFixed(1)} FP` });
  liveEvents.slice(1).forEach((event, index) => { event.time = `${(index + 1) * 2} DK`; });
  if (liveEvents.length > 8) liveEvents.pop();
  liveState.tick += 1; renderLiveCenter();
}

renderLiveCenter();
window.liveFantasyTimer = setInterval(simulateLiveTick, 5000);

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
  const labels = { feed: 'Akış sayfasındasın', matchups: 'Eşleşmeler açıldı', teams: 'Lig tablosu açıldı', trades: 'Takas Merkezi açıldı', champions: 'E-MAC şampiyonları açıldı', profile: 'Profilin açıldı', roster: 'Takım kadron açıldı' };
  toast.textContent = labels[view] || view; toast.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

const avatarPalette = {
  skin: { light: '#f0c29b', warm: '#d99a6c', olive: '#bd825c', tan: '#a96c4c', dark: '#6f4938' },
  eye: { brown: '#3a241d', blue: '#315b8f', green: '#3f6b50', gray: '#68727c' },
  hair: { black: '#121116', brown: '#3b281f', blond: '#9c7b3a', red: '#74392e' },
  jersey: { purple: '#4a276b', blue: '#243f78', gold: '#9a7925', green: '#245843' }
};
const defaultAvatar = { id: 'a' };
const storedAvatar = JSON.parse(localStorage.getItem('emac-avatar') || 'null');
let avatarDraft = storedAvatar?.id || defaultAvatar.id;

function legacyPixelAvatar(config = defaultAvatar, label = 'Piksel avatar') {
  const skinTones = {
    light: { base: '#f5c89f', light: '#ffdab5', shade: '#c98261', deep: '#925343' },
    warm: { base: '#d89461', light: '#efb17a', shade: '#a45f43', deep: '#744033' },
    tan: { base: '#a9633f', light: '#c98053', shade: '#78442f', deep: '#4d2c27' },
    dark: { base: '#70452f', light: '#8e5a3d', shade: '#4d3027', deep: '#30201f' }
  };
  const skin = skinTones[config.skin] || skinTones.warm;
  const eye = avatarPalette.eye[config.eye] || avatarPalette.eye.brown;
  const hair = avatarPalette.hair[config.hairColor] || avatarPalette.hair.black;
  const jersey = avatarPalette.jersey[config.jersey] || avatarPalette.jersey.purple;
  const faceShapes = {
    oval: `<path fill="${skin.base}" d="M9 8h14v2h2v11h-2v4h-3v2h-8v-2H9v-4H7V10h2z"/>`,
    square: `<path fill="${skin.base}" d="M8 8h16v15h-2v3h-3v2h-6v-2h-3v-3H8z"/>`,
    round: `<path fill="${skin.base}" d="M10 7h12v2h3v12h-2v4h-4v2h-6v-2H9v-4H7V10h3z"/>`
  };
  const hairShapes = {
    short: `<path fill="${hair}" d="M8 10V6h3V4h11v2h3v5h-3V8H11v3H8z"/><path fill="#fff" opacity=".09" d="M11 5h8v1h-8z"/>`,
    spiky: `<path fill="${hair}" d="M7 11V7h2V3l3 2 2-4 3 3 4-3v4l4-2-1 5h2v5h-3V9H11v3H7z"/><path fill="#fff" opacity=".1" d="M12 5h3v2h-4z"/>`,
    curly: `<path fill="${hair}" d="M7 12V7h2V4h3V2h3v2h3V2h3v2h3v3h2v6h-4V9H11v4H7z"/><path fill="#fff" opacity=".09" d="M10 5h3v2h-3zm6-1h3v2h-3zm5 2h3v2h-3z"/>`,
    fade: `<path fill="${hair}" d="M8 12V7h3V4h11v2h3v7h-3V9H11v3H8z"/><path fill="${hair}" opacity=".55" d="M7 10h3v7H7zm15 1h4v5h-4z"/><path fill="#fff" opacity=".1" d="M12 5h8v1h-8z"/>`,
    long: `<path fill="${hair}" d="M7 13V7h3V4h13v2h3v16h-4V9H11v13H7z"/><path fill="#fff" opacity=".08" d="M10 6h9v2h-9z"/>`,
    bald: `<path fill="${hair}" opacity=".45" d="M11 6h10v1H11zm-2 2h3v2H9z"/>`
  };
  const facialShapes = {
    none: '',
    beard: `<path fill="${hair}" d="M8 17h3v5h2v3h6v-3h2v-5h4v6h-2v4h-4v2h-7v-2H9v-4H7v-6z"/><path fill="#fff" opacity=".08" d="M11 23h2v2h-2zm8-2h2v3h-2z"/>`,
    mustache: `<path fill="${hair}" d="M10 19h4v-2h2v2h2v-2h2v2h4v3h-5v-2h-2v2h-7z"/>`,
    goatee: `<path fill="${hair}" d="M12 19h3v2h5v-2h3v3h-3v6h-6v-6h-2z"/>`
  };
  const expressions = {
    serious: `<path fill="${hair}" d="M11 13h5v1h-5zm9 0h5v1h-5z"/><path fill="#5d2630" d="M14 21h7v1h-7z"/>`,
    neutral: `<path fill="${hair}" d="M11 13h5v1h-5zm9 0h5v1h-5z"/><path fill="#5d2630" d="M14 21h7v1h-7z"/>`,
    happy: `<path fill="${hair}" d="M11 14h5v1h-5zm9 0h5v1h-5z"/><path fill="#fff0dd" d="M14 20h7v2h-2v1h-3v-1h-2z"/>`
  };
  return `<svg class="pixel-avatar-svg" viewBox="0 0 32 32" role="img" aria-label="${label}" shape-rendering="crispEdges">
    <rect width="32" height="32" fill="#070012"/><path fill="#41166c" d="M1 1h30v3H4v24h24V4h3v27H1z"/><path fill="#7d28a3" d="M4 4h2v2H4zm22 22h2v2h-2z"/>
    <path fill="#171222" d="M3 32v-5h5v-3h16v3h5v5z"/><path fill="${jersey}" d="M3 32v-4h6l5 4zm26 0v-4h-6l-5 4z"/><path fill="#f5e9df" d="M12 25h8l-1 7h-6z"/><path fill="${jersey}" d="M15 26h3v2h-1v4h-2v-4h-1v-2z"/>
    <rect fill="${skin.base}" x="13" y="23" width="7" height="4"/>${faceShapes[config.faceShape] || faceShapes.oval}
    <path fill="${skin.light}" d="M10 10h2v9h-2zm3-2h7v2h-7z"/><path fill="${skin.shade}" d="M22 11h3v10h-2v4h-4v2h-2v-2h3v-2h2z"/><path fill="${skin.deep}" opacity=".45" d="M9 20h2v3h2v2h-2v-1H9z"/>
    <rect fill="${skin.base}" x="6" y="13" width="3" height="7"/><rect fill="${skin.shade}" x="23" y="13" width="3" height="7"/><rect fill="${skin.light}" x="7" y="15" width="2" height="2"/>
    ${hairShapes[config.hairStyle] || hairShapes.spiky}
    ${expressions[config.expression] || expressions.serious}
    <path fill="#f7eee8" d="M11 15h5v3h-5zm9 0h5v3h-5z"/><rect fill="${eye}" x="13" y="16" width="2" height="2"/><rect fill="${eye}" x="21" y="16" width="2" height="2"/><rect fill="#130d18" x="14" y="16" width="1" height="1"/><rect fill="#130d18" x="22" y="16" width="1" height="1"/>
    <path fill="${skin.deep}" d="M17 16h2v4h2v1h-5v-2h1z"/>${facialShapes[config.facialHair] || ''}
  </svg>`;
}

function pixelAvatar(config = defaultAvatar, label = 'Retro avatar') {
  const tones = {
    light: { base: '#f5c7a0', light: '#ffe1c0', shade: '#c98567', deep: '#8d5347' },
    warm: { base: '#d89464', light: '#efb17e', shade: '#a45f46', deep: '#744037' },
    tan: { base: '#aa6644', light: '#ca8259', shade: '#784633', deep: '#4d2d29' },
    dark: { base: '#704832', light: '#916044', shade: '#4d3229', deep: '#30211f' }
  };
  const skin = tones[config.skin] || tones.warm;
  const eye = avatarPalette.eye[config.eye] || avatarPalette.eye.brown;
  const hair = avatarPalette.hair[config.hairColor] || avatarPalette.hair.black;
  const accent = avatarPalette.jersey[config.jersey] || avatarPalette.jersey.purple;
  const faces = {
    oval: `<ellipse cx="32" cy="29" rx="15.5" ry="20" fill="${skin.base}"/>`,
    square: `<rect x="16" y="9" width="32" height="40" rx="8" fill="${skin.base}"/>`,
    round: `<ellipse cx="32" cy="29" rx="17" ry="18.5" fill="${skin.base}"/>`
  };
  const hairs = {
    short: `<path d="M16 22c0-10 6-16 16-16 11 0 17 6 17 16l-4-5c-7 1-14-1-22-4l-7 9z" fill="${hair}"/><path d="M22 10c7-4 15-2 20 2" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2" stroke-linecap="round"/>`,
    spiky: `<path d="M15 23 13 13l6 2 1-9 6 5 5-9 4 8 9-6-1 9 7-2-3 13c-7-7-22-9-32-1z" fill="${hair}"/><path d="m20 14 6-4m3 3 5-5m2 7 7-5" stroke="#fff" stroke-opacity=".12" stroke-width="2" stroke-linecap="round"/>`,
    curly: `<g fill="${hair}"><circle cx="18" cy="17" r="8"/><circle cx="23" cy="10" r="8"/><circle cx="32" cy="9" r="9"/><circle cx="41" cy="11" r="8"/><circle cx="47" cy="18" r="7"/></g><path d="M20 10c6-5 15-5 22 1" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="3" stroke-linecap="round"/>`,
    fade: `<path d="M15 25c0-13 5-20 17-20 12 0 18 7 18 20l-5-6c-8 0-16-2-23-6l-7 12z" fill="${hair}"/><path d="M15 20v14m34-14v14" stroke="${hair}" stroke-opacity=".45" stroke-width="4"/><path d="M22 10c8-4 15-2 20 1" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2" stroke-linecap="round"/>`,
    long: `<path d="M14 25C12 12 20 5 32 5s21 7 19 21l-2 25-9-5 3-28c-8 2-15-1-21-5l1 33-9 5V25z" fill="${hair}"/><path d="M19 14c7-6 16-7 24-2" fill="none" stroke="#fff" stroke-opacity=".11" stroke-width="3" stroke-linecap="round"/>`,
    bald: `<path d="M20 12c7-5 17-5 24 1" fill="none" stroke="${hair}" stroke-opacity=".28" stroke-width="2" stroke-linecap="round"/>`
  };
  const brows = config.expression === 'serious'
    ? `<path d="m21 25 7 2m8 0 7-2" stroke="${hair}" stroke-width="2.3" stroke-linecap="round"/>`
    : `<path d="M21 26h7m8 0h7" stroke="${hair}" stroke-width="2" stroke-linecap="round"/>`;
  const mouth = config.expression === 'happy'
    ? `<path d="M26 39c4 5 9 5 13 0" fill="none" stroke="#7a3340" stroke-width="2" stroke-linecap="round"/>`
    : config.expression === 'neutral'
      ? `<path d="M27 40h11" stroke="#7a3340" stroke-width="1.8" stroke-linecap="round"/>`
      : `<path d="M27 41c3-2 8-2 11 0" fill="none" stroke="#6d303b" stroke-width="1.8" stroke-linecap="round"/>`;
  const facial = {
    none: '',
    beard: `<path d="M17 34c2 12 7 17 15 17s14-5 16-17c-3 5-5 8-8 10-5 4-12 4-17 0-3-2-4-5-6-10z" fill="${hair}" fill-opacity=".92"/><path d="M23 42c5 5 13 5 18 0" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="2"/>`,
    mustache: `<path d="M32 37c-4-4-9-2-11 2 4 2 8 1 11-1 3 2 7 3 11 1-2-4-7-6-11-2z" fill="${hair}"/>`,
    goatee: `<path d="M27 38c3-2 7-2 10 0l3 10c-5 4-11 4-16 0z" fill="${hair}"/>`
  };
  return `<svg class="pixel-avatar-svg smooth-avatar-svg" viewBox="0 0 64 64" role="img" aria-label="${label}" shape-rendering="geometricPrecision">
    <defs><linearGradient id="avatar-bg-${config.jersey}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#211040"/><stop offset="1" stop-color="#070011"/></linearGradient></defs>
    <rect width="64" height="64" rx="7" fill="url(#avatar-bg-${config.jersey})"/><rect x="2" y="2" width="60" height="60" rx="6" fill="none" stroke="#8b36b5" stroke-width="2"/>
    <path d="M4 64c1-12 9-18 20-20h16c11 2 19 8 20 20z" fill="#181421"/><path d="M4 64c2-10 7-15 17-18l11 18zm56 0c-2-10-7-15-17-18L32 64z" fill="${accent}"/><path d="m22 46 10 18 10-18-5-3H27z" fill="#fff5ed"/><path d="m30 49 2-3 3 3-1 5 3 10H27l3-10z" fill="${accent}"/>
    <rect x="26" y="40" width="12" height="10" rx="5" fill="${skin.base}"/><ellipse cx="15.5" cy="31" rx="4" ry="7" fill="${skin.base}"/><ellipse cx="48.5" cy="31" rx="4" ry="7" fill="${skin.shade}"/>
    ${faces[config.faceShape] || faces.oval}<path d="M19 17c2-5 8-8 14-8-8 6-9 21-6 34-7-3-11-12-11-20 0-2 1-4 3-6z" fill="${skin.light}" fill-opacity=".34"/><path d="M43 18c4 8 3 19-4 27 5-2 9-8 9-16 0-5-2-9-5-11z" fill="${skin.shade}" fill-opacity=".5"/>
    ${hairs[config.hairStyle] || hairs.spiky}${brows}
    <ellipse cx="24.5" cy="30" rx="4.5" ry="3" fill="#fffaf6"/><ellipse cx="39.5" cy="30" rx="4.5" ry="3" fill="#fffaf6"/><circle cx="25" cy="30" r="2.2" fill="${eye}"/><circle cx="39" cy="30" r="2.2" fill="${eye}"/><circle cx="25" cy="30" r="1" fill="#18101b"/><circle cx="39" cy="30" r="1" fill="#18101b"/><circle cx="25.6" cy="29.4" r=".55" fill="#fff"/><circle cx="39.6" cy="29.4" r=".55" fill="#fff"/>
    <path d="M32 30c-1 4-2 7-3 8 2 1 5 1 7 0" fill="none" stroke="${skin.deep}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>${mouth}${facial[config.facialHair] || ''}
  </svg>`;
}

function emacAvatar(config = defaultAvatar, label = 'E-MAC portresi') {
  const tones = {
    light: { hi: '#f8d4ae', base: '#e9b789', shade: '#b8785b', deep: '#70463e' },
    warm: { hi: '#edb883', base: '#d49163', shade: '#9b5f47', deep: '#603c35' },
    tan: { hi: '#c98960', base: '#a86648', shade: '#784632', deep: '#492d29' },
    dark: { hi: '#936149', base: '#704735', shade: '#4d3028', deep: '#2e2020' }
  };
  const skin = tones[config.skin] || tones.warm;
  const eye = avatarPalette.eye[config.eye] || avatarPalette.eye.brown;
  const hair = avatarPalette.hair[config.hairColor] || avatarPalette.hair.black;
  const accent = avatarPalette.jersey[config.jersey] || avatarPalette.jersey.purple;
  const faceShapes = {
    oval: `M34 25h27l9 8v25l-9 12H43L31 61V48l-6-4v-8l7-3z`,
    square: `M33 24h30l8 8v29l-10 11H42L30 62V47l-6-4v-8l8-3z`,
    round: `M35 23h25l10 9v24L61 69H43L31 60V48l-6-4v-8l8-3z`
  };
  const hairShapes = {
    short: `<path d="M30 35V24l7-9h27l10 10v15l-7-8-8-3-23 5z" fill="${hair}"/><path d="M39 19h18l7 5H38z" fill="#fff" opacity=".07"/>`,
    spiky: `<path d="m29 37-3-17 9 3 2-12 8 7 7-14 6 11 14-9-2 13 10-4-6 22-8-7-12-2-19 7z" fill="${hair}"/><path d="m37 23 8-7m4 8 7-10m2 11 10-8" stroke="#fff" stroke-opacity=".08" stroke-width="3"/>`,
    curly: `<path d="M27 38V23l7-4v-7h8V8h9v4h9V9l8 5v5l7 5v16l-9-8-9-3-23 7z" fill="${hair}"/><path d="M35 17h8v-5h8v6h8v-5h7v9H54v-5H44v6H34z" fill="#fff" opacity=".06"/>`,
    fade: `<path d="M30 38V24l8-11h25l10 10v17l-8-9-10-3-20 6z" fill="${hair}"/><path d="M29 31h7v17h-7zm37-2h8v18h-8z" fill="${hair}" opacity=".5"/><path d="M40 17h19l7 6H38z" fill="#fff" opacity=".07"/>`,
    long: `<path d="M27 40V23l10-11h28l11 12v51H63l3-43-10-4-21 7 3 40H26z" fill="${hair}"/><path d="M38 17h21l8 7H36z" fill="#fff" opacity=".06"/>`,
    bald: `<path d="M36 21h25l9 8v5l-7-5-9-2-19 4z" fill="${hair}" opacity=".25"/>`
  };
  const brows = config.expression === 'serious'
    ? `<path d="m38 39 11 3m7 0 10-4" stroke="${hair}" stroke-width="3"/>`
    : `<path d="M38 41h11m7 0h10" stroke="${hair}" stroke-width="3"/>`;
  const mouths = {
    serious: `<path d="M46 59h13l4 2H48z" fill="${skin.deep}"/>`,
    neutral: `<rect x="47" y="60" width="14" height="3" fill="${skin.deep}"/>`,
    happy: `<path d="M46 58h17l-4 7h-9z" fill="${skin.deep}"/><rect x="50" y="59" width="9" height="2" fill="#f2e5d7"/>`
  };
  const facial = {
    none: '',
    beard: `<path d="M33 51h6v11l8 8h14l7-10V49l5 4v12L62 77H43L32 65z" fill="${hair}"/><path d="M42 66h19v4H46z" fill="#fff" opacity=".06"/>`,
    mustache: `<path d="M45 56h7l4-3 4 3h8v5h-9l-3-2-3 2h-8z" fill="${hair}"/>`,
    goatee: `<path d="M45 56h7l4-3 4 3h8v5h-9l-3-2-3 2h-8zM49 64h14l-2 10H52z" fill="${hair}"/>`
  };
  return `<svg class="pixel-avatar-svg emac-portrait-svg" viewBox="0 0 96 96" role="img" aria-label="${label}" shape-rendering="geometricPrecision">
    <rect width="96" height="96" fill="#04000d"/><path d="M3 3h90v90H3z" fill="none" stroke="#6f268e" stroke-width="3"/>
    <path d="M8 96V83l14-10 19-5h29l18 10v18z" fill="#111016"/><path d="m22 74 20-6 8 28H8V84zM70 68l18 10v18H51l8-28z" fill="#18171d"/>
    <path d="m42 68 13 10 14-10-5 28H49z" fill="#f1e9de"/><path d="m53 78 4-3 4 4-3 5 5 12H50l5-12z" fill="${accent}"/><path d="M20 78 8 87v9h35l-7-24zM75 72l13 8v16H65z" fill="${accent}" opacity=".32"/>
    <rect x="46" y="62" width="17" height="15" fill="${skin.base}"/><path d="M47 69h15l-3 7H50z" fill="${skin.shade}"/>
    <path d="${faceShapes[config.faceShape] || faceShapes.oval}" fill="${skin.base}"/><path d="M34 30h9v34l9 7H43L31 61V48l-6-4v-8l7-3z" fill="${skin.hi}"/><path d="M61 27l9 7v24l-9 12h-9l8-10z" fill="${skin.shade}"/><path d="M28 36h7v16h-7l-5-7v-7z" fill="${skin.base}"/><rect x="28" y="39" width="5" height="8" fill="${skin.deep}" opacity=".45"/>
    ${hairShapes[config.hairStyle] || hairShapes.spiky}${brows}
    <path d="M38 43h12l3 4-4 5H38l-3-4z" fill="#f2e9dc"/><path d="M56 44h10l3 4-4 4h-9l-3-4z" fill="#eaded1"/><rect x="44" y="45" width="4" height="5" fill="${eye}"/><rect x="60" y="46" width="4" height="5" fill="${eye}"/><rect x="46" y="46" width="2" height="3" fill="#100c11"/><rect x="62" y="47" width="2" height="3" fill="#100c11"/><rect x="45" y="45" width="1" height="1" fill="#fff"/>
    <path d="M54 47v9l-5 3h10l4-3" fill="none" stroke="${skin.deep}" stroke-width="3"/>${mouths[config.expression] || mouths.serious}${facial[config.facialHair] || ''}
    <path d="M7 91h25" stroke="#221033" stroke-width="2"/><path d="M66 91h23" stroke="#221033" stroke-width="2"/>
  </svg>`;
}

const premiumAvatarCatalog = [
  { id: 'a', code: 'A', name: 'STRATEJİST', detail: 'Klasik · Gözlük', x: '3.04%', y: '8.64%', sheet: 1 },
  { id: 'b', code: 'B', name: 'OYUN KURUCU', detail: 'Anime · Dinamik', x: '34.14%', y: '8.64%', sheet: 1 },
  { id: 'c', code: 'C', name: 'GENERAL', detail: 'Fade · Tam sakal', x: '65.25%', y: '8.64%', sheet: 1 },
  { id: 'd', code: 'D', name: 'MAESTRO', detail: 'Kıvırcık · Keçi sakal', x: '96.27%', y: '8.64%', sheet: 1 },
  { id: 'e', code: 'E', name: 'ÇAYLAK', detail: 'Kısa · Temiz yüz', x: '3.04%', y: '85.84%', sheet: 1 },
  { id: 'f', code: 'F', name: 'PATRON', detail: 'Klasik · Bıyık', x: '34.14%', y: '85.84%', sheet: 1 },
  { id: 'g', code: 'G', name: 'KAPTAN', detail: 'Fade · Küpe', x: '65.25%', y: '85.84%', sheet: 1 },
  { id: 'h', code: 'H', name: 'RETRO', detail: 'Piksel · Gözlük', x: '96.27%', y: '85.84%', sheet: 1 },
  { id: 'i', code: 'I', name: 'ANALİST', detail: 'Orta saç · Yuvarlak gözlük', x: '3.04%', y: '8.64%', sheet: 2 },
  { id: 'j', code: 'J', name: 'DUVAR', detail: 'Kazıtılmış · Tam sakal', x: '34.14%', y: '8.64%', sheet: 2 },
  { id: 'k', code: 'K', name: 'KURT HOCA', detail: 'Gri saç · Kısa sakal', x: '65.25%', y: '8.64%', sheet: 2 },
  { id: 'l', code: 'L', name: 'DİREKTÖR', detail: 'Topuz · Keçi sakal', x: '96.27%', y: '8.64%', sheet: 2 },
  { id: 'm', code: 'M', name: 'SCOUT', detail: 'Kısa fade · Gözlük', x: '3.04%', y: '85.84%', sheet: 2 },
  { id: 'n', code: 'N', name: 'OTORİTE', detail: 'Kel · Kalın bıyık', x: '34.14%', y: '85.84%', sheet: 2 },
  { id: 'o', code: 'O', name: 'ENERJİ', detail: 'Dreadlock · Küpe', x: '65.25%', y: '85.84%', sheet: 2 },
  { id: 'p', code: 'P', name: 'KESKİN ŞUTÖR', detail: 'Kızıl dalga · Kısa sakal', x: '96.27%', y: '85.84%', sheet: 2 }
];

function catalogAvatar(id = defaultAvatar.id, label = 'E-MAC premium portresi') {
  const avatar = premiumAvatarCatalog.find(item => item.id === id) || premiumAvatarCatalog[0];
  return `<span class="catalog-avatar catalog-sheet-v${avatar.sheet} catalog-avatar-${avatar.id}" style="--avatar-x:${avatar.x};--avatar-y:${avatar.y}" role="img" aria-label="${label}"></span>`;
}

const champions = [
  { name: 'Furkan', season: '2025–26', place: 'ŞAMPİYON', avatar: 'b' },
  { name: 'Kuzeyhan', season: '2024–25', place: 'ŞAMPİYON', avatar: 'd' }
];

function premiumAvatar(config = defaultAvatar, label = 'E-MAC premium portresi') {
  const tones = {
    light: { hi: '#f8d8ba', base: '#e9b78e', mid: '#cf916e', shade: '#a86654', deep: '#684139' },
    warm: { hi: '#efbd8e', base: '#d79568', mid: '#ba744f', shade: '#8e523f', deep: '#56352f' },
    olive: { hi: '#d9a477', base: '#bc805a', mid: '#9d6247', shade: '#744534', deep: '#452c28' },
    tan: { hi: '#c98861', base: '#a8684b', mid: '#89503b', shade: '#623a30', deep: '#3c2825' },
    dark: { hi: '#95634b', base: '#714838', mid: '#59372f', shade: '#3e2926', deep: '#261b1d' }
  };
  const skin = tones[config.skin] || tones.warm;
  const uid = `pa-${[config.skin, config.faceShape, config.hairStyle, config.facialHair, config.glasses, config.earring].join('-')}`;
  const hair = config.hairStyle === 'waves' ? '#252026' : config.hairStyle === 'curly' ? '#17151a' : '#111116';
  const facePaths = {
    angular: `M55 40C64 27 83 22 105 27l17 15 4 39-12 27-22 18H70l-18-18-7-35z`,
    oval: `M58 35C72 23 99 23 116 37l9 36-8 31-23 23H72l-19-20-7-36z`,
    square: `M54 36C69 24 102 24 119 38l6 66-25 23H70l-20-22-5-61z`,
    long: `M59 31C74 21 101 23 116 38l8 39-11 37-19 20H73l-18-24-8-39z`
  };
  const hairStyles = {
    executive: `<path d="M48 64C44 40 55 20 76 14c23-8 47 1 58 21l-4 32-12-21-23-6-37 15z" fill="${hair}"/><path d="M61 27c17-12 39-12 56 1-18-5-35 0-48 10z" fill="#383039"/><path d="M72 19c13-4 28-2 39 4" stroke="#5a4c58" stroke-width="4" opacity=".35"/>`,
    anime: `<path d="m45 68-7-37 17 6 2-22 14 12L85 3l10 20 25-17-4 24 20-8-10 48-16-19-25-4-27 17z" fill="${hair}"/><path d="m60 35 12-17m8 19L94 14m2 25 18-19" stroke="#433846" stroke-width="5"/>`,
    fade: `<path d="M49 66c-3-28 9-48 33-54 23-5 44 6 52 27l-5 31-13-21-28-7-31 18z" fill="${hair}"/><path d="M47 53h14v45H47zm69-9h16v47h-16z" fill="#2b252c" opacity=".52"/><path d="M65 27c18-10 37-8 52 3" stroke="#474048" stroke-width="5" opacity=".45"/>`,
    curly: `<path d="M45 69V40l10-7-2-12 13-2 4-12 14 5 10-10 10 10 14-4 4 13 12 5-2 17 7 10-10 24-15-25-27-8-31 21z" fill="${hair}"/><g fill="#393039"><circle cx="65" cy="24" r="7"/><circle cx="81" cy="17" r="8"/><circle cx="99" cy="18" r="8"/><circle cx="116" cy="27" r="8"/></g>`,
    crop: `<path d="M49 65c-2-25 10-46 33-51 24-5 45 7 52 30l-7 26-12-21-27-7-31 18z" fill="${hair}"/><path d="M60 31c20-13 42-12 59 2l-7 7-25-5-24 7z" fill="#343037"/>`,
    slick: `<path d="M48 67c-3-30 9-49 34-55 22-6 43 5 54 26l-7 31-12-23-28-8-31 20z" fill="${hair}"/><path d="M61 33c10-20 34-27 56-12-21-4-34 7-43 22z" fill="#423740"/><path d="M73 26c12-9 26-11 39-6" stroke="#6a5867" stroke-width="4" opacity=".35"/>`,
    waves: `<path d="M47 67c-2-30 10-49 35-55 24-5 44 7 53 29l-7 29-13-22-26-7-32 19z" fill="${hair}"/><path d="M60 29c8-8 16 6 24-2s16 6 25-1 14 5 20 8" fill="none" stroke="#4c424b" stroke-width="6"/>`,
    shaved: `<path d="M58 39c11-17 39-22 58-4l7 17c-18-12-42-15-65-3z" fill="#2a252b"/><path d="M66 36c15-8 31-7 45 1" stroke="#524a52" stroke-width="3" opacity=".45"/>`
  };
  const beardStyles = {
    none: '',
    stubble: `<path d="M54 86c5 28 17 42 39 43 17 0 29-12 34-38l-8 26-22 17H72l-17-19z" fill="#151319" opacity=".28"/><g fill="#2d2428" opacity=".65"><circle cx="66" cy="105" r="1.4"/><circle cx="75" cy="116" r="1.3"/><circle cx="106" cy="116" r="1.4"/><circle cx="117" cy="101" r="1.3"/></g>`,
    short: `<path d="M52 86c4 31 17 46 41 47 20 0 32-14 36-43l-9 30-24 18H69l-16-21z" fill="#171419"/><path d="M68 121h39l-12 10H79z" fill="#2d272e"/>`,
    full: `<path d="M49 78c1 37 12 60 43 66 28-5 42-26 39-65l-10 29-12 22-17 11-20-10-15-23z" fill="#121116"/><path d="M62 108c8 21 18 28 31 29 14-2 24-12 31-31-5 29-17 39-32 43-18-4-29-16-30-41z" fill="#292229"/>`,
    goatee: `<path d="M75 102c9-7 23-7 32 0l-6 11H82zM79 117h29l-7 24H84z" fill="#151217"/>`,
    mustache: `<path d="M72 104c8-10 16-7 21 0 6-7 15-10 23 0-8 8-16 9-23 3-7 6-14 5-21-3z" fill="#151217"/>`
  };
  const glassesStyles = {
    none: '',
    square: `<g fill="none" stroke="#c6b9a8" stroke-width="4"><rect x="58" y="72" width="29" height="22" rx="3"/><rect x="96" y="70" width="27" height="22" rx="3"/><path d="M87 80h9m27-2 9-5"/></g>`,
    round: `<g fill="none" stroke="#b7aa9d" stroke-width="4"><circle cx="73" cy="82" r="14"/><circle cx="110" cy="80" r="13"/><path d="M87 81h10m26-3 8-4"/></g>`,
    rimless: `<g fill="rgba(180,205,220,.08)" stroke="#8c9094" stroke-width="2"><path d="M58 73h29v17l-7 6H65l-7-7zM97 72h26v17l-7 5h-14l-5-6z"/><path d="M87 80h10"/></g>`
  };
  const earringStyles = {
    none: '',
    stud: `<circle cx="48" cy="89" r="4" fill="#e1c45c"/><circle cx="47" cy="88" r="1.5" fill="#fff3b0"/>`,
    hoop: `<circle cx="47" cy="94" r="8" fill="none" stroke="#d2b24f" stroke-width="3"/>`
  };
  return `<svg class="pixel-avatar-svg premium-avatar-svg" viewBox="0 0 180 180" role="img" aria-label="${label}" shape-rendering="geometricPrecision">
    <defs><linearGradient id="${uid}-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0d031d"/><stop offset="1" stop-color="#020009"/></linearGradient><linearGradient id="${uid}-skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${skin.hi}"/><stop offset=".48" stop-color="${skin.base}"/><stop offset="1" stop-color="${skin.shade}"/></linearGradient><linearGradient id="${uid}-suit" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#232129"/><stop offset="1" stop-color="#0d0c12"/></linearGradient></defs>
    <rect width="180" height="180" fill="url(#${uid}-bg)"/><rect x="4" y="4" width="172" height="172" fill="none" stroke="#72298f" stroke-width="4"/>
    <path d="M4 180v-22c5-22 24-34 55-41h65c31 7 47 20 52 41v22z" fill="url(#${uid}-suit)"/><path d="m49 122 39 58H4v-20c5-19 20-31 45-38zm77 0 50 37v21H91z" fill="#191820"/><path d="m65 119 26 28 29-28-9 61H73z" fill="#f1e9df"/><path d="m86 144 6-8 8 8-5 12 9 24H80l10-24z" fill="#4d286e"/>
    <path d="M73 111h40v26l-20 14-20-16z" fill="${skin.base}"/><path d="M76 124h34l-17 18z" fill="${skin.shade}" opacity=".65"/>
    <path d="${facePaths[config.faceShape] || facePaths.angular}" fill="url(#${uid}-skin)"/><path d="M56 42c9-12 25-17 43-16-18 15-25 50-16 91l-17-8-15-28-6-8z" fill="${skin.hi}" opacity=".32"/><path d="M111 31c14 15 18 43 8 75l-20 19 14-37z" fill="${skin.deep}" opacity=".2"/>
    <path d="M47 69c-11 1-16 10-12 24l14 17 10-7V76z" fill="${skin.base}"/><path d="M43 80c-5 4-3 13 4 18l6-5-5-13z" fill="${skin.shade}"/>${hairStyles[config.hairStyle] || hairStyles.executive}
    <path d="m58 68 27 3-5 7-22-2zm45 3 20-3 5 7-22 3z" fill="${hair}"/><path d="M60 78h26l7 8-8 11H63L54 87zM101 80h24l8 8-9 10h-21l-8-9z" fill="#f8f4ee"/><ellipse cx="75" cy="87" rx="6" ry="7" fill="#4b3028"/><ellipse cx="114" cy="88" rx="6" ry="7" fill="#4b3028"/><circle cx="76" cy="87" r="3" fill="#0d0a0d"/><circle cx="115" cy="88" r="3" fill="#0d0a0d"/><circle cx="78" cy="84" r="1.5" fill="#fff"/><circle cx="117" cy="85" r="1.5" fill="#fff"/>
    <path d="M96 84c-1 10-5 19-10 25l13 4 11-6" fill="none" stroke="${skin.deep}" stroke-width="4"/><path d="M77 115c10-4 22-3 31 2-8 8-23 9-31-2z" fill="${skin.deep}"/><path d="M83 117h18" stroke="#f2d8ca" stroke-width="2" opacity=".7"/>
    ${beardStyles[config.facialHair] || ''}${glassesStyles[config.glasses] || ''}${earringStyles[config.earring] || ''}
    <path d="M8 169h48m69 0h47" stroke="#2f1143" stroke-width="3"/>
  </svg>`;
}

function renderChampions() {
  document.querySelector('#champions-list').innerHTML = champions.map((champion, index) => `<article class="champion-card ${index === 0 ? 'latest' : ''}">
    <span class="champion-cup">${index === 0 ? '♛' : '♜'}</span><div class="champion-info"><small>${champion.place}</small><h2>${champion.name}</h2><strong>${champion.season}</strong><p>E-MAC CHAMPION</p></div><div class="champion-avatar">${catalogAvatar(champion.avatar, `${champion.name} avatarı`)}</div>
  </article>`).join('');
}

function renderFeedIstanbul() {
  const feedSkyline = document.querySelector('.arcade-skyline');
  const sourceSkyline = document.querySelector('.champion-skyline svg');
  if (!feedSkyline || !sourceSkyline) return;
  feedSkyline.innerHTML = sourceSkyline.outerHTML;
  feedSkyline.classList.add('feed-istanbul-skyline');
}

function renderAvatarStudio() {
  const selected = premiumAvatarCatalog.find(item => item.id === avatarDraft) || premiumAvatarCatalog[0];
  avatarDraft = selected.id;
  document.querySelector('#avatar-studio-preview').innerHTML = catalogAvatar(selected.id, `${selected.name} ön izlemesi`);
  document.querySelector('#avatar-selection-code').textContent = `AVATAR ${selected.code}`;
  document.querySelector('#avatar-selection-name').textContent = selected.name;
  document.querySelector('#avatar-catalog-grid').innerHTML = premiumAvatarCatalog.map(avatar => `<button type="button" class="avatar-catalog-card ${avatar.id === selected.id ? 'selected' : ''}" data-avatar-id="${avatar.id}" aria-pressed="${avatar.id === selected.id}">
    <span class="avatar-card-portrait">${catalogAvatar(avatar.id, `${avatar.name} portresi`)}</span><span class="avatar-card-copy"><b>${avatar.name}</b><small>${avatar.detail}</small></span><i>${avatar.id === selected.id ? 'SEÇİLİ' : 'SEÇ'}</i>
  </button>`).join('');
}

document.querySelector('#avatar-view').addEventListener('click', event => {
  const option = event.target.closest('[data-avatar-id]');
  if (!option) return;
  avatarDraft = option.dataset.avatarId;
  renderAvatarStudio();
});
document.querySelector('#random-avatar').addEventListener('click', () => {
  const alternatives = premiumAvatarCatalog.filter(avatar => avatar.id !== avatarDraft);
  avatarDraft = alternatives[Math.floor(Math.random() * alternatives.length)].id;
  renderAvatarStudio();
});
document.querySelector('#save-avatar').addEventListener('click', () => {
  localStorage.setItem('emac-avatar', JSON.stringify({ id: avatarDraft }));
  updateUserInterface(); showToast('Premium avatarın E-MAC profiline kaydedildi');
  setTimeout(() => document.querySelector('[data-view="profile"]').click(), 500);
});
renderChampions();
renderFeedIstanbul();
renderAvatarStudio();

document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
  const view = button.dataset.view;
  const pageId = { matchups: 'matchups-view', live: 'live-view', teams: 'teams-view', trades: 'trades-view', 'trade-compose': 'trade-compose-view', notifications: 'notifications-view', profile: 'profile-view', roster: 'roster-view', avatar: 'avatar-view', champions: 'champions-view', 'all-news': 'all-news-view' }[view];
  const activeNav = ({ matchups: 'matchups', live: 'matchups', trades: 'trades', 'trade-compose': 'trades', champions: 'champions', roster: 'roster', profile: 'none', avatar: 'none' })[view] || 'feed';
  document.querySelectorAll('.nav-item').forEach(item => item.classList.toggle('active', item.dataset.view === activeNav));
  document.querySelectorAll('.app-shell > header, .app-shell > .arcade-skyline, .app-shell > .league-picker, .app-shell > section').forEach(item => {
    item.hidden = pageId ? item.id !== pageId : item.id.endsWith('-view');
  });
  if (!pageId && view !== 'feed') showToast(view);
}));

document.querySelector('#matchup-list').addEventListener('click', event => {
  const card = event.target.closest('[data-open-live="true"]');
  if (card) document.querySelector('[data-view="live"]').click();
});

document.querySelectorAll('[data-live-tab]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-live-tab]').forEach(item => item.classList.toggle('selected', item === button));
  document.querySelectorAll('[data-live-panel]').forEach(panel => panel.hidden = panel.dataset.livePanel !== button.dataset.liveTab);
}));

document.querySelector('#live-pause-button').addEventListener('click', () => {
  liveState.paused = !liveState.paused;
  const button = document.querySelector('#live-pause-button');
  button.classList.toggle('paused', liveState.paused);
  button.querySelector('span').textContent = liveState.paused ? 'DEVAM ET' : 'DURAKLAT';
  document.querySelector('#live-source-copy').textContent = liveState.paused ? 'Canlı akış kullanıcı tarafından duraklatıldı' : 'Demo modu · Yahoo bağlantısı bekleniyor';
});

document.querySelectorAll('[data-notification-filter]').forEach(button => button.addEventListener('click', () => {
  activeNotificationFilter = button.dataset.notificationFilter;
  document.querySelectorAll('[data-notification-filter]').forEach(item => item.classList.toggle('selected', item === button));
  renderNotifications();
}));

document.querySelector('#mark-all-read').addEventListener('click', () => {
  notifications.forEach(item => { item.unread = false; });
  renderNotifications(); showToast('Tüm bildirimler okundu');
});

document.querySelector('#notification-list').addEventListener('click', event => {
  const card = event.target.closest('[data-notification-id]');
  if (!card) return;
  const notification = notifications.find(item => item.id === Number(card.dataset.notificationId));
  notification.unread = false; renderNotifications();
  const target = event.target.closest('[data-notification-target]')?.dataset.notificationTarget;
  if (target) document.querySelector(`[data-view="${target}"]`).click();
});

document.querySelector('#notification-settings-button').addEventListener('click', () => {
  const panel = document.querySelector('#notification-preferences');
  panel.hidden = !panel.hidden;
});

document.querySelectorAll('[data-notification-setting]').forEach(input => {
  const saved = localStorage.getItem(`notification-${input.dataset.notificationSetting}`);
  if (saved !== null) input.checked = saved === 'true';
  input.addEventListener('change', () => {
    localStorage.setItem(`notification-${input.dataset.notificationSetting}`, input.checked);
    showToast(input.checked ? 'Bildirim açıldı' : 'Bildirim kapatıldı');
  });
});

document.querySelectorAll('[data-trade-filter]').forEach(button => button.addEventListener('click', () => {
  activeTradeFilter = button.dataset.tradeFilter;
  document.querySelectorAll('[data-trade-filter]').forEach(item => item.classList.toggle('selected', item === button));
  renderTrades();
}));

document.querySelector('#trade-list').addEventListener('click', event => {
  const button = event.target.closest('[data-trade-action]');
  if (!button) return;
  const card = button.closest('[data-trade-id]');
  const trade = trades.find(item => item.id === Number(card.dataset.tradeId));
  if (button.dataset.tradeAction === 'detail') return showToast('Takas ayrıntıları görüntüleniyor');
  trade.actions = false; trade.type = 'finished';
  if (button.dataset.tradeAction === 'accept') {
    trade.status = 'KABUL EDİLDİ'; trade.statusClass = 'approved'; trade.note = 'Teklif kabul edildi ve komiser onayına gönderildi.';
    showToast('Takas teklifi kabul edildi');
  } else {
    trade.status = 'REDDEDİLDİ'; trade.statusClass = 'rejected'; trade.note = 'Teklif tarafınızdan reddedildi.';
    showToast('Takas teklifi reddedildi');
  }
  renderTrades();
});

document.querySelectorAll('[data-trade-add]').forEach(button => button.addEventListener('click', () => showToast(`${button.dataset.tradeAdd === 'send' ? 'Gönderilecek' : 'Alınacak'} oyuncu listesi açıldı`)));
document.querySelector('#trade-note').addEventListener('input', event => document.querySelector('#trade-note-count').textContent = event.target.value.length);
document.querySelector('#send-trade').addEventListener('click', () => {
  trades.unshift({ id: Date.now(), type: 'review', status: 'CEVAP BEKLİYOR', statusClass: 'incoming', from: "Eren's Dynasty", to: document.querySelector('#trade-team').value, time: 'Şimdi', offered: [['JT','Jayson Tatum','SF · BOS','#278dff']], requested: [['SC','Stephen Curry','PG · GSW','#ffd51b']], note: document.querySelector('#trade-note').value || 'Yeni takas teklifi gönderildi.', actions: false });
  activeTradeFilter = 'all'; renderTrades(); showToast('Takas teklifi gönderildi');
  setTimeout(() => document.querySelector('[data-view="trades"]').click(), 550);
});

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
      document.querySelector('#live-source-copy').textContent = 'Demo modu · Yahoo API anahtarları bekleniyor';
    } else if (!status.connected) {
      yahooTitle.textContent = 'Yahoo Fantasy bağlantısı hazır';
      yahooDetail.textContent = 'Komiser hesabıyla güvenli giriş yap.';
      yahooButton.textContent = "YAHOO'YA BAĞLAN";
      document.querySelector('#live-source-copy').textContent = 'Demo modu · Yahoo hesabı bağlanmaya hazır';
    } else {
      yahooTitle.textContent = 'Yahoo Fantasy bağlı';
      yahooDetail.textContent = status.leagueKey ? `Lig: ${status.leagueKey}` : 'Lig anahtarı seçilmeyi bekliyor.';
      yahooButton.textContent = 'VERİYİ YENİLE';
      document.querySelector('#live-source-copy').textContent = 'Yahoo Fantasy bağlı · Canlı senkronizasyon hazır';
      document.querySelector('#live-source').classList.add('yahoo-live');
    }
  } catch {
    const isPublishedDemo = location.hostname.endsWith('github.io') || location.hostname.includes('githack.com');
    yahooCard.classList.toggle('error', !isPublishedDemo);
    yahooTitle.textContent = isPublishedDemo ? 'Yahoo entegrasyonu hazırlanıyor' : 'Yahoo backend çevrimdışı';
    yahooDetail.textContent = isPublishedDemo ? 'API onayı sonrası canlı lig verileri burada görünecek.' : 'Canlı veri için uygulamayı Node sunucusuyla aç.';
    yahooButton.textContent = isPublishedDemo ? 'YAKINDA' : 'YEREL KURULUM'; yahooButton.disabled = true;
    document.querySelector('#live-source-copy').textContent = 'Demo modu · Yahoo bağlantısı bekleniyor';
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

// Local prototype user system. Production will replace this store with server-side authentication.
const defaultUser = { name: 'Eren Demir', email: 'eren@fridayleague.com', team: "Eren's Dynasty", role: 'Takım Sahibi' };
let currentUser = null;

function userInitials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toLocaleUpperCase('tr-TR') || 'FL';
}

function storedSession() {
  return localStorage.getItem('fantasy-session') || sessionStorage.getItem('fantasy-session');
}

function updateUserInterface() {
  const initials = userInitials(currentUser.name);
  const savedAvatar = JSON.parse(localStorage.getItem('emac-avatar') || 'null');
  document.querySelector('#header-user-initials').innerHTML = savedAvatar?.id ? catalogAvatar(savedAvatar.id, 'Profil avatarı') : initials;
  document.querySelector('#profile-avatar').innerHTML = savedAvatar?.id ? catalogAvatar(savedAvatar.id, 'Profil avatarı') : initials;
  document.querySelector('#profile-team-mark').textContent = currentUser.team.split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase();
  document.querySelector('#roster-team-mark').textContent = currentUser.team.split(/\s+/).map(word => word[0]).slice(0, 2).join('').toUpperCase();
  document.querySelector('#profile-name').textContent = currentUser.name;
  document.querySelector('#profile-email').textContent = currentUser.email;
  document.querySelector('#profile-team-name').textContent = currentUser.team;
  document.querySelector('#roster-team-name').textContent = currentUser.team;
  document.querySelector('#edit-user-name').value = currentUser.name;
  document.querySelector('#edit-user-email').value = currentUser.email;
  document.querySelector('#edit-team-name').value = currentUser.team;
  document.querySelector('#profile-provider').hidden = currentUser.provider !== 'yahoo';
}

function showApplication(user) {
  currentUser = user;
  document.querySelector('#auth-screen').hidden = true;
  document.querySelector('.app-shell').hidden = false;
  document.querySelector('.bottom-nav').hidden = false;
  updateUserInterface();
}

function showAuthentication() {
  currentUser = null;
  document.querySelector('#auth-screen').hidden = false;
  document.querySelector('.app-shell').hidden = true;
  document.querySelector('.bottom-nav').hidden = true;
  window.scrollTo(0, 0);
}

function saveSession(user, persistent = true) {
  localStorage.setItem('fantasy-user', JSON.stringify(user));
  const storage = persistent ? localStorage : sessionStorage;
  localStorage.removeItem('fantasy-session'); sessionStorage.removeItem('fantasy-session');
  storage.setItem('fantasy-session', JSON.stringify({ email: user.email, createdAt: Date.now() }));
  showApplication(user);
}

document.querySelectorAll('[data-auth-tab]').forEach(button => button.addEventListener('click', () => {
  const tab = button.dataset.authTab;
  document.querySelectorAll('[data-auth-tab]').forEach(item => item.classList.toggle('selected', item === button));
  document.querySelectorAll('[data-auth-form]').forEach(form => {
    const active = form.dataset.authForm === tab;
    form.hidden = !active; form.classList.toggle('active', active);
  });
}));

document.querySelectorAll('[data-toggle-password]').forEach(button => button.addEventListener('click', () => {
  const input = document.querySelector(`#${button.dataset.togglePassword}`);
  input.type = input.type === 'password' ? 'text' : 'password';
  button.textContent = input.type === 'password' ? 'GÖR' : 'GİZLE';
}));

document.querySelector('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#login-email').value.trim().toLowerCase();
  const saved = JSON.parse(localStorage.getItem('fantasy-user') || 'null');
  const user = saved?.email.toLowerCase() === email ? saved : { ...defaultUser, email };
  saveSession(user, document.querySelector('#remember-user').checked);
  showToast(`Hoş geldin, ${user.name.split(' ')[0]}`);
});

document.querySelector('#demo-login').addEventListener('click', () => {
  saveSession(defaultUser, true); showToast('Demo hesaba giriş yapıldı');
});

document.querySelector('#yahoo-login-button').addEventListener('click', async () => {
  const button = document.querySelector('#yahoo-login-button');
  const note = document.querySelector('#yahoo-login-note');
  button.disabled = true; button.querySelector('b').textContent = 'YAHOO KONTROL EDİLİYOR...';
  try {
    const response = await fetch('/api/yahoo/status', { cache: 'no-store' });
    const status = await response.json();
    if (!status.configured) {
      note.textContent = 'Yahoo Developer onayı ve API anahtarları bekleniyor. Onay geldiğinde bu düğme gerçek Yahoo giriş ekranını açacak.';
      note.hidden = false; button.disabled = false; button.querySelector('b').textContent = 'YAHOO İLE DEVAM ET';
      return;
    }
    location.assign('/auth/yahoo?purpose=login');
  } catch {
    note.textContent = 'Yahoo giriş servisine ulaşılamadı. Yerel sunucunun açık olduğundan emin ol.';
    note.hidden = false; button.disabled = false; button.querySelector('b').textContent = 'YAHOO İLE DEVAM ET';
  }
});

document.querySelector('#register-form').addEventListener('submit', event => {
  event.preventDefault();
  const inviteCode = document.querySelector('#invite-code').value.trim().toUpperCase();
  if (inviteCode !== 'EMAC-2026') return showToast('Lig davet kodu geçersiz');
  const user = {
    name: document.querySelector('#register-name').value.trim(),
    email: document.querySelector('#register-email').value.trim().toLowerCase(),
    team: document.querySelector('#register-team').value.trim(), role: 'Takım Sahibi'
  };
  saveSession(user, true); showToast('Hesabın ve takımın oluşturuldu');
});

document.querySelector('#forgot-password').addEventListener('click', () => showToast('Şifre yenileme bağlantısı e-postana gönderildi'));
document.querySelector('#profile-edit-button').addEventListener('click', () => document.querySelector('#account-editor').hidden = false);
document.querySelector('#account-details-button').addEventListener('click', () => document.querySelector('#account-editor').hidden = false);
document.querySelector('#cancel-profile-edit').addEventListener('click', () => document.querySelector('#account-editor').hidden = true);
document.querySelector('#save-profile').addEventListener('click', () => {
  currentUser = {
    ...currentUser,
    name: document.querySelector('#edit-user-name').value.trim() || currentUser.name,
    email: document.querySelector('#edit-user-email').value.trim() || currentUser.email,
    team: document.querySelector('#edit-team-name').value.trim() || currentUser.team
  };
  localStorage.setItem('fantasy-user', JSON.stringify(currentUser));
  updateUserInterface(); document.querySelector('#account-editor').hidden = true; showToast('Profil bilgileri güncellendi');
});

document.querySelector('#league-code-button').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('EMAC-2026'); showToast('Lig davet kodu kopyalandı'); }
  catch { showToast('Lig davet kodu: EMAC-2026'); }
});
document.querySelector('#security-button').addEventListener('click', () => showToast('Bu cihazdaki oturum güvenli ve aktif'));
document.querySelector('#logout-button').addEventListener('click', () => {
  localStorage.removeItem('fantasy-session'); sessionStorage.removeItem('fantasy-session');
  showAuthentication(); showToast('Oturum kapatıldı');
});

async function initializeUserSystem() {
  const params = new URLSearchParams(location.search);
  if (params.get('yahoo_login') === 'success') {
    try {
      const response = await fetch('/api/yahoo/user', { cache: 'no-store' });
      if (!response.ok) throw new Error('Yahoo profili alınamadı');
      const { user: yahooUser } = await response.json();
      const savedUser = JSON.parse(localStorage.getItem('fantasy-user') || 'null');
      const user = {
        name: yahooUser.name || savedUser?.name || 'Yahoo Kullanıcısı',
        email: yahooUser.email || savedUser?.email || 'Yahoo hesabı',
        team: savedUser?.team || 'Fantasy Takımım', role: 'Takım Sahibi', provider: 'yahoo', yahooId: yahooUser.id
      };
      saveSession(user, true); showToast('Yahoo hesabınla giriş yapıldı');
    } catch (error) {
      showAuthentication();
      const note = document.querySelector('#yahoo-login-note'); note.textContent = error.message; note.hidden = false;
    }
    history.replaceState({}, '', location.pathname);
    return;
  }
  if (params.get('yahoo_login') === 'denied') {
    showAuthentication();
    const note = document.querySelector('#yahoo-login-note'); note.textContent = 'Yahoo giriş izni verilmedi. İstersen tekrar deneyebilir veya e-postayla giriş yapabilirsin.'; note.hidden = false;
    history.replaceState({}, '', location.pathname); return;
  }
  try {
    const session = JSON.parse(storedSession() || 'null');
    const savedUser = JSON.parse(localStorage.getItem('fantasy-user') || 'null');
    if (session) showApplication(savedUser || defaultUser); else showAuthentication();
  } catch {
    showAuthentication();
  }
}

initializeUserSystem();

// Progressive Web App and native-like mobile behaviors.
const splash = document.querySelector('#app-splash');
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => { splash.hidden = true; }, 420);
  }, 650);
});

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('./sw.js?v=25').then(registration => registration.update()).catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (sessionStorage.getItem('emac-sw-v25')) return;
    sessionStorage.setItem('emac-sw-v25', 'ready');
    location.reload();
  });
}

function updateConnectionState() {
  const offline = !navigator.onLine;
  document.querySelector('#offline-banner').hidden = !offline;
  document.body.classList.toggle('is-offline', offline);
  if (!offline) showToast('Bağlantı yeniden kuruldu');
}
window.addEventListener('offline', updateConnectionState);
window.addEventListener('online', updateConnectionState);
if (!navigator.onLine) updateConnectionState();

let installPrompt = null;
const installButton = document.querySelector('#install-app-button');
const standaloneMode = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
document.body.classList.toggle('standalone-app', standaloneMode);

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); installPrompt = event; installButton.hidden = false;
});

const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
if (isIos && !standaloneMode) installButton.hidden = false;
installButton.addEventListener('click', async () => {
  if (installPrompt) {
    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') { installButton.hidden = true; showToast('Uygulama ana ekrana ekleniyor'); }
    installPrompt = null; return;
  }
  showToast(isIos ? 'Safari’de Paylaş → Ana Ekrana Ekle seçeneğini kullan' : 'Tarayıcı menüsünden Uygulamayı Yükle seçeneğini kullan');
});
window.addEventListener('appinstalled', () => { installButton.hidden = true; document.body.classList.add('standalone-app'); });

document.addEventListener('click', event => {
  const control = event.target.closest('button, .profile-menu a');
  if (!control) return;
  control.classList.add('touch-active');
  setTimeout(() => control.classList.remove('touch-active'), 130);
  if ('vibrate' in navigator) navigator.vibrate(7);
});

let pullStartY = 0;
let pullDistance = 0;
let pullRoot = null;
const pullIndicator = document.querySelector('#pull-refresh');
document.addEventListener('touchstart', event => {
  if (scrollY > 0 || event.touches.length !== 1 || event.target.closest('input,textarea,select')) return;
  pullStartY = event.touches[0].clientY; pullDistance = 0;
  pullRoot = document.querySelector('.auth-screen:not([hidden])') || document.querySelector('.app-shell:not([hidden])');
}, { passive: true });
document.addEventListener('touchmove', event => {
  if (!pullStartY || !pullRoot) return;
  const distance = event.touches[0].clientY - pullStartY;
  if (distance <= 0) return;
  pullDistance = Math.min(82, distance * .45);
  if (pullDistance > 8) event.preventDefault();
  pullRoot.style.transform = `translateY(${pullDistance}px)`;
  pullIndicator.classList.toggle('ready', pullDistance > 58);
  pullIndicator.style.transform = `translate(-50%, ${Math.max(-45, pullDistance - 60)}px)`;
}, { passive: false });
document.addEventListener('touchend', () => {
  if (!pullRoot) return;
  pullRoot.style.transition = 'transform .22s ease'; pullRoot.style.transform = '';
  pullIndicator.style.transform = ''; pullIndicator.classList.remove('ready');
  if (pullDistance > 58) {
    pullIndicator.classList.add('refreshing');
    if ('vibrate' in navigator) navigator.vibrate(18);
    setTimeout(() => location.reload(), 260);
  }
  setTimeout(() => { if (pullRoot) pullRoot.style.transition = ''; pullRoot = null; }, 240);
  pullStartY = 0; pullDistance = 0;
});
