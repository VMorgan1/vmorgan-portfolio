const PLAY_ICON_SRC = "./assets/play.svg";
const PAUSE_ICON_SRC = "./assets/pause.svg";
const UPLOADED_TRACK_SRC = "./assets/back_drop-dark-ambient-background-music-grey-skies-422761.mp3";
const PLAYER_COVER_SRC = "./assets/og image.png";
const SPOTIFY_PLAYLIST_EMBED_URL =
  "https://open.spotify.com/embed/playlist/65nTqilromnNMhF74uMuRC?utm_source=generator";
const SPOTIFY_PLAYLIST_TITLE = "VMorgan playlist - Spotify";
const SITE_AUDIO_VOLUME = 0.2;
const MUSIC_PLAYER_STORAGE_KEY = "vmorgan-music-player";

const tracks = [
  { name: "Essence", artist: "Wizkid ft. Tems", length: 248 },
  { name: "Come Away With Me", artist: "Norah Jones", length: 198 },
  { name: "Sunflower", artist: "Rex Orange County", length: 252 },
  { name: "Pink + White", artist: "Frank Ocean", length: 184 },
  { name: "Idea 10", artist: "Gibran Alcocer", length: 147 },
];

const trackPopup = document.getElementById("trackPopup");
const trackMenuToggle = document.getElementById("trackMenuToggle");
const playerCover = document.getElementById("playerCover");
const playIcon = document.getElementById("playIcon");
const musicToggle = document.getElementById("musicToggle");
const timelineRange = document.getElementById("timelineRange");
const marqueeTrack = document.getElementById("marqueeTrack");
const trackTitle = document.getElementById("trackTitle");
const musicStatus = document.getElementById("musicStatus");
const uploadedTrackAudio = new Audio(UPLOADED_TRACK_SRC);
uploadedTrackAudio.preload = "metadata";
uploadedTrackAudio.volume = SITE_AUDIO_VOLUME;

let audioContext = null;
let ambienceNodes = [];
let isPlaying = false;
let selectedTrackIndex = 0;
let trackProgress = 0;
let progressTimer = null;

function readMusicState() {
  try {
    return JSON.parse(window.localStorage.getItem(MUSIC_PLAYER_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveMusicState() {
  window.localStorage.setItem(
    MUSIC_PLAYER_STORAGE_KEY,
    JSON.stringify({
      selectedTrackIndex,
      trackProgress,
      isPlaying,
      savedAt: Date.now(),
    }),
  );
}

function restoreMusicState() {
  const state = readMusicState();
  selectedTrackIndex = Number.isInteger(state.selectedTrackIndex) ? state.selectedTrackIndex : 0;
  if (!tracks[selectedTrackIndex]) selectedTrackIndex = 0;
  trackProgress = Number.isFinite(state.trackProgress) ? state.trackProgress : 0;
  isPlaying = false;
  return Boolean(state.isPlaying);
}

function renderTracks() {
  trackPopup.innerHTML = `
    <iframe
      class="spotify-playlist-embed"
      data-testid="embed-iframe"
      title="VMorgan Spotify playlist"
      src="${SPOTIFY_PLAYLIST_EMBED_URL}"
      width="100%"
      height="352"
      frameborder="0"
      allowfullscreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  `;
}

function renderPlayerCover() {
  if (!playerCover || playerCover.querySelector("img")) return;
  const image = document.createElement("img");
  image.src = PLAYER_COVER_SRC;
  image.alt = "";
  image.loading = "lazy";
  playerCover.appendChild(image);
}

function syncTrackButtons() {
  document.querySelectorAll(".track-popup-card").forEach((button, index) => {
    button.classList.toggle("is-active", index === selectedTrackIndex);
  });
}

function updateProgressUI() {
  timelineRange.value = String(trackProgress);
}

function updateTrackDisplay(resetProgress = false) {
  if (resetProgress) {
    trackProgress = 0;
    updateProgressUI();
  }
  trackTitle.textContent = SPOTIFY_PLAYLIST_TITLE;
  marqueeTrack.classList.toggle("is-scrolling", trackTitle.textContent.length > 28);
  timelineRange.disabled = true;
  musicStatus.textContent = "Open the Spotify playlist to listen.";
}

function toggleTrackPopup(forceState) {
  const shouldOpen =
    typeof forceState === "boolean" ? forceState : trackPopup.hasAttribute("hidden");
  trackPopup.hidden = !shouldOpen;
  trackMenuToggle.setAttribute("aria-expanded", String(shouldOpen));
  document.querySelector(".menu-badge")?.classList.toggle("is-open", shouldOpen);
}

function startProgressLoop() {
  window.clearInterval(progressTimer);
  const track = tracks[selectedTrackIndex];
  progressTimer = window.setInterval(() => {
    trackProgress = (trackProgress + 100 / track.length) % 100;
    updateProgressUI();
    saveMusicState();
  }, 1000);
}

function stopProgressLoop() {
  window.clearInterval(progressTimer);
  progressTimer = null;
}

function setPlayingUi(track) {
  isPlaying = true;
  playIcon.src = PAUSE_ICON_SRC;
  playerCover.classList.add("is-spinning");
  musicStatus.textContent = `Now playing ${track.name}.`;
  saveMusicState();
}

function setStoppedUi(resetProgress = true) {
  isPlaying = false;
  playIcon.src = PLAY_ICON_SRC;
  playerCover.classList.remove("is-spinning");
  stopProgressLoop();
  if (resetProgress) {
    trackProgress = 0;
    updateProgressUI();
  }
  musicStatus.textContent = `Ready to play ${tracks[selectedTrackIndex].name}.`;
  saveMusicState();
}

async function startUploadedTrack() {
  const track = tracks[selectedTrackIndex];
  if (uploadedTrackAudio.duration && trackProgress > 0) {
    uploadedTrackAudio.currentTime = (trackProgress / 100) * uploadedTrackAudio.duration;
  }
  await uploadedTrackAudio.play();
  setPlayingUi(track);
}

function createPulseNode(frequency, type, gainValue, detune = 0) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detune;
  filter.type = "lowpass";
  filter.frequency.value = 850;
  gain.gain.value = gainValue;

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();

  return { oscillator, gain };
}

async function startAmbientTrack() {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const track = tracks[selectedTrackIndex];
  ambienceNodes = [
    createPulseNode(track.base, "sine", 0.035),
    createPulseNode(track.base * 1.5, "triangle", 0.02, 8),
    createPulseNode(track.base * 2, "sawtooth", 0.008, -4),
  ];
  setPlayingUi(track);
  startProgressLoop();
}

async function playSelectedTrack() {
  const track = tracks[selectedTrackIndex];
  if (track.audioSrc) {
    await startUploadedTrack();
    return;
  }
  await startAmbientTrack();
}

function stopTrack(resetProgress = true) {
  ambienceNodes.forEach((node) => {
    node.oscillator.stop();
    node.oscillator.disconnect();
    node.gain.disconnect();
  });
  ambienceNodes = [];
  uploadedTrackAudio.pause();
  setStoppedUi(resetProgress);
}

function initPlayer() {
  if (!trackPopup || !musicToggle) return;

  restoreMusicState();
  renderPlayerCover();
  renderTracks();
  syncTrackButtons();
  updateTrackDisplay();
  updateProgressUI();
  playIcon.src = PLAY_ICON_SRC;
}

trackPopup?.addEventListener("click", async (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const button = target.closest("[data-track]");
  if (!button) return;
  const wasPlaying = isPlaying;
  stopTrack(true);
  selectedTrackIndex = Number(button.getAttribute("data-track"));
  syncTrackButtons();
  updateTrackDisplay(true);
  toggleTrackPopup(false);
  if (wasPlaying) {
    await playSelectedTrack();
  }
});

musicToggle?.addEventListener("click", async () => {
  toggleTrackPopup(true);
  playIcon.src = PLAY_ICON_SRC;
  musicStatus.textContent = "Use the Spotify controls in the playlist.";
});

trackMenuToggle?.addEventListener("click", () => {
  toggleTrackPopup();
});

timelineRange?.addEventListener("input", () => {
  trackProgress = Number(timelineRange.value);
  if (tracks[selectedTrackIndex]?.audioSrc && uploadedTrackAudio.duration) {
    uploadedTrackAudio.currentTime = (trackProgress / 100) * uploadedTrackAudio.duration;
  }
  saveMusicState();
});

uploadedTrackAudio.addEventListener("timeupdate", () => {
  if (!uploadedTrackAudio.duration || !isPlaying) return;
  trackProgress = (uploadedTrackAudio.currentTime / uploadedTrackAudio.duration) * 100;
  updateProgressUI();
  saveMusicState();
});

uploadedTrackAudio.addEventListener("loadedmetadata", () => {
  const fileTrack = tracks.find((track) => track.audioSrc === UPLOADED_TRACK_SRC);
  if (fileTrack && uploadedTrackAudio.duration) {
    fileTrack.length = Math.round(uploadedTrackAudio.duration);
  }
});

uploadedTrackAudio.addEventListener("ended", () => {
  stopTrack(true);
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (
    trackPopup &&
    trackMenuToggle &&
    !trackPopup.hasAttribute("hidden") &&
    !trackPopup.contains(target) &&
    !trackMenuToggle.contains(target) &&
    !musicToggle?.contains(target)
  ) {
    toggleTrackPopup(false);
  }
});

window.addEventListener("beforeunload", saveMusicState);

initPlayer();
