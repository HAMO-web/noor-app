// quran-v2.js

let currentSurah = null;
let fontSize = 26;
let showTafsir = false;
let quranCache = {};

function toAr(s){ return String(s).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]); }

// رسم قائمة السور
function renderSurahList(list) {
  const c = document.getElementById('surah-list-container');
  if (!c) return;
  if (!list || list.length === 0) {
    c.innerHTML = '<div style="text-align:center;color:var(--text3);padding:40px;">لا توجد نتائج</div>';
    return;
  }
  c.innerHTML = list.map(s => `
    <div class="surah-card" onclick="openSurah(${s.n})">
      <div class="surah-num-badge">
        <svg viewBox="0 0 42 42"><polygon points="21,2 40,12 40,30 21,40 2,30 2,12" fill="none" stroke="var(--g3)" stroke-width="1.5"/></svg>
        <span class="surah-num-text">${toAr(s.n)}</span>
      </div>
      <div class="surah-info">
        <div class="surah-ar-name">${s.ar}</div>
        <div class="surah-en-name">${s.en}</div>
      </div>
      <div class="surah-right">
        <div class="surah-type-badge ${s.t==='مكية'?'maki':'madani'}">${s.t}</div>
        <div class="surah-verses">${toAr(s.v)} آية</div>
      </div>
    </div>
  `).join('');
}

function filterSurahs(q) {
  const filtered = SURAHS.filter(s =>
    s.ar.includes(q) || s.en.toLowerCase().includes(q.toLowerCase()) || String(s.n).includes(q)
  );
  renderSurahList(filtered);
}

function filterByJuz(juz, btn) {
  document.querySelectorAll('.juz-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (juz === 0) { renderSurahList(SURAHS); return; }
  renderSurahList(SURAHS.filter(s => s.j === juz));
}

async function openSurah(num) {
  const surah = SURAHS.find(s => s.n === num);
  if (!surah) return;
  currentSurah = surah;

  goPage('surah-reader');
  document.getElementById('quran-text-area').innerHTML = `
    <div style="text-align:center;padding:60px 20px;">
      <div style="font-size:32px;margin-bottom:12px;">📖</div>
      <div style="font-family:'Amiri',serif;font-size:20px;color:var(--g2);">جاري تحميل ${surah.ar}...</div>
    </div>`;

  // تحديث عنوان القارئ
  const ctrl = document.getElementById('reader-controls');
  if (ctrl) {
    const existing = ctrl.querySelector('.surah-reader-title');
    if (existing) existing.remove();
    const title = document.createElement('div');
    title.className = 'surah-reader-title';
    title.style.cssText = 'font-family:Amiri,serif;font-size:18px;color:var(--g2);margin-right:auto;';
    title.textContent = surah.ar;
    ctrl.insertBefore(title, ctrl.querySelector('#rc-tafsir'));
  }

  try {
    let ayahs;
    if (quranCache[num]) {
      ayahs = quranCache[num];
    } else {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`);
      const json = await res.json();
      if (json.code === 200) {
        ayahs = json.data.ayahs;
        quranCache[num] = ayahs;
      }
    }
    renderSurahText(surah, ayahs);
  } catch(e) {
    // fallback: رابط quran.com
    document.getElementById('quran-text-area').innerHTML = `
      <div class="card-section" style="text-align:center;margin:20px;">
        <div style="font-size:48px;margin-bottom:12px;">🌐</div>
        <div style="font-family:'Amiri',serif;font-size:20px;color:var(--g2);margin-bottom:12px;">${surah.ar}</div>
        <div style="font-size:13px;color:var(--text3);margin-bottom:20px;">تعذّر التحميل، اضغط للقراءة على موقع Quran.com</div>
        <a href="https://quran.com/${num}" target="_blank" style="background:var(--g2);color:white;padding:12px 28px;border-radius:12px;text-decoration:none;font-family:'Cairo',sans-serif;font-size:14px;">
          افتح سورة ${surah.ar} 📖
        </a>
      </div>`;
  }
}

function renderSurahText(surah, ayahs) {
  const area = document.getElementById('quran-text-area');
  if (!area) return;

  const hasBas = surah.n !== 9 && surah.n !== 1;
  let html = '';

  if (hasBas) {
    html += `<div class="basmalah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>`;
  }

  html += `<div style="font-family:'Amiri Quran',serif;font-size:${fontSize}px;line-height:2.5;text-align:justify;direction:rtl;color:var(--g1);">`;

  if (ayahs) {
    ayahs.forEach(a => {
      html += `<span class="ayah-item">
        ${a.text}
        <span class="ayah-number" onclick="showAyahMenu(${surah.n},${a.numberInSurah})">${toAr(a.numberInSurah)}</span>
      </span> `;
    });
  }

  html += `</div>`;
  area.innerHTML = html;
}

function changeFontSize(delta) {
  fontSize = Math.max(18, Math.min(36, fontSize + delta));
  const fzEl = document.getElementById('fz-val');
  if (fzEl) fzEl.textContent = toAr(fontSize);
  if (currentSurah && quranCache[currentSurah.n]) {
    renderSurahText(currentSurah, quranCache[currentSurah.n]);
  }
}

function toggleTafsir() {
  showTafsir = !showTafsir;
  const btn = document.getElementById('rc-tafsir');
  if (btn) btn.classList.toggle('active', showTafsir);
  showToast(showTafsir ? 'وضع التفسير مفعّل' : 'وضع التفسير مغلق');
}

function openAudio() {
  if (!currentSurah) return;
  const url = `https://quran.com/${currentSurah.n}`;
  window.open(url, '_blank');
}

function showAyahMenu(surahNum, ayahNum) {
  showToast(`آية ${toAr(ayahNum)} - سورة ${SURAHS.find(s=>s.n===surahNum)?.ar || ''}`);
}

// آية اليوم
const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(),0,0))/86400000);
const todayAyah = DAILY_AYAHS[dayOfYear % DAILY_AYAHS.length];
function setDailyAyah() {
  const el1 = document.getElementById('home-ayah-text');
  const el2 = document.getElementById('home-ayah-ref');
  if (el1) el1.textContent = todayAyah.text;
  if (el2) el2.textContent = todayAyah.ref;
}

// تهيئة
renderSurahList(SURAHS);
setDailyAyah();
