// prayers.js - مواقيت الصلاة

const prayerNames = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
const prayerIcons = ['🌄', '🌅', '☀️', '🌤️', '🌆', '🌙'];

// حساب مواقيت الصلاة (تقريبي بدون API)
function calcPrayerTimes(lat, lng, date) {
  // خوارزمية حساب مبسطة
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;

  const jd = julianDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const tz = -date.getTimezoneOffset() / 60;

  const { decl, eqt } = sunPosition(jd);

  function julianDate(y, m, d) {
    if (m <= 2) { y--; m += 12; }
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  }

  function sunPosition(jd) {
    const D = jd - 2451545.0;
    const g = 357.529 + 0.98560028 * D;
    const q = 280.459 + 0.98564736 * D;
    const L = q + 1.915 * Math.sin(g * D2R) + 0.020 * Math.sin(2 * g * D2R);
    const e = 23.439 - 0.00000036 * D;
    const RA = Math.atan2(Math.cos(e * D2R) * Math.sin(L * D2R), Math.cos(L * D2R)) * R2D / 15;
    const decl = Math.asin(Math.sin(e * D2R) * Math.sin(L * D2R)) * R2D;
    const eqt = q / 15 - ((RA % 24 + 24) % 24);
    return { decl, eqt };
  }

  function hourAngle(angle, lat, decl) {
    const cos_ha = (Math.cos(angle * D2R) - Math.sin(lat * D2R) * Math.sin(decl * D2R)) /
      (Math.cos(lat * D2R) * Math.cos(decl * D2R));
    if (Math.abs(cos_ha) > 1) return null;
    return Math.acos(cos_ha) * R2D / 15;
  }

  const noon = 12 - eqt + (lng / 15 - tz) * -1 + lng / 15;
  const sunriseHA = hourAngle(-0.8333, lat, decl);
  const fajrHA = hourAngle(-18, lat, decl);
  const asrHA = hourAngle(Math.atan(1 + Math.tan(Math.abs(lat - decl) * D2R)) * R2D, lat, decl);
  const ishaHA = hourAngle(-17, lat, decl);

  const times = {
    fajr: noon - (fajrHA || 1.6),
    sunrise: noon - (sunriseHA || 0.25),
    dhuhr: noon,
    asr: noon + (asrHA || 3.5),
    maghrib: noon + (sunriseHA || 0.25),
    isha: noon + (ishaHA || 1.3)
  };

  return Object.fromEntries(Object.entries(times).map(([k, v]) => [k, formatTime(v)]));
}

function formatTime(hours) {
  const h = Math.floor(((hours % 24) + 24) % 24);
  const m = Math.floor(((hours % 1) + 1) % 1 * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function toArabicNums(str) {
  const nums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, d => nums[d]);
}

function getCurrentPrayer(times) {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const arr = [times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
  const mins = arr.map(t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; });
  let current = 5;
  for (let i = 0; i < mins.length; i++) {
    if (cur >= mins[i]) current = i;
  }
  return current;
}

function getNextPrayer(times) {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const arr = [times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
  const mins = arr.map(t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; });
  for (let i = 0; i < mins.length; i++) {
    if (cur < mins[i]) return { idx: i, mins: mins[i] - cur, time: arr[i] };
  }
  return { idx: 0, mins: (24 * 60 - cur) + mins[0], time: arr[0] };
}

function renderHomePrayers(times) {
  const arr = [times.fajr, times.dhuhr, times.asr, times.maghrib, times.isha];
  const names = ['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
  const current = getCurrentPrayer(times);
  const currentIdx = [0, 2, 3, 4, 5].indexOf(current);

  document.getElementById('home-prayers').innerHTML = arr.map((t, i) => `
    <div class="prayer-item ${i === currentIdx ? 'current' : ''}">
      <div class="prayer-label">${names[i]}</div>
      <div class="prayer-time-val">${toArabicNums(t)}</div>
    </div>
  `).join('');
}

function renderFullPrayers(times) {
  const arr = [times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
  const current = getCurrentPrayer(times);

  document.getElementById('full-prayers').innerHTML = arr.map((t, i) => `
    <div class="prayer-item ${i === current ? 'current' : ''}" style="padding:16px 8px;">
      <div style="font-size:20px; margin-bottom:6px;">${prayerIcons[i]}</div>
      <div class="prayer-label">${prayerNames[i]}</div>
      <div class="prayer-time-val">${toArabicNums(t)}</div>
    </div>
  `).join('');
}

function updateNextPrayer(times) {
  const next = getNextPrayer(times);
  const names = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'];
  document.getElementById('next-prayer-name').textContent = names[next.idx];
  document.getElementById('next-prayer-time').textContent = toArabicNums(times[Object.keys(times)[next.idx]]);
  const h = Math.floor(next.mins / 60);
  const m = next.mins % 60;
  document.getElementById('countdown').textContent = `بعد ${toArabicNums(h.toString())}:${toArabicNums(m.toString().padStart(2, '0'))} ساعة`;
}

// تحديد الموقع وحساب المواقيت
function initPrayers() {
  const defaultLat = 30.0444; // القاهرة
  const defaultLng = 31.2357;

  function loadPrayers(lat, lng) {
    const times = calcPrayerTimes(lat, lng, new Date());
    renderHomePrayers(times);
    renderFullPrayers(times);
    updateNextPrayer(times);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        document.getElementById('location-info').textContent = `📍 تم تحديد موقعك`;
        loadPrayers(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        document.getElementById('location-info').textContent = `📍 القاهرة، مصر (افتراضي)`;
        loadPrayers(defaultLat, defaultLng);
      }
    );
  } else {
    document.getElementById('location-info').textContent = `📍 القاهرة، مصر (افتراضي)`;
    loadPrayers(defaultLat, defaultLng);
  }
}

initPrayers();
