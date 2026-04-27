// quiz-v2.js

let quizIdx = 0, quizScore = 0, quizAnswered = false;
let quizQuestions = [];
let quizStreak = 0;

function toAr(s){ return String(s).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]); }

function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }

function startQuiz() {
  quizQuestions = shuffle(QUIZ_QUESTIONS);
  quizIdx = 0; quizScore = 0; quizAnswered = false; quizStreak = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const c = document.getElementById('quiz-container');
  if (!c) return;

  if (quizIdx >= quizQuestions.length) { showQuizResult(); return; }

  const q = quizQuestions[quizIdx];
  const pct = (quizIdx / quizQuestions.length) * 100;

  c.innerHTML = `
    <div class="quiz-score-bar">
      <div>
        <div class="qsb-score">${toAr(quizScore)}</div>
        <div class="qsb-label">نقطة</div>
      </div>
      <div class="qsb-streak">
        ${quizStreak >= 3 ? `🔥 ${toAr(quizStreak)} متتالية` : `سؤال ${toAr(quizIdx+1)}/${toAr(quizQuestions.length)}`}
      </div>
    </div>
    <div class="quiz-card-2">
      <div class="qc-progress"><div class="qc-prog-fill" style="width:${pct}%"></div></div>
      <div class="qc-num">سؤال ${toAr(quizIdx+1)} من ${toAr(quizQuestions.length)}</div>
      <div class="qc-category">${q.cat}</div>
      <div class="qc-question">${q.q}</div>
      <div class="qc-options">
        ${q.opts.map((o,i) => `
          <button class="qc-option" onclick="answerQuiz(${i})" id="qopt-${i}">${o}</button>
        `).join('')}
      </div>
    </div>
  `;
  quizAnswered = false;
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = quizQuestions[quizIdx];

  document.querySelectorAll('.qc-option').forEach(b => b.style.pointerEvents = 'none');
  document.getElementById(`qopt-${q.c}`).classList.add('correct');

  if (idx === q.c) {
    quizScore++;
    quizStreak++;
    showToast(quizStreak >= 3 ? `🔥 ${toAr(quizStreak)} إجابات متتالية!` : '✅ إجابة صحيحة!');
  } else {
    document.getElementById(`qopt-${idx}`).classList.add('wrong');
    quizStreak = 0;
    showToast('❌ إجابة خاطئة');
  }

  setTimeout(() => { quizIdx++; renderQuizQuestion(); }, 1600);
}

function showQuizResult() {
  const c = document.getElementById('quiz-container');
  if (!c) return;
  const pct = Math.round((quizScore / quizQuestions.length) * 100);
  const msgs = [
    [80, '🌟 ممتاز! معلوماتك الإسلامية رائعة'],
    [60, '👍 جيد جداً! استمر في التعلم'],
    [40, '📚 جيد! راجع معلوماتك أكثر'],
    [0,  '💪 حاول مرة أخرى وستتحسن!'],
  ];
  const msg = msgs.find(m => pct >= m[0])[1];

  c.innerHTML = `
    <div class="quiz-result">
      <div class="qr-emoji">${pct>=80?'🏆':pct>=60?'⭐':pct>=40?'📖':'💡'}</div>
      <div class="qr-score">${toAr(quizScore)}</div>
      <div class="qr-total">من ${toAr(quizQuestions.length)} سؤال • ${toAr(pct)}٪</div>
      <div class="qr-msg">${msg}</div>
      <button class="qr-replay" onclick="startQuiz()">العب مرة أخرى 🔄</button>
    </div>
  `;
}
