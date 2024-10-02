let cantanti = "";

const barMusicinfo = function () {
  let oggArtistaStorage = JSON.parse(localStorage.getItem("oggArtista"));

  if (oggArtistaStorage) {
    audio.src = oggArtistaStorage.preview;
    imgBarMusic.src = oggArtistaStorage.imgAlbum;
    titoloCanzoneBarMusic.innerText = oggArtistaStorage.titolo;
    nomeArtistaBarMusic.innerHTML = oggArtistaStorage.nomeArtista;
  } else {
    audio.src = "https://cdn-preview-a.dzcdn.net/stream/c-a97dcc722aae5375f05d9a74f9d69a76-3.mp3";
  }
};

const getInfoCantante = function (idAlbum, index) {
  let apiCantante = ` https://striveschool-api.herokuapp.com/api/deezer/album/${idAlbum}`;
  fetch(apiCantante)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("LA RISPOSTA DEL SERVER NON è OK");
      }
    })
    .then((album) => {
      let titolo = "";
      let img = "";
      console.log(album);

      titolo = album.title;
      img = album.cover_small;
      let id = album.id;
      console.log(id);

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

  playListCard[index].addEventListener("click", function () {
    window.location.href = `./album.html?id=${id} `;
  });
};

getInfoCantante("103248", 0); //103248

getInfoCantante("15116337", 1); //15116337

getInfoCantante("1075407", 2); //1075407

getInfoCantante("11375450", 3); //11375450

getInfoCantante("74434962", 4); //74434962

getInfoCantante("523909312", 5); //523909312

let buttonPlay = document.querySelector(".play");

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
