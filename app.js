// app.js - التطبيق الرئيسي

function toAr(s){ return String(s).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]); }

// ===== التنقل =====
const NAV_MAP = {
  'home':'nav-home','quran-list':'nav-quran','surah-reader':'nav-quran',
  'prayer':'nav-prayer','dhikr':'nav-dhikr',
  'more':'nav-more','qibla':'nav-more','stories':'nav-more',
  'quiz':'nav-more','zakat':'nav-more','hijri':'nav-more',
};

function goPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(id);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const navId = NAV_MAP[id];
  if (navId) document.getElementById(navId)?.classList.add('active');

  window.scrollTo(0,0);

  // تهيئة خاصة بكل صفحة
  if (id === 'quiz') startQuiz();
  if (id === 'stories') renderStoriesGrid();
  if (id === 'hijri') renderHijriPage();
  if (id === 'qibla') initQibla();
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== القصص =====
function renderStoriesGrid() {
  const grid = document.getElementById('stories-grid-container');
  const detail = document.getElementById('story-detail');
  if (!grid) return;

  detail.classList.remove('active');
  detail.innerHTML = '';
  grid.style.display = 'grid';

  grid.className = 'stories-grid-2';
  grid.innerHTML = STORIES.map((s,i) => `
    <div class="story-tile" onclick="openStory(${i})">
      <div class="st-img" style="background:${s.bg}20">${s.emoji}</div>
      <div class="st-body">
        <div class="st-name">${s.name}</div>
        <div class="st-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

function openStory(idx) {
  const s = STORIES[idx];
  const grid = document.getElementById('stories-grid-container');
  const detail = document.getElementById('story-detail');
  if (!grid || !detail) return;

  grid.style.display = 'none';
  detail.classList.add('active');
  detail.innerHTML = `
    <button class="sd-back" onclick="renderStoriesGrid()">← العودة للقائمة</button>
    <div class="sd-content">
      <div style="text-align:center;font-size:56px;margin-bottom:8px;">${s.emoji}</div>
      ${s.content}
    </div>
  `;
}

// ===== التقويم الهجري =====
function renderHijriPage() {
  // المناسبات
  const list = document.getElementById('occasions-list');
  if (list) {
    list.innerHTML = OCCASIONS.map(o => `
      <div class="occasion-item">
        <div class="oi-dot" style="background:${o.color}"></div>
        <div>
          <div class="oi-name">${o.name}</div>
          <div class="oi-date">${o.date} هجري</div>
        </div>
      </div>
    `).join('');
  }
}

// ===== الزكاة =====
let zakatType = 'cash';
function setZakatType(type, btn) {
  zakatType = type;
  document.querySelectorAll('.zit').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const labels = {
    cash: 'المبلغ الكلي (جنيه مصري)',
    gold: 'وزن الذهب (جرام)',
    silver: 'وزن الفضة (جرام)',
    trade: 'قيمة البضاعة (جنيه مصري)',
  };
  const lbl = document.getElementById('zakat-input-label');
  if (lbl) lbl.textContent = labels[type];
  const inp = document.getElementById('zakat-main-input');
  if (inp) inp.value = '';
  const res = document.getElementById('zakat-result');
  if (res) res.style.display = 'none';
}

function calcZakat() {
  const inp = document.getElementById('zakat-main-input');
  const res = document.getElementById('zakat-result');
  const amountEl = document.getElementById('zrc-amount');
  if (!inp || !res || !amountEl) return;

  const val = parseFloat(inp.value);
  if (!val || val <= 0) { res.style.display = 'none'; return; }

  let zakat = 0;
  if (zakatType === 'cash' || zakatType === 'trade') zakat = val * 0.025;
  else if (zakatType === 'gold') zakat = val * 0.025; // مبسط
  else if (zakatType === 'silver') zakat = val * 0.025;

  amountEl.textContent = toAr(zakat.toFixed(2));
  res.style.display = 'block';
}

// ===== القبلة =====
let qiblaAngle = 282;
function initQibla() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      qiblaAngle = calcQiblaAngle(pos.coords.latitude, pos.coords.longitude);
      const deg = document.getElementById('qibla-deg');
      if (deg) deg.textContent = toAr(Math.round(qiblaAngle)) + '°';
    });
  }
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then(state => {
      if (state === 'granted') listenCompass();
    }).catch(()=>{});
  } else {
    listenCompass();
  }
}

function listenCompass() {
  window.addEventListener('deviceorientation', e => {
    const alpha = e.alpha || 0;
    const rotation = qiblaAngle - alpha;
    const needle = document.getElementById('compass-needle-wrap');
    if (needle) needle.style.transform = `rotate(${rotation}deg)`;
  });
}

function calcQiblaAngle(lat, lng) {
  const meccaLat = 21.4225 * Math.PI/180;
  const meccaLng = 39.8262 * Math.PI/180;
  const userLat2 = lat * Math.PI/180;
  const userLng2 = lng * Math.PI/180;
  const dLng = meccaLng - userLng2;
  const y = Math.sin(dLng) * Math.cos(meccaLat);
  const x = Math.cos(userLat2)*Math.sin(meccaLat) - Math.sin(userLat2)*Math.cos(meccaLat)*Math.cos(dLng);
  let angle = Math.atan2(y, x) * 180/Math.PI;
  return (angle + 360) % 360;
}

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});
