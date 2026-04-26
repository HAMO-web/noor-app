// dhikr.js - الأذكار والأدعية

const dhikrData = {
  morning: [
    { text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', count: 1, desc: 'ذكر الصباح' },
    { text: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ', count: 1, desc: 'دعاء الصباح' },
    { text: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ - اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', count: 1, desc: 'آية الكرسي - مرة واحدة' },
    { text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', count: 3, desc: 'ذكر الصباح - ٣ مرات' },
    { text: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صلى الله عليه وسلم نَبِيًّا', count: 3, desc: '٣ مرات' },
    { text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', count: 100, desc: '١٠٠ مرة - تُحَطُّ الخطايا' },
    { text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ', count: 10, desc: '١٠ مرات' },
    { text: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', count: 100, desc: '١٠٠ مرة' },
  ],
  evening: [
    { text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', count: 1, desc: 'ذكر المساء' },
    { text: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ', count: 1, desc: 'دعاء المساء' },
    { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ', count: 1, desc: 'سيد الاستغفار' },
    { text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', count: 3, desc: '٣ مرات' },
    { text: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي', count: 3, desc: '٣ مرات' },
  ],
  sleep: [
    { text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', count: 1, desc: 'عند النوم' },
    { text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', count: 3, desc: '٣ مرات' },
    { text: 'سُبْحَانَ اللَّهِ', count: 33, desc: '٣٣ مرة' },
    { text: 'الْحَمْدُ لِلَّهِ', count: 33, desc: '٣٣ مرة' },
    { text: 'اللَّهُ أَكْبَرُ', count: 34, desc: '٣٤ مرة' },
    { text: 'آيَةُ الْكُرْسِيِّ', count: 1, desc: 'حفظ حتى الصباح' },
  ],
};

let currentDhikrType = 'morning';

function filterDhikr(type) {
  currentDhikrType = type;
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.style.background = 'var(--green-pale)';
    b.style.color = 'var(--green)';
  });
  event.target.style.background = 'var(--green)';
  event.target.style.color = 'white';

  const tasbihSection = document.getElementById('tasbih-section');
  const dhikrList = document.getElementById('dhikr-list');

  if (type === 'tasbih') {
    dhikrList.innerHTML = '';
    tasbihSection.style.display = 'block';
  } else {
    tasbihSection.style.display = 'none';
    renderDhikrList(dhikrData[type] || []);
  }
}

function renderDhikrList(list) {
  const container = document.getElementById('dhikr-list');
  container.innerHTML = list.map((d, i) => `
    <div class="card" style="margin-bottom:12px;" id="dhikr-item-${i}">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
        <div class="dhikr-text" style="flex:1;">${d.text}</div>
        <div style="margin-right:12px; text-align:center; min-width:44px;">
          <div style="font-family:'Amiri',serif; font-size:22px; color:var(--green);" id="dhikr-count-${i}">٠</div>
          <div style="font-size:11px; color:var(--muted);">/ ${d.count}</div>
        </div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div class="dhikr-count">${d.desc}</div>
        <button onclick="countDhikr(${i}, ${d.count})" 
          style="background:var(--green); color:white; border:none; border-radius:8px; 
          padding:6px 16px; font-family:'Cairo',sans-serif; font-size:13px; cursor:pointer;">
          سبّح
        </button>
      </div>
      <div style="height:3px; background:#f0f0f0; border-radius:3px; margin-top:10px;">
        <div style="height:100%; background:var(--green); border-radius:3px; width:0%; transition:width 0.3s;" id="dhikr-bar-${i}"></div>
      </div>
    </div>
  `).join('');
}

const dhikrCounts = {};

function countDhikr(idx, max) {
  if (!dhikrCounts[idx]) dhikrCounts[idx] = 0;
  const list = dhikrData[currentDhikrType];
  if (dhikrCounts[idx] >= max) return;
  dhikrCounts[idx]++;
  const nums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  document.getElementById(`dhikr-count-${idx}`).textContent = dhikrCounts[idx].toString().split('').map(d => nums[d] || d).join('');
  const pct = (dhikrCounts[idx] / max) * 100;
  document.getElementById(`dhikr-bar-${idx}`).style.width = pct + '%';
  if (dhikrCounts[idx] >= max) {
    document.getElementById(`dhikr-item-${idx}`).style.borderColor = 'var(--green)';
    document.getElementById(`dhikr-item-${idx}`).style.background = 'var(--green-pale)';
  }
}

// تهيئة
renderDhikrList(dhikrData.morning);
