// prayers-v2.js - مواقيت الصلاة بـ AlAdhan API

const PRAYER_NAMES = ['الفجر','الشروق','الظهر','العصر','المغرب','العشاء'];
const PRAYER_KEYS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_ICONS = ['🌄','🌅','☀️','🌤️','🌆','🌙'];

let prayerTimes = null;
let userLat = 30.0444, userLng = 31.2357;
let calcMethod = 5;
let countdownInterval = null;

function toAr(str) {
  return String(str).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

function timeToMins(t) {
  const [h, m] = t.replace(/\s*(AM|PM).*/i,'').split(':').map(Number);
  return h * 60 + m;
}

async function fetchPrayerTimes(lat, lng, method) {
  try {
    const today = new Date();
    const d = today.getDate(), m = today.getMonth()+1, y = today.getFullYear();
    const url = `https://api.aladhan.com/v1/timings/${d}-${m}-${y}?latitude=${lat}&longitude=${lng}&method=${method}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.code === 200) {
      return json.data;
    }
  } catch(e) { console.error('Prayer API error:', e); }
  return null;
}

async function loadPrayers() {
  const data = await fetchPrayerTimes(userLat, userLng, calcMethod);
  if (!data) return;
  prayerTimes = data.timings;

  // تحديث التقويم الهجري
  const hijri = data.date.hijri;
  const hijriStr = `${toAr(hijri.day)} ${hijri.month.ar} ${toAr(hijri.year)}`;
  const greg = data.date.gregorian;
  const days = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const months = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const now = new Date();
  const miladiStr = `${days[now.getDay()]}، ${toAr(now.getDate())} ${months[now.getMonth()]} ${toAr(now.getFullYear())}`;

  // الرئيسية
  safeSet('home-hijri', hijriStr);
  safeSet('home-miladi', miladiStr);
  safeSet('hijri-full-date', hijriStr);
  safeSet('miladi-full-date', miladiStr);

  renderHomePrayers();
  renderFullPrayers();
  startCountdown();
}

function safeSet(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function getCurrentPrayerIdx() {
  if (!prayerTimes) return 4;
  const now = new Date();
  const cur = now.getHours()*60 + now.getMinutes();
  const times = [
    timeToMins(prayerTimes.Fajr),
    timeToMins(prayerTimes.Sunrise),
    timeToMins(prayerTimes.Dhuhr),
    timeToMins(prayerTimes.Asr),
    timeToMins(prayerTimes.Maghrib),
    timeToMins(prayerTimes.Isha),
  ];
  let cur_idx = 5;
  for (let i=0; i<times.length; i++) {
    if (cur >= times[i]) cur_idx = i;
  }
  return cur_idx;
}

function getNextPrayer() {
  if (!prayerTimes) return {idx:0, mins:0};
  const now = new Date();
  const cur = now.getHours()*60 + now.getMinutes();
  const times = PRAYER_KEYS.map(k => timeToMins(prayerTimes[k]));
  for (let i=0; i<times.length; i++) {
    if (cur < times[i]) return {idx:i, mins:times[i]-cur, time:prayerTimes[PRAYER_KEYS[i]]};
  }
  return {idx:0, mins:(24*60-cur)+times[0], time:prayerTimes.Fajr};
}

function renderHomePrayers() {
  if (!prayerTimes) return;
  const keys = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  const names = ['الفجر','الظهر','العصر','المغرب','العشاء'];
  const curIdx = getCurrentPrayerIdx();
  const curKeyIdx = [0,2,3,4,5].indexOf(curIdx);

  const next = getNextPrayer();
  safeSet('hp-next-name', PRAYER_NAMES[next.idx]);
  safeSet('hp-next-time', toAr(prayerTimes[PRAYER_KEYS[next.idx]]));

  const container = document.getElementById('hp-mini-prayers');
  if (!container) return;
  container.innerHTML = keys.map((k,i) => `
    <div class="mini-prayer ${i===curKeyIdx?'cur':''}">
      <div class="mini-p-name">${names[i]}</div>
      <div class="mini-p-time">${toAr(prayerTimes[k])}</div>
    </div>
  `).join('');
}

function renderFullPrayers() {
  if (!prayerTimes) return;
  const cur = getCurrentPrayerIdx();
  const container = document.getElementById('prayers-full-grid');
  if (!container) return;
  container.innerHTML = PRAYER_KEYS.map((k,i) => `
    <div class="prayer-full-card ${i===cur?'current':''}">
      <div class="pfc-icon">${PRAYER_ICONS[i]}</div>
      <div class="pfc-info">
        <div class="pfc-name">${PRAYER_NAMES[i]}</div>
        <div class="pfc-time">${toAr(prayerTimes[k])}</div>
      </div>
    </div>
  `).join('');
}

function startCountdown() {
  if (countdownInterval) clearInterval(countdownInterval);
  function update() {
    const next = getNextPrayer();
    if (!next) return;
    const h = Math.floor(next.mins/60);
    const m = next.mins%60;
    const str = h>0 ? `بعد ${toAr(h)} ساعة و${toAr(m)} دقيقة` : `بعد ${toAr(m)} دقيقة`;
    safeSet('hp-countdown', str);
  }
  update();
  countdownInterval = setInterval(update, 60000);
}

function changePrayerMethod() {
  const sel = document.getElementById('calc-method');
  if (sel) {
    calcMethod = parseInt(sel.value);
    loadPrayers();
  }
}

// تهيئة الموقع
function initPrayers() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        userLat = pos.coords.latitude;
        userLng = pos.coords.longitude;
        safeSet('prayer-location-text', '📍 تم تحديد موقعك بنجاح');
        loadPrayers();
      },
      () => {
        safeSet('prayer-location-text', '📍 القاهرة، مصر (افتراضي)');
        loadPrayers();
      },
      {timeout:8000}
    );
  } else {
    loadPrayers();
  }
}

initPrayers();
