const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const repeatBtn = document.getElementById('repeat-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const songTitle = document.getElementById('song-title');
const fileInput = document.getElementById('file-input');

let songs = [];
let currentSongIndex = 0;
let isShuffling = false;
let isRepeating = false;

// Load and play a song
function loadSong(index) {
  audioPlayer.src = URL.createObjectURL(songs[index]);
  songTitle.textContent = songs[index].name;
  audioPlayer.play();
  playPauseBtn.textContent = '⏸️';
}

// Play or pause the song
playPauseBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = '▶️';
  }
});

// Load previous song
prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
});

// Load next song
nextBtn.addEventListener('click', () => {
  if (isShuffling) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(currentSongIndex);
});

// Toggle repeat
repeatBtn.addEventListener('click', () => {
  isRepeating = !isRepeating;
  repeatBtn.style.color = isRepeating ? '#00ff00' : '#ffffff';
});

// Toggle shuffle
shuffleBtn.addEventListener('click', () => {
  isShuffling = !isShuffling;
  shuffleBtn.style.color = isShuffling ? '#00ff00' : '#ffffff';
});

// Handle song end
audioPlayer.addEventListener('ended', () => {
  if (isRepeating) {
    loadSong(currentSongIndex);
  } else {
    nextBtn.click();
  }
});

// Add songs from file input
fileInput.addEventListener('change', (event) => {
  songs = Array.from(event.target.files);
  if (songs.length > 0) {
    currentSongIndex = 0;
    loadSong(currentSongIndex);
  }
});
