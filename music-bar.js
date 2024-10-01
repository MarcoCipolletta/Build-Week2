let buttonPrecedente = document.getElementById("canzone-precedente");
let buttonSuccessivo = document.getElementById("canzone-successiva");
let buttonPausaStart = document.getElementById("avvio-pausa");
let buttonRestart = document.getElementById("reset-canzone");
let regolaVolume = document.getElementById("volume-slider");
let barradurata = document.getElementById("seek-slider");
let currentTime = document.getElementById("current-time");
let duration = document.getElementById("duration");

audio.src = "https://cdn-preview-a.dzcdn.net/stream/c-a97dcc722aae5375f05d9a74f9d69a76-3.mp3";

buttonPausaStart.addEventListener("click", function () {
  if (isplaying) {
    audio.pause();
    buttonPausaStart.style.color = "#b3b3b3";
    buttonPausaStart.innerHTML = `<ion-icon name="play-circle-sharp"></ion-icon>`;
    isplaying = false;
  } else {
    audio.play();
    buttonPausaStart.style.color = "#1ed760";
    buttonPausaStart.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    isplaying = true;
  }
});

buttonRestart.addEventListener("click", function () {
  audio.currentTime = 0;
});

regolaVolume.addEventListener("input", function () {
  audio.volume = regolaVolume.value;
});

audio.addEventListener("timeupdate", function () {
  let durata = (audio.currentTime / audio.duration) * 100;
  barradurata.value = durata;
  currentTime.innerText = audio.currentTime;
});
