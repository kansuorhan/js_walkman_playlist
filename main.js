const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

// index
let index = 4;

// loop
let loop = true;

// json data
const songsList = [
  {
    name: "Que Sera Sera",
    link: "assets/Billianne - Que sera sera.mp3",
    artist: "Billianne",
    image: "./assets/Billianne - Que sera sera.jpg",
  },
  {
    name: "Perde Kalkti",
    link: "assets/Erkan Oğur Perde Kalktı.mp3",
    artist: "Erkan Oğur",
    image: "./assets/Erkan-Ogur-Fuad-2001.jpg",
  },
  {
    name: "Golha",
    link: "assets/Farid Farjad Golha.mp3",
    artist: "Farid Farjad",
    image: "./assets/Farid Farjad.jpg",
  },
  {
    name: "Durme Durme Querido Hijico",
    link: "assets/Francoise Atlan Durme Durme Querido Hijico.mp3",
    artist: "Francoise Atlan",
    image: "./assets/Francoise Atlan Durme Durme Querido Hijico.jpg",
  },
  {
    name: "Remember Everything",
    link: "assets/Kacey Musgraves  Remember Everything ft Zach Bryan.mp3",
    artist: "Kacey Musgraves ft Zach Bryan",
    image: "./assets/Kacey Musgraves.jpg",
  },
  {
    name: "Let Her Go",
    link: "assets/Passenger Let Her Go.mp3",
    artist: "Passenger",
    image: "./assets/Passenger-Let-Her-Go.jpg",
  },
  {
    name: "Masar",
    link: "assets/le-trio-joubran-masar.mp3",
    artist: "Le Trio Joubran",
    image: "./assets/le-trio-joubran-masar.jpg",
  },
  {
    name: "İnkar Etme",
    link: "assets/Nilüfer İnkar Etme.mp3",
    artist: "Nilüfer",
    image: "./assets/Nilufer-Sen-Muhimsin-1990.jpg",
  },
  {
    name: "Mil Pasos",
    link: "assets/Soha - Mil Pasos.mp3",
    artist: "Soha",
    image: "./assets/Soha - Mil Pasos.jpg",
  },
  {
    name: "The Moon of Our Beloved´s Face",
    link: "assets/The Moon of Our Beloved´s Face.mp3",
    artist: "Mahsa & Marjan Vahdat",
    image: "./assets/The Moon of Our Beloved´s Face.jpg",
  },
  {
    name: "Porque",
    link: "assets/Yasmin Levy Porque.mp3",
    artist: "Yasmin Levy",
    image: "./assets/Yasmin-Levy-Sentir-2009.jpg",
  },
];

// play
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

// stop
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

// set song
const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsList[arrayIndex];

  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };

  playListContainer.classList.add("hide");
  playAudio();
};

// time control
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

progressBar.addEventListener("click", (event) => {
  // start
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  //x line
  let coordEnd = event.clientX;
  console.log(coordEnd);
  console.log(progressBar.offsetWidth);

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;
  console.log(progress);

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

// time format

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

const previousSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
};

const nextSong = () =>{
  if (loop) {
      if (index == (songsList.length - 1)) {
          index = 0
      }else {
          index = index  + 1
      }
      setSong(index)
  } else {
      let randIndex = Math.floor(Math.random() * songsList.length)
      setSong(randIndex)
  }

}

// repeat button
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
  }
});

// mix button
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    audio.loop = true;
  } else {
    shuffleButton.classList.add("active");
    audio.loop = false;
  }
});

//next song
audio.onended = () => {
  nextSong();
};

playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//play button
playButton.addEventListener("click", playAudio);

//stop button
pauseButton.addEventListener("click", pauseAudio);

//previuos button
prevButton.addEventListener("click", previousSong);

//next button
nextButton.addEventListener("click", nextSong);

const initializePlaylist = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
      </div>
      <div class="playlist-song-details">
       <span id="playlist-song-name">
        ${songsList[i].name}
       </span>
       <span id="playlist-song-artist-album">
       ${songsList[i].artist}
       </span>
      </div>
     </li>
     `;
  }
};

window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};
