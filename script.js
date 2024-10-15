// Music Player
const songs = [
    { name: 'Beymaniyan', src: './music/beymaniyan.mp3' },
    { name: 'Fanaa', src: './music/fanaa.mp3' },
    { name: 'Bachke bachke', src: 'music/bachkeBachke.mp3' }
];

let currentTrack = 0;
let isPlaying = false;
const audio = new Audio();
const trackTitle = document.getElementById('track-title');
const progressBar = document.getElementById('progress-bar');
const playPauseBtn = document.getElementById('playPauseBtn');

// Initialize
function loadTrack(index) {
    audio.src = songs[index].src;
    trackTitle.innerText = songs[index].name;
    progressBar.value = 0;
}

// Play or Pause the track
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerText = '▶️';
    } else {
        audio.play();
        playPauseBtn.innerText = '⏸️';
    }
    isPlaying = !isPlaying;
}

// Update progress bar as track plays
audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
});

// Change track position when progress bar is clicked
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Previous and Next buttons functionality
document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrack = currentTrack > 0 ? currentTrack - 1 : songs.length - 1;
    loadTrack(currentTrack);
    togglePlayPause();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrack = currentTrack < songs.length - 1 ? currentTrack + 1 : 0;
    loadTrack(currentTrack);
    togglePlayPause();
});

// Load and play selected song from the list
document.querySelectorAll('.song-list li').forEach((item) => {
    item.addEventListener('click', (event) => {
        currentTrack = event.target.getAttribute('data-index');
        loadTrack(currentTrack);
        togglePlayPause();
    });
});

// Start with the first song
loadTrack(currentTrack);

// Play or Pause the current track when play button is clicked
playPauseBtn.addEventListener('click', togglePlayPause);
