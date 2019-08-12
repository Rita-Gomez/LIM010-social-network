// Este es el punto de entrada de tu aplicacion
// import { verPersonaje } from './lib/index.js';

// eslint-disable-next-line no-console
// console.log(verPersonaje('hOLA MUNDO'));

// variables globales
const save = document.getElementById('boton-guardar');
const give = document.getElementById('boton-cargar');
const login = document.getElementById('login');
const page2 = document.getElementById('page2');
const img = document.getElementById('img');
// funcion
save.addEventListener('click', () => {
  /* Captura de datos escrito en los inputs */
  const email = document.getElementById('emailtxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  /* Guardando los datos en el LocalStorage */
  localStorage.setItem('Email', email);
  localStorage.setItem('Contraseña', contraseña);
  /* Limpiando los campos o inputs */
  document.getElementById('emailtxt').value = '';
  document.getElementById('contraseñatxt').value = '';
  img.classList.add('hide');
  page2.classList.remove('hide');
  login.classList.add('hide');
});

give.addEventListener('click', () => {
  /* Obtener datos almacenados */
  const email = localStorage.getItem('Email');
  const contraseña = localStorage.getItem('Contraseña');
  /* Mostrar datos almacenados */
  document.getElementById('email').innerHTML = email;
  document.getElementById('contraseña').innerHTML = contraseña;
  login.classList.add('hide');
});
