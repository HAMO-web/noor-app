// dhikr-v2.js

let dhikrCounts = {};
let currentDhikrTab = 'morning';
let tasbihCount = 0;
let tasbihTarget = 0;
let tasbihTypeIdx = 0;
const TASBIH_TYPES = ['سبحان الله','الحمد لله','الله أكبر','لا إله إلا الله','سبحان الله وبحمده','الله أكبر الله أكبر لا إله إلا الله'];

function toAr(s){ return String(s).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]); }

function showDhikrTab(type) {
  goPage('dhikr');
  setTimeout(() => showDhikrTabHere(type, null), 50);
}

function showDhikrTabHere(type, btn) {
  currentDhikrTab = type;

  // تحديث التابز
  document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    document.querySelectorAll('.dtab').forEach(b => {
      if (b.getAttribute('onclick')?.includes(`'${type}'`)) b.classList.add('active');
    });
  }

  const dhikrContent = document.getElementById('dhikr-content');
  const tasbihSection = document.getElementById('tasbih-section');

  if (type === 'tasbih') {
    if (dhikrContent) dhikrContent.style.display = 'none';
    if (tasbihSection) tasbihSection.style.display = 'block';
    return;
  }

  if (tasbihSection) tasbihSection.style.display = 'none';
  if (dhikrContent) {
    dhikrContent.style.display = 'block';
    renderDhikrList(DHIKR[type] || []);
  }
}

function renderDhikrList(list) {
  const c = document.getElementById('dhikr-content');
  if (!c) return;
  const tab = currentDhikrTab;
  if (!dhikrCounts[tab]) dhikrCounts[tab] = {};

  c.innerHTML = list.map((d,i) => {
    const cnt = dhikrCounts[tab][i] || 0;
    const pct = Math.min(100, (cnt/d.count)*100);
    const done = cnt >= d.count;
    return `
    <div class="dhikr-item-card ${done?'done':''}" id="dic-${i}">
      <div class="dic-header">
        <div class="dic-arabic">${d.ar}</div>
        <div class="dic-translation">${d.tr} • ${d.source}</div>
      </div>
      <div class="dic-footer">
        <div class="dic-count-info">${toAr(cnt)} / ${toAr(d.count)} مرة</div>
        <div class="dic-counter">
          <div class="dic-progress-num" id="dc-num-${i}">${toAr(cnt)}</div>
          <button class="dic-tap-btn" id="dc-btn-${i}" onclick="tapDhikr(${i},${d.count})" ${done?'disabled':''}>
            ${done ? '✅ تم' : 'اضغط'}
          </button>
        </div>
      </div>
      <div class="dic-progress-bar">
        <div class="dic-bar-fill" id="dc-bar-${i}" style="width:${pct}%"></div>
      </div>
    </div>
  `}).join('');
}

function tapDhikr(idx, max) {
  const tab = currentDhikrTab;
  if (!dhikrCounts[tab]) dhikrCounts[tab] = {};
  if ((dhikrCounts[tab][idx]||0) >= max) return;
  dhikrCounts[tab][idx] = (dhikrCounts[tab][idx] || 0) + 1;
  const cnt = dhikrCounts[tab][idx];
  const pct = Math.min(100,(cnt/max)*100);

  const numEl = document.getElementById(`dc-num-${idx}`);
  const barEl = document.getElementById(`dc-bar-${idx}`);
  const btnEl = document.getElementById(`dc-btn-${idx}`);
  const cardEl = document.getElementById(`dic-${idx}`);

  if (numEl) numEl.textContent = toAr(cnt);
  if (barEl) barEl.style.width = pct + '%';

  if (cnt >= max) {
    if (btnEl) { btnEl.textContent = '✅ تم'; btnEl.disabled = true; }
    if (cardEl) cardEl.classList.add('done');
    showToast('أحسنت! اكتملت المرات 🌟');
  }
}

// عداد التسبيح
function setTasbihType(idx, btn) {
  tasbihTypeIdx = idx;
  tasbihCount = 0;
  document.querySelectorAll('.tt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  updateTasbihDisplay();
}

function tapTasbih() {
  tasbihCount++;
  updateTasbihDisplay();
  if (tasbihTarget > 0 && tasbihCount >= tasbihTarget) {
    showToast(`🎉 وصلت للهدف ${toAr(tasbihTarget)}!`);
    tasbihTarget = 0;
    const tBtn = document.getElementById('ta-target-btn');
    if (tBtn) tBtn.textContent = '🎯 تحديد هدف';
  }
}

function resetTasbih() {
  tasbihCount = 0;
  updateTasbihDisplay();
}

function updateTasbihDisplay() {
  const numEl = document.getElementById('tasbih-big-num');
  const lblEl = document.getElementById('tasbih-big-label');
  if (numEl) numEl.textContent = toAr(tasbihCount);
  if (lblEl) lblEl.textContent = TASBIH_TYPES[tasbihTypeIdx];
}

function setTarget() {
  const target = prompt('أدخل الهدف (مثال: 100)');
  if (target && !isNaN(target)) {
    tasbihTarget = parseInt(target);
    const btn = document.getElementById('ta-target-btn');
    if (btn) btn.textContent = `🎯 الهدف: ${toAr(tasbihTarget)}`;
    showToast(`تم تحديد الهدف: ${toAr(tasbihTarget)}`);
  }
}

// تسبيح سريع من الرئيسية
const quickCounts = [0,0,0,0];
function quickTasbih(idx) {
  quickCounts[idx]++;
  const el = document.getElementById(`qt-${idx}`);
  if (el) el.textContent = toAr(quickCounts[idx]);
  if (quickCounts[idx] % 33 === 0) showToast('ممتاز! ٣٣ مرة 🌟');
}

// تهيئة
showDhikrTabHere('morning', null);
