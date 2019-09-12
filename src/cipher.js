/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
window.cipher = {
  encode: (offset, string) => {
    let mensajecifrado = '';
    for (let i = 0; i < string.length; i++) {
      if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) {
        const textocaracter = (string.charCodeAt(i) - 65 + parseInt(offset)) % 26 + 65;
        mensajecifrado += String.fromCharCode(textocaracter);
      } else if (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122) {
        const textocaracter = (string.charCodeAt(i) - 97 + parseInt(offset)) % 26 + 97;
        mensajecifrado += String.fromCharCode(textocaracter);
      } else { mensajecifrado += string.charAt(i); }
    }
    return mensajecifrado;
  },
  decode: (offset, string) => {
    let mensajeDescifrado = "";
    for (let i = 0; i < string.length; i++) {
      if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) {
        const textocaracter = (string.charCodeAt(i) + 65 - parseInt(offset)) % 26 + 65;
        mensajeDescifrado += String.fromCharCode(textocaracter);
      } else if (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122) {
        const textocaracter = ((string.charCodeAt(i) - 97 - parseInt(offset) + 52) % 26) + 97;
        mensajeDescifrado += String.fromCharCode(textocaracter);
      } else { mensajeDescifrado += string.charAt(i); }
    }
    return mensajeDescifrado;
  },
};
