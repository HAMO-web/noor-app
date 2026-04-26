// stories.js - القصص الإسلامية

const storiesData = [
  {
    emoji: '🌊',
    name: 'سيدنا نوح',
    desc: 'قصة الطوفان العظيم',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا نوح عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">نوح عليه السلام هو أول أولي العزم من الرسل، أرسله الله إلى قومه الذين أشركوا بالله وعبدوا الأصنام.</p>
    <br>
    <p style="line-height:2;font-size:15px;">دعا نوح قومه ألف سنة إلا خمسين عاماً، يدعوهم إلى توحيد الله، ليلاً ونهاراً، سراً وعلانية، لكنهم أبوا وكذّبوه.</p>
    <br>
    <p style="line-height:2;font-size:15px;">أوحى الله إليه أن يبني السفينة، فبنى نوح السفينة بأمر ربه، وسخر منه قومه وهو يبنيها. فلما جاء أمر الله، فار التنور، وجاء الطوفان العظيم فغرق المشركون.</p>
    <br>
    <p style="line-height:2;font-size:15px;font-style:italic;color:var(--green);">﴿ رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَلِمَن دَخَلَ بَيْتِيَ مُؤْمِنًا ﴾</p>`
  },
  {
    emoji: '🔥',
    name: 'سيدنا إبراهيم',
    desc: 'خليل الرحمن',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا إبراهيم عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">إبراهيم عليه السلام هو أبو الأنبياء وخليل الرحمن. وُلد في بيئة تعبد الأصنام، لكنه بعقله السليم وفطرته النقية توصّل إلى وحدانية الله.</p>
    <br>
    <p style="line-height:2;font-size:15px;">كسر الأصنام التي يعبدها قومه ليُثبت لهم أنها لا تنفع ولا تضر، فألقوه في النار، فكانت النار برداً وسلاماً عليه بأمر الله.</p>
    <br>
    <p style="line-height:2;font-size:15px;">ابتلاه الله بذبح ابنه إسماعيل، فاستسلم للأمر، فلما أراد التنفيذ فداه الله بكبش عظيم. وبنى الكعبة المشرفة مع ابنه إسماعيل.</p>`
  },
  {
    emoji: '👑',
    name: 'سيدنا يوسف',
    desc: 'أحسن القصص',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا يوسف عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">يوسف عليه السلام ابن يعقوب، آتاه الله الحسن والجمال وتعبير الرؤى. حسده إخوته فألقوه في الجب وأخبروا أباه بأن الذئب أكله.</p>
    <br>
    <p style="line-height:2;font-size:15px;">بيع عبداً في مصر، ثم ابتُلي بالسجن ظلماً، لكنه صبر واحتسب. وفّر الله له في السجن تعبير الأحلام، حتى جاء فرج الله.</p>
    <br>
    <p style="line-height:2;font-size:15px;">استدعاه الملك لتعبير رؤياه، فعُيّن على خزائن مصر، وفي النهاية اجتمع بأبيه وإخوته وعفا عنهم.</p>
    <br>
    <p style="line-height:2;font-size:15px;font-style:italic;color:var(--green);">﴿ إِنَّهُ مَن يَتَّقِ وَيَصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ ﴾</p>`
  },
  {
    emoji: '🌙',
    name: 'سيدنا موسى',
    desc: 'كليم الله',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا موسى عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">موسى عليه السلام كليم الله، وُلد في زمن فرعون الذي كان يذبح أبناء بني إسرائيل. ألهم الله أمه أن تضعه في التابوت وتُلقيه في النيل.</p>
    <br>
    <p style="line-height:2;font-size:15px;">التقطه آل فرعون فتربّى في قصر العدو، ثم خرج إلى مدين وتزوج من ابنة شعيب. كلّمه الله من الشجرة وأرسله إلى فرعون.</p>
    <br>
    <p style="line-height:2;font-size:15px;">ضرب البحر بعصاه فانفلق طريقاً للمؤمنين، وغرق فرعون وجنوده. وأنزل الله عليه التوراة في طور سيناء.</p>`
  },
  {
    emoji: '⚔️',
    name: 'سيدنا داود',
    desc: 'النبي الملك',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا داود عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">داود عليه السلام آتاه الله الحكمة والملك والنبوة، وأنزل عليه الزبور. بدأ فتىً صغيراً قتل جالوت بمقلاعه وحجر صغير.</p>
    <br>
    <p style="line-height:2;font-size:15px;">آتاه الله صوتاً حسناً وعلّم الطيور والجبال تسبّح معه. ألان الله له الحديد يصنع منه الدروع. وأوتي فصل الخطاب وحكمة في القضاء.</p>`
  },
  {
    emoji: '🐳',
    name: 'سيدنا يونس',
    desc: 'صاحب الحوت',
    story: `<h3 style="font-family:'Amiri',serif;color:var(--green);margin-bottom:12px;">سيدنا يونس عليه السلام</h3>
    <p style="line-height:2;font-size:15px;">يونس عليه السلام أُرسل إلى أهل نينوى، فلما استبطأ الاستجابة غادر غاضباً قبل إذن الله، فركب السفينة وألقى بنفسه في البحر فابتلعه الحوت.</p>
    <br>
    <p style="line-height:2;font-size:15px;">في بطن الحوت نادى: ﴿ لَّا إِلَهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ ﴾ فاستجاب الله له ونجاه، ورجع إلى قومه الذين آمنوا جميعاً.</p>`
  },
];

function renderStories() {
  const container = document.getElementById('stories-grid');
  if (!container) return;
  container.innerHTML = storiesData.map((s, i) => `
    <div class="story-card" onclick="showStory(${i})">
      <div class="story-emoji">${s.emoji}</div>
      <div class="story-info">
        <div class="story-name">${s.name}</div>
        <div class="story-desc">${s.desc}</div>
      </div>
    </div>
  `).join('');
}

function showStory(idx) {
  const s = storiesData[idx];
  const container = document.getElementById('stories-grid');
  container.innerHTML = `
    <div style="grid-column:1/-1;">
      <button onclick="renderStories()" style="background:none;border:none;color:var(--green);font-family:'Cairo',sans-serif;font-size:15px;cursor:pointer;margin-bottom:16px;display:block;">
        ← العودة للقائمة
      </button>
      <div class="card" style="line-height:2;">
        <div style="text-align:center; font-size:48px; margin-bottom:8px;">${s.emoji}</div>
        ${s.story}
      </div>
    </div>
  `;
}

// تهيئة بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', renderStories);
setTimeout(renderStories, 100);
