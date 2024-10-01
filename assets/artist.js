let id = new URLSearchParams(location.search).get("id");
const getInfoArtist = function (id) {
  let apiAlbum = `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`;
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
      let title = document.getElementById("artistTitle");
      title.innerText = album.artist.name;
      console.log(title);
    })
    .catch((error) => {
      console.log("errore", error);
    });
};
getInfoArtist(id);
