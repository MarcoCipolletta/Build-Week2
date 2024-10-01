let id = new URLSearchParams(location.search).get("id");
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
                      <p class="bold text-white">${songArray[i].title}</p>
                      <p>${songArray[i].artist.name}</p>
                    </td>
                    <td class="r">${songArray[i].rank}</td>
                    <td class="c">${convertSeconds(songArray[i].duration)}</td>`;
        table.appendChild(newRow);
      }
    })
    .catch((error) => {
      console.log("errore", error);
    });
};
getInfoAlbum(id);
let artistName = document.getElementById("artistName");
artistName.addEventListener("click", function () {
  window.location.href = `./artist.html?id=${id} `;
});

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
