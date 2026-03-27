// ==============================
// Swiper 초기화
// ==============================
const mainSwiper = new Swiper(".main-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: ".next-btn",
        prevEl: ".prev-btn",
    },
});

// 갤러리 swiper 반복 초기화
document.querySelectorAll(".log-slider").forEach(slider => {
    new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 15,
        pagination: { el: slider.querySelector(".swiper-pagination"), clickable: true },
    });
});

// ==============================
// D-day 계산
// ==============================

document.querySelectorAll('.d-day-val').forEach(el => {
    const start = new Date(el.dataset.date);
    const diff = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24)) + 1;
    el.innerText = diff;
});

// ==============================
// 오디오 플레이어
// ==============================
function togglePlay(btn) {
    const player = btn.closest(".audio-player");
    const audio = player.querySelector(".theme-audio");

    if (audio.paused) audio.play();
    else audio.pause();
}

document.querySelectorAll(".theme-audio").forEach(audio => {
    const player = audio.closest(".audio-player");
    const btn = player.querySelector(".play-pause-btn");
    const curTime = player.querySelector(".cur-time");
    const totalTime = player.querySelector(".total-time");
    const progress = player.querySelector(".progress-bar");

    audio.addEventListener("play", () => btn.textContent = "⏸");
    audio.addEventListener("pause", () => btn.textContent = "▶");

    audio.addEventListener("loadedmetadata", () => {
        totalTime.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
        curTime.textContent = formatTime(audio.currentTime);
        progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    });
});

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// ==============================
// 프로그레스 바 클릭
// ==============================
function seek(e, container) {
    const audio = container.closest(".audio-player").querySelector(".theme-audio");
    const rect = container.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
}

// ==============================
// 볼륨 조절
// ==============================
function changeVolume(slider) {
    const audio = slider.closest(".audio-player").querySelector(".theme-audio");
    audio.volume = slider.value;
}

function toggleVolumeSlider(icon) {
    const slider = icon.closest(".volume-wrap").querySelector(".vol-slider");
    slider.classList.toggle("active");
}