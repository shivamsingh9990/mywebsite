console.log('welcome to spotify');

let songIndex  = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let mastersongname=document.getElementById('mastersongname'); 
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "character dheela ", filePath: "songs/1.mp3", coverPath: "cover/1.jpeg" },
    { songName: "hata ki sawan ki ghata  ", filePath: "songs/2.mp3", coverPath: "cover/2.jpeg" },
    { songName: "mauja hi mauja ", filePath: "songs/3.mp3", coverPath: "cover/3.jpeg" },
    { songName: "oho jane jana  ", filePath: "songs/4.mp3", coverPath: "cover/4.jpeg" },
    { songName: "suna hai tere dil pe ", filePath: "songs/5.mp3", coverPath: "cover/5.jpeg" },
    { songName: "teri chunariya ", filePath: "songs/6.mp3", coverPath: "cover/6.jpeg" },
    { songName: "sanam re", filePath: "songs/7.mp3", coverPath: "cover/7.jpeg" }
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
         gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
});
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle'); 
        element.classList.add('fa-play-circle'); 
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllplays(); 
        songIndex = parseInt(e.target.id) - 1; // Fix off-by-one error
        e.target.classList.remove('fa-play-circle'); 
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`; // Adjusting filePath
        mastersongname.innerText = songs[songIndex].songName; 
        audioElement.currentTime = 0; 
        audioElement.play(); 
        gif.style.opacity = 1; 
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 6) { // Fix: Change 7 to 6
        songIndex = 0;
    } else {
        songIndex += 1; 
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; // Fix file path
    mastersongname.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0; 
    audioElement.play(); 
    gif.style.opacity = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) { 
        songIndex = 6; // Fix: Loop back to last song
    } else {
        songIndex -= 1; 
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`; 
    mastersongname.innerText = songs[songIndex].songName; 
    audioElement.currentTime = 0; 
    audioElement.play(); 
    gif.style.opacity = 1; 
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
});
