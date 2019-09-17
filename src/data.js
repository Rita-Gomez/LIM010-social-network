/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable arrow-parens */
/* eslint-disable no-restricted-globals */
const validarPassword = (string) => {
  if (string.length >= 6) {
    return true;
  }
  return false;
};

const validarEmail = (string) => {
  const expresion = /\w+@\w+\.+[a-z]/;
  return (expresion.test(string));
};


const validarNombre = (string) => {
  if (typeof (string) === 'string') {
    return true;
  } return false;
};

const leerLocalStorage = string => (localStorage.getItem(string) ? JSON.parse(localStorage.getItem(string)) : []);

const guardarLocalStorage = (string, arr) => (localStorage.setItem(string, JSON.stringify(arr)));

const agregarElementoArray = (ele, arr) => arr.concat(ele);

const eliminarElementoArray = (arr, indice) => arr.filter((y, posicion) => posicion !== indice);

const editarElementosArray = (arr, indice, valor) => (arr[indice].ele === valor);

window.data = {
  validarPassword,
  validarEmail,
  validarNombre,
  leerLocalStorage,
  guardarLocalStorage,
  agregarElementoArray,
  eliminarElementoArray,
  editarElementosArray,
};
