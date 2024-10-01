let cantanti = "";

const getInfoCantante = function (cantanti, index) {
  let apiCantante = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${cantanti}`;
  fetch(apiCantante)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("LA RISPOSTA DEL SERVER NON è OK");
      }
    })
    .then((cantante) => {
      let titolo = "";
      let img = "";

      let albumrandom = Math.floor(Math.random() * cantante.data.length);

      titolo = cantante.data[albumrandom].album.title;
      img = cantante.data[albumrandom].album.cover_small;
      let id = cantante.data[albumrandom].album.id;
      stampaAlbum(titolo, index, img, id);
    })
    .catch((error) => {
      console.log("errore", error);
    });
};

let playListCard = document.querySelectorAll(".playlist-card");
console.log(playListCard);

const stampaAlbum = function (titolo, index, img, id) {
  playListCard[index].innerHTML = ` 
  <img src=${img} alt="Playlist Cover" class="playlist-cover" />
              <p class="playlist-name">${titolo}</p>`;
};
getInfoCantante("eminem", 0);

getInfoCantante("fedez", 1);

getInfoCantante("ladygaga", 2);

getInfoCantante("the weekend", 3);

getInfoCantante("annalisa", 4);

getInfoCantante("gemitaiz", 5);

let buttonPlay = document.querySelector(".play");
let audio = document.querySelector("audio");
let isplaying = false;

buttonPlay.addEventListener("click", function () {
  audio.src = "https://cdn-preview-a.dzcdn.net/stream/c-a97dcc722aae5375f05d9a74f9d69a76-3.mp3";

  if (isplaying) {
    audio.pause();
    isplaying = false;
  } else {
    audio.play();
    isplaying = true;
  }
});
