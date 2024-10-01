let cantanti = "";

const getInfoCantante = function (cantanti) {
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
      console.log("info cantante", cantante);
    })
    .catch((error) => {
      console.log("errore", error);
    });
};
getInfoCantante("eminem");
