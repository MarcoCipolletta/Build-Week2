let albumId = new URLSearchParams(location.search).get("id");

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
      const heroArtist = document.querySelector(".hero-artist");
      heroArtist.style.backgroundImage = `url(${artist.picture_big})`;

      let title = document.getElementById("artistTitle");
      title.innerText = artist.name;

      let fanCount = document.getElementById("fanCount");
      fanCount.innerText = ` ${artist.nb_fan} ascoltatori mensili`;
    })
    .catch((error) => {
      console.log("errore", error);
    });
};

getArtistFromAlbum(albumId);
