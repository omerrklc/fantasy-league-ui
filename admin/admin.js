const activities = [
  { icon: '⇄', color: '#1a83ff', title: 'Elite Squad kadro hamlesi yaptı', text: '<strong>Luka Dončić</strong> kadroya eklendi', time: '12 DK ÖNCE', action: 'HABERE DÖNÜŞTÜR' },
  { icon: '▣', color: '#42de76', title: "Eren's Dynasty öne geçti", text: "Can's Crew karşısında skor <strong>842 - 816</strong>", time: '28 DK ÖNCE', action: 'MAÇI GÖR' },
  { icon: '!', color: '#e746d0', title: 'Kadro ihlali tespit edildi', text: 'Bucket Getters için <strong>inceleme bekliyor</strong>', time: '1 SA ÖNCE', action: 'İNCELE' },
  { icon: '✦', color: '#ffd51b', title: 'Haftanın derbisi yaklaşıyor', text: 'Elite Squad vs Bucket Getters · <strong>Cumartesi 21.00</strong>', time: '3 SA ÖNCE', action: 'DUYURU HAZIRLA' }
];

const newsItems = [
  { title: "Dončić ilk sıradan seçildi", desc: 'Draft gecesinin ilk seçimi belli oldu.', category: 'Draft Gecesi', status: 'published', date: 'Bugün · 18.42', mark: 'LD' },
  { title: 'Sezonun ilk büyük takası onaylandı', desc: 'İki takım arasında yıldız takası.', category: 'Takas Merkezi', status: 'published', date: 'Bugün · 14.10', mark: '⇄' },
  { title: "Waiver'da sürpriz hamle", desc: 'Serbest oyuncu piyasası hareketlendi.', category: 'Serbest Oyuncular', status: 'draft', date: 'Bugün · 11.24', mark: '+' },
  { title: 'Haftanın derbisi için kadrolar açıklandı', desc: 'Cumartesi gecesinin büyük maçı.', category: 'Maç Merkezi', status: 'scheduled', date: 'Bugün · 20.30', mark: 'VS' },
  { title: 'Komiserlik ceza kararını duyurdu', desc: 'Kadro ihlali karara bağlandı.', category: 'Lig Ofisi', status: 'published', date: 'Dün · 21.05', mark: '!' },
  { title: "Eren's Dynasty seriyi sürdürdü", desc: 'Haftanın öne çıkan performansı.', category: 'Maç Merkezi', status: 'draft', date: 'Dün · 17.18', mark: 'ED' }
];

const labels = {
  dashboard: 'Genel Bakış', news: 'Lig Haberleri', editor: 'Yeni Haber', visuals: 'Haber Görselleri',
  matches: 'Eşleşmeler', penalties: 'Cezalar', settings: 'Ayarlar'
};

const activityList = document.querySelector('#activity-list');
const newsRows = document.querySelector('#news-rows');
const toast = document.querySelector('#toast');
let activeNewsFilter = 'all';

activityList.innerHTML = activities.map((item, index) => `
  <article class="activity" style="--activity-color:${item.color}">
    <span class="activity-icon">${item.icon}</span>
    <div><b>${item.title}</b><p>${item.text}</p><button data-activity="${index}">${item.action} →</button></div>
    <small>${item.time}</small>
  </article>`).join('');

function statusLabel(status) {
  return { published: 'YAYINDA', draft: 'TASLAK', scheduled: 'PLANLANDI' }[status];
}

function renderNews() {
  const query = document.querySelector('#news-search').value.trim().toLocaleLowerCase('tr-TR');
  const filtered = newsItems.filter(item =>
    (activeNewsFilter === 'all' || item.status === activeNewsFilter) &&
    `${item.title} ${item.desc} ${item.category}`.toLocaleLowerCase('tr-TR').includes(query)
  );
  newsRows.innerHTML = filtered.length ? filtered.map(item => `
    <article class="news-row">
      <div class="news-main"><span class="news-thumb ${item.mark === 'VS' ? 'match-cover' : item.mark === '!' ? 'breaking-cover' : 'trade-cover'}">${item.mark}</span><div><b>${item.title}</b><small>${item.desc}</small></div></div>
      <span>${item.category}</span><span class="status-pill ${item.status}">${statusLabel(item.status)}</span><span>${item.date}</span><button class="row-menu" data-demo-action="Haber işlem menüsü açıldı">⋮</button>
    </article>`).join('') : '<div class="empty-state">Aramana uygun haber bulunamadı.</div>';
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.adminToastTimer);
  window.adminToastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

function setPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.toggle('active', page.id === `${pageName}-page`));
  document.querySelectorAll('.side-nav [data-page]').forEach(button => button.classList.toggle('active', button.dataset.page === pageName));
  document.querySelector('#page-heading').textContent = labels[pageName];
  document.querySelector('#sidebar').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${pageName}`);
  if (pageName === 'editor') updatePreview();
}

document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => setPage(button.dataset.page)));
document.querySelectorAll('[data-page-jump]').forEach(button => button.addEventListener('click', () => setPage(button.dataset.pageJump)));
document.querySelectorAll('[data-open-editor]').forEach(button => button.addEventListener('click', () => setPage('editor')));
document.querySelector('#menu-button').addEventListener('click', () => document.querySelector('#sidebar').classList.toggle('open'));

document.addEventListener('click', event => {
  const demoButton = event.target.closest('[data-demo-action]');
  if (demoButton) showToast(demoButton.dataset.demoAction);
  if (innerWidth <= 820 && !event.target.closest('#sidebar') && !event.target.closest('#menu-button')) document.querySelector('#sidebar').classList.remove('open');
});

document.querySelectorAll('[data-activity]').forEach(button => button.addEventListener('click', () => {
  const item = activities[Number(button.dataset.activity)];
  if (item.action.includes('HABER') || item.action.includes('DUYURU')) {
    document.querySelector('#event-select').value = item.title.includes('derbisi') ? 'Haftanın derbisi: Elite Squad vs Bucket Getters' : 'Elite Squad, Luka Dončić\'i kadrosuna kattı';
    setPage('editor');
  } else showToast(`${item.title} görüntüleniyor`);
}));

document.querySelectorAll('[data-news-filter]').forEach(button => button.addEventListener('click', () => {
  activeNewsFilter = button.dataset.newsFilter;
  document.querySelectorAll('[data-news-filter]').forEach(item => item.classList.toggle('selected', item === button));
  renderNews();
}));
document.querySelector('#news-search').addEventListener('input', renderNews);

document.querySelectorAll('[data-source]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-source]').forEach(item => item.classList.toggle('selected', item === button));
  const source = button.dataset.source;
  const optionIndex = { transaction: 0, match: 1, penalty: 2, custom: 3 }[source];
  document.querySelector('#event-select').selectedIndex = optionIndex;
}));

const titleInput = document.querySelector('#news-title');
const bodyInput = document.querySelector('#news-body');
const categoryInput = document.querySelector('#category');
const previewTitle = document.querySelector('#preview-title');
const previewBody = document.querySelector('#preview-body');
const autosaveState = document.querySelector('#autosave-state');

function updatePreview() {
  previewTitle.textContent = titleInput.value || 'Haber başlığı burada görünecek';
  previewBody.textContent = bodyInput.value || 'Haber metni burada görünecek.';
  document.querySelector('#title-count').textContent = `${titleInput.value.length}/72`;
  document.querySelector('#body-count').textContent = `${bodyInput.value.length}/320`;
  const category = categoryInput.value.toLocaleUpperCase('tr-TR');
  document.querySelector('#preview-category').textContent = category;
  document.querySelector('#preview-category-copy').textContent = category;
}

function markEditing() {
  autosaveState.textContent = '● KAYDEDİLİYOR...';
  autosaveState.style.color = '#ffd51b';
  clearTimeout(window.autosaveTimer);
  window.autosaveTimer = setTimeout(() => {
    localStorage.setItem('fantasy-admin-draft', JSON.stringify({ title: titleInput.value, body: bodyInput.value, category: categoryInput.value }));
    autosaveState.textContent = '● DEĞİŞİKLİKLER KAYDEDİLDİ';
    autosaveState.style.color = '';
  }, 700);
  updatePreview();
}

[titleInput, bodyInput, categoryInput].forEach(input => input.addEventListener('input', markEditing));

const draftTemplates = {
  0: { title: "Elite Squad'dan gecenin bombası: Dončić kadroda!", body: "E-MAC'te gecenin en büyük hamlesi Elite Squad'dan geldi. Takım, yıldız oyuncu Luka Dončić'i kadrosuna kattığını açıkladı. Bu transferin haftanın derbisi öncesinde dengeleri değiştirmesi bekleniyor.", category: 'Son Dakika' },
  1: { title: "Eren's Dynasty, Can's Crew karşısında öne geçti", body: "Haftanın canlı eşleşmesinde Eren's Dynasty kontrolü ele aldı. 842-816 devam eden mücadelede son bölüm oynanırken Can's Crew geri dönüş arıyor.", category: 'Maç Merkezi' },
  2: { title: 'Lig ofisinden Bucket Getters hakkında ceza kararı', body: 'Komiserlik, kadro ihlali incelemesini tamamladı. Bucket Getters için verilen karar ve haftaya etkisi lig yönetimi tarafından açıklandı.', category: 'Lig Ofisi' },
  3: { title: 'Haftanın derbisinde gözler yıldızların üzerinde', body: 'Elite Squad ile Bucket Getters cumartesi gecesi karşı karşıya geliyor. Ligin zirvesini yakından ilgilendiren mücadele saat 21.00’de başlayacak.', category: 'Maç Merkezi' }
};

document.querySelector('#ai-draft').addEventListener('click', () => {
  const template = draftTemplates[document.querySelector('#event-select').selectedIndex] || draftTemplates[0];
  titleInput.value = template.title; bodyInput.value = template.body; categoryInput.value = template.category;
  markEditing(); showToast('AI haber taslağını hazırladı');
});

document.querySelectorAll('[data-cover]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-cover]').forEach(item => item.classList.toggle('active', item === button));
  const cover = document.querySelector('#preview-cover');
  cover.className = `preview-cover ${button.dataset.cover}-cover`;
  document.querySelector('#cover-monogram').textContent = { photo: '', trade: 'LD', match: 'VS', breaking: '!' }[button.dataset.cover];
}));

document.querySelectorAll('[data-visual-type]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-visual-type]').forEach(item => item.classList.toggle('selected', item === button));
  const templates = {
    transfer: 'Gece oynanan büyük transfer haberi. Oyuncu sağ tarafta, başlık için sol tarafta boş alan. Dramatik arena ışıkları ve uygulamanın neon piksel detayları.',
    match: 'İki rakibin karşı karşıya geldiği haftanın derbisi. Karanlık arena, güçlü rekabet duygusu ve skor tabelası atmosferi.',
    penalty: 'Lig ofisinden önemli karar. Ciddi ve resmi atmosfer, kırmızı uyarı ışıkları ve duyuru için temiz başlık alanı.',
    performance: 'Gecenin yıldız oyuncusu için dinamik performans kapağı. Parlak saha ışıkları, enerji ve kutlama atmosferi.'
  };
  document.querySelector('#visual-prompt').value = templates[button.dataset.visualType];
}));

function simulateVisualGeneration() {
  const progress = document.querySelector('#generation-progress');
  const step = document.querySelector('#generation-step');
  const button = document.querySelector('#generate-visual');
  progress.hidden = false; button.disabled = true; button.style.opacity = '.55';
  const steps = ['Kompozisyon oluşturuluyor', 'Arena ışıkları işleniyor', 'Uygulama teması uygulanıyor'];
  let stepIndex = 0;
  const timer = setInterval(() => { step.textContent = steps[++stepIndex % steps.length]; }, 650);
  setTimeout(() => {
    clearInterval(timer); progress.hidden = true; button.disabled = false; button.style.opacity = '';
    const type = document.querySelector('[data-visual-type].selected').dataset.visualType;
    const result = document.querySelector('#visual-result');
    result.className = `visual-result ${type === 'transfer' || type === 'performance' ? 'photo-cover' : type === 'match' ? 'match-cover' : 'breaking-cover'}`;
    document.querySelector('#visual-result-title').innerHTML = { transfer: 'GECENİN<br>BOMBASI', match: 'HAFTANIN<br>DERBİSİ', penalty: 'LİG OFİSİ<br>KARARI', performance: 'GECENİN<br>YILDIZI' }[type];
    showToast('Yeni haber görseli hazırlandı');
  }, 2300);
}

document.querySelector('#generate-visual').addEventListener('click', simulateVisualGeneration);
document.querySelector('#regenerate-visual').addEventListener('click', simulateVisualGeneration);
document.querySelector('#download-visual').addEventListener('click', () => {
  const link = document.createElement('a'); link.href = 'assets/news/trade-night.webp'; link.download = 'fantasy-league-haber-kapagi.webp'; link.click();
  showToast('Görsel indiriliyor');
});

function useVisual(cover = 'photo') {
  const coverButton = document.querySelector(`[data-cover="${cover}"]`) || document.querySelector('[data-cover="photo"]');
  coverButton.click(); setPage('editor'); showToast('Görsel habere eklendi');
}

document.querySelector('#use-visual').addEventListener('click', () => useVisual('photo'));
document.querySelectorAll('[data-use-library]').forEach(button => button.addEventListener('click', () => useVisual(button.dataset.useLibrary)));
document.querySelectorAll('.library-filters button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.library-filters button').forEach(item => item.classList.toggle('selected', item === button));
  showToast(`${button.textContent} görseller gösteriliyor`);
}));

document.querySelector('#save-draft').addEventListener('click', () => {
  localStorage.setItem('fantasy-admin-draft', JSON.stringify({ title: titleInput.value, body: bodyInput.value, category: categoryInput.value }));
  showToast('Haber taslaklara kaydedildi');
});
document.querySelector('#schedule-news').addEventListener('click', () => showToast('Haber 20.30 için planlandı'));
document.querySelector('#publish-news').addEventListener('click', () => {
  if (!titleInput.value.trim() || !bodyInput.value.trim()) return showToast('Başlık ve haber metni gerekli');
  newsItems.unshift({ title: titleInput.value, desc: bodyInput.value.slice(0, 55) + '…', category: categoryInput.value, status: 'published', date: 'Şimdi', mark: 'NEW' });
  renderNews(); showToast('Haber uygulamada yayınlandı');
  setTimeout(() => setPage('news'), 650);
});

document.querySelector('#sync-button').addEventListener('click', () => showToast('Yahoo API onayı henüz bekleniyor'));

const savedDraft = localStorage.getItem('fantasy-admin-draft');
if (savedDraft) {
  try {
    const draft = JSON.parse(savedDraft);
    titleInput.value = draft.title || titleInput.value;
    bodyInput.value = draft.body || bodyInput.value;
    categoryInput.value = draft.category || categoryInput.value;
  } catch {}
}

renderNews();
updatePreview();
const initialPage = location.hash.slice(1);
if (labels[initialPage]) setPage(initialPage);
