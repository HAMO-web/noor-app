// quiz.js - الكويز الإسلامي

const quizQuestions = [
  { q: 'كم عدد سور القرآن الكريم؟', options: ['١١٠', '١١٢', '١١٤', '١١٦'], correct: 2 },
  { q: 'ما هي أطول سورة في القرآن الكريم؟', options: ['آل عمران', 'النساء', 'البقرة', 'المائدة'], correct: 2 },
  { q: 'في أي شهر نزل القرآن الكريم؟', options: ['رجب', 'شعبان', 'رمضان', 'محرم'], correct: 2 },
  { q: 'كم عدد أركان الإسلام؟', options: ['٤', '٥', '٦', '٧'], correct: 1 },
  { q: 'ما هو اسم والد النبي محمد ﷺ؟', options: ['عبدالله', 'عبدالرحمن', 'عبدالعزيز', 'عبدالكريم'], correct: 0 },
  { q: 'في أي مدينة وُلد النبي محمد ﷺ؟', options: ['المدينة', 'الطائف', 'مكة المكرمة', 'القدس'], correct: 2 },
  { q: 'ما هو أول مسجد بُني في الإسلام؟', options: ['مسجد قباء', 'المسجد الحرام', 'المسجد النبوي', 'المسجد الأقصى'], correct: 0 },
  { q: 'كم عدد الأنبياء المذكورين في القرآن الكريم؟', options: ['٢٠', '٢٣', '٢٥', '٣٠'], correct: 2 },
  { q: 'ما هي أقصر سورة في القرآن الكريم؟', options: ['الإخلاص', 'الكوثر', 'الناس', 'الفلق'], correct: 1 },
  { q: 'كم عدد أسماء الله الحسنى؟', options: ['٩٠', '٩٩', '١٠٠', '١٠١'], correct: 1 },
  { q: 'ما هو الركن الخامس من أركان الإسلام؟', options: ['الزكاة', 'الصوم', 'الصلاة', 'الحج'], correct: 3 },
  { q: 'كم سنة استغرق بناء الكعبة المشرفة مع إبراهيم وإسماعيل؟', options: ['سنة', 'سنتان', 'ثلاث سنوات', 'خمس سنوات'], correct: 0 },
  { q: 'ما هو أول ما نزل من القرآن الكريم؟', options: ['الفاتحة', 'العلق', 'المدثر', 'القلم'], correct: 1 },
  { q: 'كم صلاة مفروضة في اليوم والليلة؟', options: ['٣', '٤', '٥', '٦'], correct: 2 },
  { q: 'ما هي نسبة الزكاة في المال؟', options: ['٢٪', '٢.٥٪', '٣٪', '٥٪'], correct: 1 },
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let shuffledQuestions = [];

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function loadQuiz() {
  shuffledQuestions = shuffleArray(quizQuestions);
  currentQuestion = 0;
  score = 0;
  answered = false;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById('quiz-container');
  if (!container) return;

  if (currentQuestion >= shuffledQuestions.length) {
    showResult();
    return;
  }

  const q = shuffledQuestions[currentQuestion];
  const nums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const toAr = n => n.toString().split('').map(d => nums[d] || d).join('');

  container.innerHTML = `
    <div style="margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <div style="font-size:13px; color:var(--muted);">سؤال ${toAr(currentQuestion + 1)} من ${toAr(shuffledQuestions.length)}</div>
        <div style="font-size:13px; color:var(--green); font-weight:700;">النتيجة: ${toAr(score)}</div>
      </div>
      <div style="height:4px; background:#f0f0f0; border-radius:4px; margin-bottom:20px;">
        <div style="height:100%; background:var(--green); border-radius:4px; width:${(currentQuestion / shuffledQuestions.length) * 100}%; transition:width 0.3s;"></div>
      </div>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-btn" onclick="answerQuestion(${i})" id="opt-${i}">${opt}</button>
      `).join('')}
    </div>
  `;
  answered = false;
}

function answerQuestion(idx) {
  if (answered) return;
  answered = true;

  const q = shuffledQuestions[currentQuestion];
  const btns = document.querySelectorAll('.quiz-btn');

  btns[q.correct].classList.add('correct');
  if (idx !== q.correct) {
    btns[idx].classList.add('wrong');
  } else {
    score++;
  }

  btns.forEach(b => b.disabled = true);

  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1500);
}

function showResult() {
  const container = document.getElementById('quiz-container');
  const nums = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const toAr = n => n.toString().split('').map(d => nums[d] || d).join('');

  const pct = Math.round((score / shuffledQuestions.length) * 100);
  let msg = '';
  if (pct >= 80) msg = '🌟 ممتاز! أنت متميز في معلوماتك الإسلامية';
  else if (pct >= 60) msg = '👍 جيد جداً! استمر في التعلم';
  else if (pct >= 40) msg = '📚 جيد! يمكنك تحسين معلوماتك';
  else msg = '💪 حاول مرة أخرى وستتحسن!';

  container.innerHTML = `
    <div style="text-align:center; padding:20px;">
      <div style="font-size:60px; margin-bottom:16px;">🏆</div>
      <div style="font-family:'Amiri',serif; font-size:28px; color:var(--green); margin-bottom:8px;">
        ${toAr(score)} / ${toAr(shuffledQuestions.length)}
      </div>
      <div style="font-size:18px; color:var(--gold); margin-bottom:16px;">${toAr(pct)}٪</div>
      <div style="font-size:15px; color:var(--muted); margin-bottom:24px; line-height:1.8;">${msg}</div>
      <button onclick="loadQuiz()" 
        style="background:var(--green); color:white; border:none; border-radius:12px; 
        padding:14px 32px; font-family:'Cairo',sans-serif; font-size:16px; cursor:pointer;">
        العب مرة أخرى 🔄
      </button>
    </div>
  `;
}
