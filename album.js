let id = new URLSearchParams(location.search).get("id");

let arrayCanzoni = [];

const getInfoAlbum = function (id) {
  let apiAlbum = `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`;
  fetch(apiAlbum)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("LA RISPOSTA DEL SERVER NON è OK");
      }
    })
    .then((album) => {
      console.log("info album", album);
      let songArray = album.tracks.data;
      console.log(songArray);

      let title = document.getElementById("title");
      title.innerText = album.title;
      let table = document.querySelector("table");
      let albumImage = document.getElementById("album-image");
      albumImage.src = album.cover_medium;
      let iconImage = document.getElementById("iconImage");
      iconImage.src = album.cover_small;
      let artistName = document.getElementById("artistName");
      artistName.innerText = album.artist.name;
      let year = document.getElementById("year");
      year.innerText = album.release_date;
      let numTracks = document.getElementById("numTracks");
      numTracks.innerText = album.nb_tracks;
      let albumDur = album.duration;
      let s = convertMinutes(albumDur);
      let totDuration = document.getElementById("totDuration");
      totDuration.innerText = s;

      for (let i = 0; i < songArray.length; i++) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `<td class="c">${i + 1}</td>
                    <td class="l">
                      <p onclick="playMusic(${i})" class="bold text-white cursor-pointer">${songArray[i].title}</p>
                      <p>${songArray[i].artist.name}</p>
                    </td>
                    <td class="r">${songArray[i].rank}</td>
                    <td class="c">${convertSeconds(songArray[i].duration)}</td>`;
        table.appendChild(newRow);
        arrayCanzoni.push(songArray[i]);
      }
    })
    .catch((error) => {
      console.log("errore", error);
    });
};

console.log(arrayCanzoni);

function convertSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} : ${remainingSeconds}`;
}

function convertMinutes(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} ora ${remainingMinutes} min`;
}

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

const playMusic = function (i) {
  console.log(i);

  // audio.src = arrayCanzoni[i].preview;

  let oggArtista = {
    titolo: arrayCanzoni[i].title_short,
    imgAlbum: arrayCanzoni[i].album.cover_small,
    nomeArtista: arrayCanzoni[i].artist.name,
    idArtista: arrayCanzoni[i].artist.id,
    preview: arrayCanzoni[i].preview,
  };

  localStorage.setItem("oggArtista", JSON.stringify(oggArtista));
  barMusicinfo();

  isplaying = false;
  playStop();
};

getInfoAlbum(id);
