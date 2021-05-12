const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const replay = document.querySelector(".replay");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");
//Sounds
  const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
  const timeDisplay = document.querySelector(".time-display");
  const outlineLength = outline.getTotalLength();
//Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 60;

  outline.style.strokeDashoffset = outlineLength;
  outline.style.strokeDasharray = outlineLength;
  // timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  //   fakeDuration % 60
  // )}`;
  //play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // Select timeSelect
  timeSelect.forEach((timeSelectButoon) => {
    timeSelectButoon.addEventListener('click', () => {
      fakeDuration = timeSelectButoon.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration)/60} : ${Math.floor(fakeDuration)%60}`
    })
  })
  sounds.forEach(sound => {
    sound.addEventListener('click', () => {
     song.src = sound.getAttribute('data-sound');
     video.src = sound.getAttribute('data-video');
     checkPlaying(song);
    })
  })
  // Pause and play songs
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src='./svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src='./svg/play.svg';
    }
  }

  // circle animation
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let lapsedTime = fakeDuration - currentTime;
    let lapsedSeconds = Math.floor(lapsedTime % 60);
    let lapsedMinutes = Math.floor(lapsedTime /60);
    timeDisplay.textContent=`${lapsedMinutes}:${lapsedSeconds}`
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if (currentTime > fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src= './svg/play.svg';
      video.pause();
    }
  }



}
app();