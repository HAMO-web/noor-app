// quran.js - بيانات القرآن الكريم ووظائفه

const surahs = [
  { num: 1, ar: 'الفاتحة', en: 'Al-Fatiha', verses: 7, type: 'مكية' },
  { num: 2, ar: 'البقرة', en: 'Al-Baqara', verses: 286, type: 'مدنية' },
  { num: 3, ar: 'آل عمران', en: "Ali 'Imran", verses: 200, type: 'مدنية' },
  { num: 4, ar: 'النساء', en: 'An-Nisa', verses: 176, type: 'مدنية' },
  { num: 5, ar: 'المائدة', en: 'Al-Ma\'ida', verses: 120, type: 'مدنية' },
  { num: 6, ar: 'الأنعام', en: 'Al-An\'am', verses: 165, type: 'مكية' },
  { num: 7, ar: 'الأعراف', en: 'Al-A\'raf', verses: 206, type: 'مكية' },
  { num: 8, ar: 'الأنفال', en: 'Al-Anfal', verses: 75, type: 'مدنية' },
  { num: 9, ar: 'التوبة', en: 'At-Tawba', verses: 129, type: 'مدنية' },
  { num: 10, ar: 'يونس', en: 'Yunus', verses: 109, type: 'مكية' },
  { num: 11, ar: 'هود', en: 'Hud', verses: 123, type: 'مكية' },
  { num: 12, ar: 'يوسف', en: 'Yusuf', verses: 111, type: 'مكية' },
  { num: 13, ar: 'الرعد', en: 'Ar-Ra\'d', verses: 43, type: 'مدنية' },
  { num: 14, ar: 'إبراهيم', en: 'Ibrahim', verses: 52, type: 'مكية' },
  { num: 15, ar: 'الحجر', en: 'Al-Hijr', verses: 99, type: 'مكية' },
  { num: 16, ar: 'النحل', en: 'An-Nahl', verses: 128, type: 'مكية' },
  { num: 17, ar: 'الإسراء', en: 'Al-Isra', verses: 111, type: 'مكية' },
  { num: 18, ar: 'الكهف', en: 'Al-Kahf', verses: 110, type: 'مكية' },
  { num: 19, ar: 'مريم', en: 'Maryam', verses: 98, type: 'مكية' },
  { num: 20, ar: 'طه', en: 'Ta-Ha', verses: 135, type: 'مكية' },
  { num: 21, ar: 'الأنبياء', en: 'Al-Anbiya', verses: 112, type: 'مكية' },
  { num: 22, ar: 'الحج', en: 'Al-Hajj', verses: 78, type: 'مدنية' },
  { num: 23, ar: 'المؤمنون', en: 'Al-Mu\'minun', verses: 118, type: 'مكية' },
  { num: 24, ar: 'النور', en: 'An-Nur', verses: 64, type: 'مدنية' },
  { num: 25, ar: 'الفرقان', en: 'Al-Furqan', verses: 77, type: 'مكية' },
  { num: 26, ar: 'الشعراء', en: 'Ash-Shu\'ara', verses: 227, type: 'مكية' },
  { num: 27, ar: 'النمل', en: 'An-Naml', verses: 93, type: 'مكية' },
  { num: 28, ar: 'القصص', en: 'Al-Qasas', verses: 88, type: 'مكية' },
  { num: 29, ar: 'العنكبوت', en: 'Al-\'Ankabut', verses: 69, type: 'مكية' },
  { num: 30, ar: 'الروم', en: 'Ar-Rum', verses: 60, type: 'مكية' },
  { num: 31, ar: 'لقمان', en: 'Luqman', verses: 34, type: 'مكية' },
  { num: 32, ar: 'السجدة', en: 'As-Sajda', verses: 30, type: 'مكية' },
  { num: 33, ar: 'الأحزاب', en: 'Al-Ahzab', verses: 73, type: 'مدنية' },
  { num: 34, ar: 'سبأ', en: 'Saba', verses: 54, type: 'مكية' },
  { num: 35, ar: 'فاطر', en: 'Fatir', verses: 45, type: 'مكية' },
  { num: 36, ar: 'يس', en: 'Ya-Sin', verses: 83, type: 'مكية' },
  { num: 37, ar: 'الصافات', en: 'As-Saffat', verses: 182, type: 'مكية' },
  { num: 38, ar: 'ص', en: 'Sad', verses: 88, type: 'مكية' },
  { num: 39, ar: 'الزمر', en: 'Az-Zumar', verses: 75, type: 'مكية' },
  { num: 40, ar: 'غافر', en: 'Ghafir', verses: 85, type: 'مكية' },
  { num: 41, ar: 'فصلت', en: 'Fussilat', verses: 54, type: 'مكية' },
  { num: 42, ar: 'الشورى', en: 'Ash-Shura', verses: 53, type: 'مكية' },
  { num: 43, ar: 'الزخرف', en: 'Az-Zukhruf', verses: 89, type: 'مكية' },
  { num: 44, ar: 'الدخان', en: 'Ad-Dukhan', verses: 59, type: 'مكية' },
  { num: 45, ar: 'الجاثية', en: 'Al-Jathiya', verses: 37, type: 'مكية' },
  { num: 46, ar: 'الأحقاف', en: 'Al-Ahqaf', verses: 35, type: 'مكية' },
  { num: 47, ar: 'محمد', en: 'Muhammad', verses: 38, type: 'مدنية' },
  { num: 48, ar: 'الفتح', en: 'Al-Fath', verses: 29, type: 'مدنية' },
  { num: 49, ar: 'الحجرات', en: 'Al-Hujurat', verses: 18, type: 'مدنية' },
  { num: 50, ar: 'ق', en: 'Qaf', verses: 45, type: 'مكية' },
  { num: 51, ar: 'الذاريات', en: 'Adh-Dhariyat', verses: 60, type: 'مكية' },
  { num: 52, ar: 'الطور', en: 'At-Tur', verses: 49, type: 'مكية' },
  { num: 53, ar: 'النجم', en: 'An-Najm', verses: 62, type: 'مكية' },
  { num: 54, ar: 'القمر', en: 'Al-Qamar', verses: 55, type: 'مكية' },
  { num: 55, ar: 'الرحمن', en: 'Ar-Rahman', verses: 78, type: 'مدنية' },
  { num: 56, ar: 'الواقعة', en: 'Al-Waqi\'a', verses: 96, type: 'مكية' },
  { num: 57, ar: 'الحديد', en: 'Al-Hadid', verses: 29, type: 'مدنية' },
  { num: 58, ar: 'المجادلة', en: 'Al-Mujadila', verses: 22, type: 'مدنية' },
  { num: 59, ar: 'الحشر', en: 'Al-Hashr', verses: 24, type: 'مدنية' },
  { num: 60, ar: 'الممتحنة', en: 'Al-Mumtahana', verses: 13, type: 'مدنية' },
  { num: 61, ar: 'الصف', en: 'As-Saf', verses: 14, type: 'مدنية' },
  { num: 62, ar: 'الجمعة', en: 'Al-Jumu\'a', verses: 11, type: 'مدنية' },
  { num: 63, ar: 'المنافقون', en: 'Al-Munafiqun', verses: 11, type: 'مدنية' },
  { num: 64, ar: 'التغابن', en: 'At-Taghabun', verses: 18, type: 'مدنية' },
  { num: 65, ar: 'الطلاق', en: 'At-Talaq', verses: 12, type: 'مدنية' },
  { num: 66, ar: 'التحريم', en: 'At-Tahrim', verses: 12, type: 'مدنية' },
  { num: 67, ar: 'الملك', en: 'Al-Mulk', verses: 30, type: 'مكية' },
  { num: 68, ar: 'القلم', en: 'Al-Qalam', verses: 52, type: 'مكية' },
  { num: 69, ar: 'الحاقة', en: 'Al-Haqqah', verses: 52, type: 'مكية' },
  { num: 70, ar: 'المعارج', en: 'Al-Ma\'arij', verses: 44, type: 'مكية' },
  { num: 71, ar: 'نوح', en: 'Nuh', verses: 28, type: 'مكية' },
  { num: 72, ar: 'الجن', en: 'Al-Jinn', verses: 28, type: 'مكية' },
  { num: 73, ar: 'المزمل', en: 'Al-Muzzammil', verses: 20, type: 'مكية' },
  { num: 74, ar: 'المدثر', en: 'Al-Muddaththir', verses: 56, type: 'مكية' },
  { num: 75, ar: 'القيامة', en: 'Al-Qiyama', verses: 40, type: 'مكية' },
  { num: 76, ar: 'الإنسان', en: 'Al-Insan', verses: 31, type: 'مدنية' },
  { num: 77, ar: 'المرسلات', en: 'Al-Mursalat', verses: 50, type: 'مكية' },
  { num: 78, ar: 'النبأ', en: 'An-Naba', verses: 40, type: 'مكية' },
  { num: 79, ar: 'النازعات', en: 'An-Nazi\'at', verses: 46, type: 'مكية' },
  { num: 80, ar: 'عبس', en: '\'Abasa', verses: 42, type: 'مكية' },
  { num: 81, ar: 'التكوير', en: 'At-Takwir', verses: 29, type: 'مكية' },
  { num: 82, ar: 'الانفطار', en: 'Al-Infitar', verses: 19, type: 'مكية' },
  { num: 83, ar: 'المطففين', en: 'Al-Mutaffifin', verses: 36, type: 'مكية' },
  { num: 84, ar: 'الانشقاق', en: 'Al-Inshiqaq', verses: 25, type: 'مكية' },
  { num: 85, ar: 'البروج', en: 'Al-Buruj', verses: 22, type: 'مكية' },
  { num: 86, ar: 'الطارق', en: 'At-Tariq', verses: 17, type: 'مكية' },
  { num: 87, ar: 'الأعلى', en: 'Al-A\'la', verses: 19, type: 'مكية' },
  { num: 88, ar: 'الغاشية', en: 'Al-Ghashiya', verses: 26, type: 'مكية' },
  { num: 89, ar: 'الفجر', en: 'Al-Fajr', verses: 30, type: 'مكية' },
  { num: 90, ar: 'البلد', en: 'Al-Balad', verses: 20, type: 'مكية' },
  { num: 91, ar: 'الشمس', en: 'Ash-Shams', verses: 15, type: 'مكية' },
  { num: 92, ar: 'الليل', en: 'Al-Layl', verses: 21, type: 'مكية' },
  { num: 93, ar: 'الضحى', en: 'Ad-Duhaa', verses: 11, type: 'مكية' },
  { num: 94, ar: 'الشرح', en: 'Ash-Sharh', verses: 8, type: 'مكية' },
  { num: 95, ar: 'التين', en: 'At-Tin', verses: 8, type: 'مكية' },
  { num: 96, ar: 'العلق', en: 'Al-\'Alaq', verses: 19, type: 'مكية' },
  { num: 97, ar: 'القدر', en: 'Al-Qadr', verses: 5, type: 'مكية' },
  { num: 98, ar: 'البينة', en: 'Al-Bayyina', verses: 8, type: 'مدنية' },
  { num: 99, ar: 'الزلزلة', en: 'Az-Zalzala', verses: 8, type: 'مدنية' },
  { num: 100, ar: 'العاديات', en: 'Al-\'Adiyat', verses: 11, type: 'مكية' },
  { num: 101, ar: 'القارعة', en: 'Al-Qari\'a', verses: 11, type: 'مكية' },
  { num: 102, ar: 'التكاثر', en: 'At-Takathur', verses: 8, type: 'مكية' },
  { num: 103, ar: 'العصر', en: 'Al-\'Asr', verses: 3, type: 'مكية' },
  { num: 104, ar: 'الهمزة', en: 'Al-Humaza', verses: 9, type: 'مكية' },
  { num: 105, ar: 'الفيل', en: 'Al-Fil', verses: 5, type: 'مكية' },
  { num: 106, ar: 'قريش', en: 'Quraysh', verses: 4, type: 'مكية' },
  { num: 107, ar: 'الماعون', en: 'Al-Ma\'un', verses: 7, type: 'مكية' },
  { num: 108, ar: 'الكوثر', en: 'Al-Kawthar', verses: 3, type: 'مكية' },
  { num: 109, ar: 'الكافرون', en: 'Al-Kafirun', verses: 6, type: 'مكية' },
  { num: 110, ar: 'النصر', en: 'An-Nasr', verses: 3, type: 'مدنية' },
  { num: 111, ar: 'المسد', en: 'Al-Masad', verses: 5, type: 'مكية' },
  { num: 112, ar: 'الإخلاص', en: 'Al-Ikhlas', verses: 4, type: 'مكية' },
  { num: 113, ar: 'الفلق', en: 'Al-Falaq', verses: 5, type: 'مكية' },
  { num: 114, ar: 'الناس', en: 'An-Nas', verses: 6, type: 'مكية' },
];

function renderSurahs(list) {
  const container = document.getElementById('surah-list');
  container.innerHTML = list.map(s => `
    <a class="surah-item" href="https://quran.com/${s.num}" target="_blank">
      <div class="surah-num">${s.num}</div>
      <div class="surah-info">
        <div class="surah-name-ar">${s.ar}</div>
        <div class="surah-name-en">${s.en}</div>
      </div>
      <div class="surah-meta">
        <div>${s.verses} آية</div>
        <div>${s.type}</div>
      </div>
    </a>
  `).join('');
}

function filterSurahs(query) {
  const filtered = surahs.filter(s => 
    s.ar.includes(query) || s.en.toLowerCase().includes(query.toLowerCase()) || s.num.toString().includes(query)
  );
  renderSurahs(filtered);
}

// تهيئة قائمة السور
renderSurahs(surahs);

// آية اليوم
const dailyAyahs = [
  { text: '﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾', ref: 'سورة الشرح - آية ٦' },
  { text: '﴿ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ﴾', ref: 'سورة الطلاق - آية ٣' },
  { text: '﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾', ref: 'سورة البقرة - آية ١٥٣' },
  { text: '﴿ وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ﴾', ref: 'سورة البقرة - آية ١٨٦' },
  { text: '﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾', ref: 'سورة الشرح - آية ٥' },
  { text: '﴿ حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ ﴾', ref: 'سورة آل عمران - آية ١٧٣' },
  { text: '﴿ وَاللَّهُ غَالِبٌ عَلَى أَمْرِهِ وَلَكِنَّ أَكْثَرَ النَّاسِ لَا يَعْلَمُونَ ﴾', ref: 'سورة يوسف - آية ٢١' },
];

const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
const todayAyah = dailyAyahs[dayOfYear % dailyAyahs.length];
document.getElementById('daily-ayah').textContent = todayAyah.text;
document.querySelector('.ayah-ref').textContent = todayAyah.ref;
