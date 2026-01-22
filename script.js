const songs = [
  {
    title: "Aaluma Doluma",
    artist: "Anirudh Ravichander",
    cover: "https://picsum.photos/200?ajith1",
    src: "./audio/aaluma_doluma.mp3"
  },
  {
    title: "Surviva",
    artist: "Anirudh Ravichander",
    cover: "https://picsum.photos/200?ajith2",
    src: "./audio/surviva.mp3"
  },
  {
    title: "Mankatha Theme",
    artist: "Yuvan Shankar Raja",
    cover: "https://picsum.photos/200?ajith3",
    src: "./audio/mankatha_theme.mp3"
  },
  {
    title: "Monica",
    artist: "Yuvan Shankar Raja",
    cover: "https://picsum.photos/200?ajith4",
    src: "./audio/Monica.mp3"
  },
  {
    title: "Thala Pola Varuma",
    artist: "Yuvan Shankar Raja",
    cover: "https://picsum.photos/200?ajith5",
    src: "./audio/thala_pola_varuma.mp3"
  },
  {
    title: "Veera vinayaga",
    artist: "D imman",
    cover: "https://picsum.photos/200?ajith6",
    src: "./audio/veera_vinayaka.mp3"
  },
  {
    title: "Back From The Dead",
    artist: "Anirudh Ravichandran",
    cover: "https://picsum.photos/200?ajith7",
    src: "./audio/Back From The Dead.mp3"
  },
];

const playlist = document.getElementById("playlist");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const coverEl = document.getElementById("cover");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play");
const player = document.getElementById("player");

const currentTimeEl = document.querySelector(".currentTime");
const durationEl = document.querySelector(".duration");

let audio = new Audio();
let current = 0;
let isPlaying = false;

/* RENDER PLAYLIST */
songs.forEach((song, i) => {
  const div = document.createElement("div");
  div.className = "song";
  div.innerHTML = `
    <img src="${song.cover}">
    <div>
      <strong>${song.title}</strong>
      <p>${song.artist}</p>
    </div>
  `;
  div.onclick = () => loadSong(i);
  playlist.appendChild(div);
});

function loadSong(index, autoPlay = true) {
  current = index;
  const song = songs[index];

  document.querySelectorAll(".song").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".song")[index].classList.add("active");

  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverEl.src = song.cover;
  audio.src = song.src;

  if (autoPlay) {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
    player.classList.add("playing");
  } else {
    isPlaying = false;
    playBtn.textContent = "▶";
    player.classList.remove("playing");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadSong(0, false);
});


playBtn.onclick = () => {
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    player.classList.remove("playing");
    playBtn.textContent = "▶";
  } else {
    audio.play();
    player.classList.add("playing");
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
};

document.getElementById("next").onclick = () =>
  loadSong((current + 1) % songs.length);

document.getElementById("prev").onclick = () =>
  loadSong((current - 1 + songs.length) % songs.length);

/* PROGRESS */
audio.ontimeupdate = () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
};

progress.oninput = () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
};

audio.onloadedmetadata = () => {
  durationEl.textContent = formatTime(audio.duration);
};

/* AUTO PLAY NEXT SONG */
audio.addEventListener("ended", () => {
  loadSong((current + 1) % songs.length);
});

/* TIME FORMAT */
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️ Light Mode";
  } else {
    themeBtn.textContent = "🌙 Dark Mode";
  }
};
