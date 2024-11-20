console.log("Welcome to spotify");
//Initilization of variables
let songIndex = 0;
let audioElement = new Audio("/songs/0.mp3");
let masterPlay = document.querySelector("#masterPlay");
let myProgressBar = document.querySelector("#myProgressBar");
let songItems = document.querySelectorAll(".songItem");
let songTitle = document.querySelector(".defSong");
let time=document.querySelector(".time");

let songs = [
  {
    songName: "Warriyo - Mortals",
    filePath: "/songs/0.mp3",
    coverPath: "/covers/1.jpg",
  },

  {
    songName: "Cielo - Huma-Huma",
    filePath: "/songs/1.mp3",
    coverPath: "/covers/2.jpg",
  },

  {
    songName: "DEAF KEV - Invincible",
    filePath: "/songs/2.mp3",
    coverPath: "/covers/3.jpg",
  },

  {
    songName: "Different Heaven & EH!DE",
    filePath: "/songs/3.mp3",
    coverPath: "/covers/4.jpg",
  },

  {
    songName: "Natty Lou - Galactic",
    filePath: "/songs/4.mp3",
    coverPath: "/covers/6.jpg",
  },

  {
    songName: "Soundy x Sander Mölder - Donna",
    filePath: "/songs/5.mp3",
    coverPath: "/covers/7.jpg",
  },

  {
    songName: "Kapoeira Phonk",
    filePath: "/songs/6.mp3",
    coverPath: "/covers/8.jpg",
  },

  {
    songName: "TULE - Fearless pt.II",
    filePath: "/songs/7.mp3",
    coverPath: "/covers/9.jpg",
  },
];

songItems.forEach((element, i) => {
  console.log(element, i);
  element.querySelector("img").src = songs[i].coverPath;
  element.querySelector(".songName").innerText = songs[i].songName;
});

//handle play/pause click
let gif = document.querySelector("#gif");
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    updatePlayPauseIcons();
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    makAllPlays();
  }
});

//listen to events
audioElement.addEventListener("timeupdate", () => {
  //update seekbar

  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
  time.innerText=formatTime(audioElement.currentTime);
  if(myProgressBar.value==100)
    {
      myProgressBar.value=0;
      time.innerText=`0:00`;
      masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity=0;
    makAllPlays();
    }
    
});

//progressBar Drag effect
myProgressBar.addEventListener("input", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

let arr = Array.from(document.querySelectorAll(".songItemPlay"));

function makAllPlays() {
  for (let item of arr) {
    item.classList.remove("fa-circle-pause");
    item.classList.add("fa-circle-play");
  }
}

for (let item of arr) {
  item.addEventListener("click", (e) => {
    checkStatus();
    makAllPlays();
    if (audioElement.paused || audioElement.currentTime <= 0) {
      item.classList.remove("fa-circle-play");
      item.classList.add("fa-circle-pause");
      songIndex = parseInt(e.target.id);
      audioElement.src = `songs/${songIndex}.mp3`;
      // audioElement.currentTime = 0;
      audioElement.play();
      songTitle.innerText = songs[songIndex].songName;
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    } else {
      audioElement.pause();
      item.classList.remove("fa-circle-pause");
      item.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      gif.style.opacity = 0;
    }
  });
}


document.querySelector("#previous").addEventListener("click", () => {
  makAllPlays();
  if (songIndex <= 0) songIndex = 7;
  else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  songTitle.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updatePlayPauseIcons();
});

document.querySelector("#next").addEventListener("click", () => {
  makAllPlays();
  if (songIndex >= 7) songIndex = 0;
  else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.play();
  songTitle.innerText = songs[songIndex].songName;
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  updatePlayPauseIcons();
});

function updatePlayPauseIcons() {
  arr.forEach((element) => {
    if (
      element.parentElement.parentElement.previousElementSibling.innerText ===
      songTitle.innerText
    ) {
      element.classList.remove("fa-circle-play");
      element.classList.add("fa-circle-pause");
    }
  });
}

function checkStatus()
{
  if(audioElement.played)
    {
      audioElement.pause();
    }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

