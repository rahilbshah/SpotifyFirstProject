console.log("Welcome To Spotify");
//Intialize the variable
let songIndex = 1;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let masterSongName = document.getElementById("masterSongName");
let myProgressBar = document.getElementById("myProgressBar");
let myVolume = document.getElementById("volumebtn");
let next = document.getElementById("next");
let previous = document.getElementById("previous");
let currentTime=document.getElementById("currentTime")
let songs = [
  {
    songName: "Let Me Love You",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Shape Of You",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  { songName: "Perfect", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Believer", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Closer", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  {
    songName: "Beginning Middle End",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  { songName: "STAY", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  {
    songName: "Phir Kabhi",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  { songName: "Jab Tak", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
];
// --------------------------------------------------------------------------------------
//Handle Play/Pause Click

function masterPlayBtn() {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
}

masterPlay.addEventListener("click", () => {
  masterPlayBtn();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    masterPlayBtn();
  }
});
// -----------------------------------------------------------------------------------
//Play Next Song

function nextSong() {
  if (songIndex == 9) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[`${songIndex}` - 1].songName;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  playbtn();
}

next.addEventListener("click", () => {
  nextSong();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowRight") {
    nextSong();
  }
});
// --------------------------------------------------------------------------------------
//Play Previous Song

function previousSong() {
  if (songIndex == 1) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = songs[`${songIndex}` - 1].songName;
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  playbtn();
}

previous.addEventListener("click", () => {
  previousSong();
});

document.addEventListener("keydown", (e) => {
  if (e.code == "ArrowLeft") {
    previousSong();
  }
});
// -------------------------------------------------------------------------------------------
//ProgressBar
audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

// -----------------------------------------------------------------------------------
//All Songs in Queue
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
const playbtn = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      if (element.id == songIndex) {
        element.classList.remove("fa-circle-play");
        element.classList.add("fa-circle-pause");
      } else {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
      }
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterSongName.innerText = songs[`${songIndex}` - 1].songName;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);
// ----------------------------------------------------------------------------------------
//Volume Button
function songmute() {
  if (audioElement.muted) {
    audioElement.muted = false;
    myVolume.classList.remove("fa-volume-xmark");
    myVolume.classList.add("fa-volume-high");
  } else {
    audioElement.muted = true;
    myVolume.classList.remove("fa-volume-high");
    myVolume.classList.add("fa-volume-xmark");
  }
}

myVolume.addEventListener("click", songmute, false);

document.addEventListener("keydown", (e) => {
  if (e.code == "KeyM") {
    songmute();
  }
});
// ---------------------------------------------------------------------------------------------
audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  if (progress == 100) {
    nextSong();
  }
});
audioElement.addEventListener("timeupdate", () => {
  let min2, sec2;
  min2 = parseInt(audioElement.duration / 60);
  sec2 = parseInt(audioElement.duration - 60 * min2);
  if (sec2 < 10) {
    document.getElementById("durationTime").innerHTML =
      "0" + min2 + ":" + "0" + (sec2 + 1);
  } else {
    document.getElementById("durationTime").innerHTML =
      "0" + min2 + ":" + (sec2 + 1);
  }
});
// ------------------------------------------------------------------------------------------
audioElement.addEventListener("timeupdate", () => {
  let min, sec;
  min = parseInt(audioElement.currentTime / 60);
  sec = parseInt(audioElement.currentTime);

  if (sec >= 240) {
    sec = sec - 240;
    currentTime.innerHTML = "0" + min + ":" + sec;
  } else if (sec >= 180) {
    sec = sec - 180;
    currentTime.innerHTML = "0" + min + ":" + sec;
  } else if (sec >= 120) {
    sec = sec - 120;
    currentTime.innerHTML = "0" + min + ":" + sec;
  } else if (sec >= 60) {
    sec = sec - 60;
    currentTime.innerHTML = "0" + min + ":" + sec;
  }

  if (sec < 10) {
    currentTime.innerHTML = "0" + min + ":" + "0" + sec;
  } else {
    currentTime.innerHTML = "0" + min + ":" + sec;
  }
});
