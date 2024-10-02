let albumId = new URLSearchParams(location.search).get("id");
let table = document.querySelector("table");
const getArtistFromAlbum = function (albumId) {
  let apiAlbum = `https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`;

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

      if (album.artist && album.artist.id) {
        let artistId = album.artist.id;

        getInfoArtist(artistId);
      } else {
        console.error("ID dell'artista non trovato nell'album");
      }
    })
    .catch((error) => {
      console.log("errore", error);
    });
};

const getInfoArtist = function (artistId) {
  let apiArtist = `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`;

  fetch(apiArtist)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("LA RISPOSTA DEL SERVER NON è OK");
      }
    })
    .then((artist) => {
      console.log("info artista", artist);
      let trackList = artist.tracklist;
      console.log(artist.tracklist);
      fetch(trackList)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("LA RISPOSTA DEL SERVER NON è OK");
          }
        })
        .then((trackList) => {
          const heroArtist = document.querySelector(".hero-artist");
          heroArtist.style.backgroundImage = `url(${artist.picture_big})`;
          console.log(trackList);
          let title = document.getElementById("artistTitle");
          title.innerText = artist.name;

          let fanCount = document.getElementById("fanCount");
          fanCount.innerText = ` ${artist.nb_fan} ascoltatori mensili`;

          for (let i = 0; i < trackList.data.length; i++) {
            let newRow = document.createElement("tr");
            newRow.innerHTML = `<td class="number">${i + 1}</td>
                    <td class="artist-img">
                    <img src= ${trackList.data[i].album.cover_small} width="35px" />
                    </td>
                    <td class="song">
                    <p class="bold text-white"> ${trackList.data[i].title}</p>
                  </td>
                  <td class="riproduzioni">${trackList.data[i].rank}</td>
                                    <td class="durata">${trackList.data[i].duration}</td>
                  `;

            table.appendChild(newRow);
          }
          let roundedImage = document.querySelector(".roundedImg");
          roundedImage.src = artist.picture_small;
          let infoNameArtist = document.getElementById("info");
          infoNameArtist.innerText = ` Di ${artist.name}`;
        });
    })
    .catch((error) => {
      console.log("errore", error);
    });
};

getArtistFromAlbum(albumId);

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
