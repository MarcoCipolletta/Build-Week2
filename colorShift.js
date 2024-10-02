
const buildRgb = (imageData) => {
    const rgbValues = [];
    // Iteriamo ogni 4 valori: R, G, B e Alpha
    for (let i = 0; i < imageData.length; i += 4) {
        const rgb = {
            r: imageData[i],
            g: imageData[i + 1],
            b: imageData[i + 2],
        };
        rgbValues.push(rgb);
    }
    return rgbValues;
};
/**
 * Calcola la distanza o differenza tra 2 colori
 *
 * ulteriori spiegazioni su questo argomento
 * possono essere trovate qui -> https://en.wikipedia.org/wiki/Euclidean_distance
 * nota: questo metodo non è accurato, per risultati migliori usa la metrica Delta-E.
 */
const calculateColorDifference = (color1, color2) => {
    const rDifference = Math.pow(color2.r - color1.r, 2);
    const gDifference = Math.pow(color2.g - color1.g, 2);
    const bDifference = Math.pow(color2.b - color1.b, 2);
  
    return rDifference + gDifference + bDifference;
  };
  
  // restituisce quale canale colore ha la differenza maggiore
  const findBiggestColorRange = (rgbValues) => {
    /**
     * Min è inizializzato al valore massimo possibile
     * da lì procediamo a trovare il valore minimo per quel canale colore
     *
     * Max è inizializzato al valore minimo possibile
     * da lì procediamo a trovare il valore massimo per quel canale colore
     */
    let rMin = Number.MAX_VALUE;
    let gMin = Number.MAX_VALUE;
    let bMin = Number.MAX_VALUE;
  
    let rMax = Number.MIN_VALUE;
    let gMax = Number.MIN_VALUE;
    let bMax = Number.MIN_VALUE;
  
    rgbValues.forEach((pixel) => {
      rMin = Math.min(rMin, pixel.r);
      gMin = Math.min(gMin, pixel.g);
      bMin = Math.min(bMin, pixel.b);
  
      rMax = Math.max(rMax, pixel.r);
      gMax = Math.max(gMax, pixel.g);
      bMax = Math.max(bMax, pixel.b);
    });
  
    const rRange = rMax - rMin;
    const gRange = gMax - gMin;
    const bRange = bMax - bMin;
  
    // determina quale colore ha la differenza maggiore
    const biggestRange = Math.max(rRange, gRange, bRange);
    if (biggestRange === rRange) {
      return "r";
    } else if (biggestRange === gRange) {
  
      return "g";
    } else {
      return "b";
    }
  };

const quantization = (rgbValues, depth) => {
    const MAX_DEPTH = 4;
  
    // Caso base
    if (depth === MAX_DEPTH || rgbValues.length === 0) {
      const color = rgbValues.reduce(
        (prev, curr) => {
          prev.r += curr.r;
          prev.g += curr.g;
          prev.b += curr.b;
  
          return prev;
        },
        {
          r: 0,
          g: 0,
          b: 0,
        }
      );
  
      color.r = Math.round(color.r / rgbValues.length);
      color.g = Math.round(color.g / rgbValues.length);
      color.b = Math.round(color.b / rgbValues.length);
  
      return [color];
    }
  /**
   *  Ricorsivamente fare quanto segue:
   *  1. Trovare il canale del pixel (rosso, verde o blu) con la maggiore differenza/intervallo
   *  2. Ordinare per questo canale
   *  3. Dividere a metà la lista dei colori RGB
   *  4. Ripetere il processo fino alla profondità desiderata o al caso base
   */
  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1, p2) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantization(rgbValues.slice(0, mid), depth + 1),
    ...quantization(rgbValues.slice(mid + 1), depth + 1),
  ];
};



// Ottieni l'elemento immagine dal DOM
const imgElement = document.getElementById("album-image");

// Assicurati che l'immagine sia completamente caricata prima di procedere
imgElement.onload = () => {
    // Ottieni l'elemento canvas
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Imposta le dimensioni del canvas in base alle dimensioni dell'immagine
    canvas.width = imgElement.width;
    canvas.height = imgElement.height;

    // Disegna l'immagine sul canvas
    ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

    // Ottieni i dati dell'immagine dal canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(imageData);

    // Converti i dati dell'immagine in un array RGB
    const rgbArray = buildRgb(imageData.data);
    console.log(rgbArray);

    const quantColors = quantization(rgbArray, 0);
    console.log(quantColors);
    let r = quantColors[12].r;
    let g = quantColors[12].g;
    let b = quantColors[12].b;
    let result = document.getElementById('result');
    result.style.background = `linear-gradient(180deg, rgb(${r}, ${g}, ${b}), #212121)`;
};
