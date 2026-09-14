//    Quran Data
const surahs = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأعراف",
    "الأنفال",
    "التوبة",
    "يونس",
    "هود",
    "يوسف",
    "الرعد",
    "إبراهيم",
    "الحجر",
    "النحل",
    "الإسراء",
    "الكهف",
    "مريم",
    "طه",
    "الأنبياء",
    "الحج",
    "المؤمنون",
    "النور",
    "الفرقان",
    "الشعراء",
    "النمل",
    "القصص",
    "العنكبوت",
    "الروم",
    "لقمان",
    "السجدة",
    "الأحزاب",
    "سبأ",
    "فاطر",
    "يس",
    "الصافات",
    "ص",
    "الزمر",
    "غافر",
    "فصلت",
    "الشورى",
    "الزخرف",
    "الدخان",
    "الجاثية",
    "الأحقاف",
    "محمد",
    "الفتح",
    "الحجرات",
    "ق",
    "الذاريات",
    "الطور",
    "النجم",
    "القمر",
    "الرحمن",
    "الواقعة",
    "الحديد",
    "المجادلة",
    "الحشر",
    "الممتحنة",
    "الصف",
    "الجمعة",
    "المنافقون",
    "التغابن",
    "الطلاق",
    "التحريم",
    "الملك",
    "القلم",
    "الحاقة",
    "المعارج",
    "نوح",
    "الجن",
    "المزمل",
    "المدثر",
    "القيامة",
    "الإنسان",
    "المرسلات",
    "النبأ",
    "النازعات",
    "عبس",
    "التكوير",
    "الانفطار",
    "المطففين",
    "الانشقاق",
    "البروج",
    "الطارق",
    "الأعلى",
    "الغاشية",
    "الفجر",
    "البلد",
    "الشمس",
    "الليل",
    "الضحى",
    "الشرح",
    "التين",
    "العلق",
    "القدر",
    "البينة",
    "الزلزلة",
    "العاديات",
    "القارعة",
    "التكاثر",
    "العصر",
    "الهمزة",
    "الفيل",
    "قريش",
    "الماعون",
    "الكوثر",
    "الكافرون",
    "النصر",
    "المسد",
    "الإخلاص",
    "الفلق",
    "الناس"
];
// Elements
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeElement = document.getElementById("currentTime");
const durationElement = document.getElementById("duration");
const volumeBar = document.getElementById("volumeBar");
const surahTitle = document.getElementById("surahTitle");
const surahList = document.getElementById("surahList");
const searchInput = document.getElementById("searchInput");
//    Current Surah
let currentSurahIndex = 0;
// ---------   Create function Playlist
function createPlaylist() {
    surahList.innerHTML = "";
    for (let i = 0; i < surahs.length; i++) {
        const surahItem = document.createElement("div");
        surahItem.classList.add("surah-item");
        surahItem.innerHTML = `
            <span class="surah-number">
                ${String(i + 1).padStart(3, "0")}
            </span>
            <span class="surah-name">
                سورة ${surahs[i]}
            </span>
            <button class="surah-play">
                ▶
            </button>
        `;
        surahItem.addEventListener("click", function () {
            loadSurah(i);
            playSurah();
        });
        surahList.appendChild(surahItem);
    }
}
//    Search Surahs
searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim();
    const allSurahs =document.querySelectorAll(".surah-item");
    allSurahs.forEach(function (item, index) {
        const surahName = surahs[index];
        if (surahName.includes(searchValue)) {
            item.style.display = "flex";
        } else {
            item.style.display = "none";
        }
    });
});
//   create function Load Surah
function loadSurah(index) {
    currentSurahIndex = index;
    const surahNumber = String(index + 1).padStart(3, "0");
    // audioPlayer.src = `Music/${surahNumber}.mp3`;
    // audioPlayer.src = "https://archive.org/download/Yasser_Aldosari_MP3_Quran/001.mp3";
    audioPlayer.src = `https://archive.org/download/Yasser_Aldosari_MP3_Quran/${surahNumber}.mp3`;
    surahTitle.textContent = `سورة ${surahs[index]}`;
    updateActiveSurah();
    audioPlayer.load();
}
//    Play Surah
function playSurah() {
    audioPlayer.play();
    playBtn.textContent = "⏸";
}

//    Pause Surah
function pauseSurah() {
    audioPlayer.pause();
    playBtn.textContent = "▶";
}
//  Play / Pause
playBtn.addEventListener("click", function () {
    if (audioPlayer.paused) {
        playSurah();
    } else {
        pauseSurah();
    }
});
//Previous Surah
previousBtn.addEventListener("click", function () {
    if (currentSurahIndex > 0) {
        loadSurah(currentSurahIndex - 1);
        playSurah();
    }
});
//Next Surah
nextBtn.addEventListener("click", function () {
    if (currentSurahIndex < surahs.length - 1) {
        loadSurah(currentSurahIndex + 1);
        playSurah();
    }
});
//Update Progress
audioPlayer.addEventListener("timeupdate", function () {
    if (audioPlayer.duration) {
        const progress =(audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }
    currentTimeElement.textContent =formatTime(audioPlayer.currentTime);
});
//Audio Duration
audioPlayer.addEventListener("loadedmetadata", function () {
    durationElement.textContent = formatTime(audioPlayer.duration);
});
//Progress Bar
progressBar.addEventListener("input", function () {
    if (audioPlayer.duration) {
        const newTime =(progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = newTime;
    }
});
//Format Time
function formatTime(time) {
    if (isNaN(time)) {
        return "00:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
// Volume
volumeBar.addEventListener("input", function () {
    audioPlayer.volume = volumeBar.value;
});
//Audio Ended
audioPlayer.addEventListener("ended", function () {
    if (currentSurahIndex < surahs.length - 1) {
        loadSurah(currentSurahIndex + 1);
        playSurah();
    } else {
        playBtn.textContent = "▶";
    }
});
//Active Surah
function updateActiveSurah() {
    const allSurahs =document.querySelectorAll(".surah-item");
    allSurahs.forEach(function (item, index) {
        if (index === currentSurahIndex) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}
//Initialize
createPlaylist();
loadSurah(0);
audioPlayer.volume = 1;
