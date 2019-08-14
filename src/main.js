/* eslint-disable semi-spacing */
// Este es el punto de entrada de tu aplicacion
// import { verPersonaje } from './lib/index.js';

// eslint-disable-next-line no-console
// console.log(verPersonaje('hOLA MUNDO'));

// variables globales
const save = document.getElementById('boton-guardar');
const give = document.getElementById('boton-segunda');
const volver = document.getElementById('boton-regresar');
const login = document.getElementById('login');
const ir = document.getElementById('ir-guardar');
const page2 = document.getElementById('page2');
const respuesta = document.getElementById('respuesta');
// funcion
save.addEventListener('click', () => {
  /* Captura de datos escrito en los inputs */
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  /* Guardando los datos en el LocalStorage */
  localStorage.setItem('Nombre', nombre);
  localStorage.setItem('Email', email);
  localStorage.setItem('Contraseña', contraseña);
  /* Limpiando los campos o inputs */
  document.getElementById('nametxt').value = '';
  document.getElementById('emailtxt').value = '';
  document.getElementById('contraseñatxt').value = '';
  page2.classList.remove('hide');
  login.classList.add('hide');
  volver.classList.remove('hide');
});

give.addEventListener('click', () => {
  /* Obtener datos almacenados */
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  if (email === localStorage.getItem('Email') && contraseña === localStorage.getItem('Contraseña') ){
    respuesta.innerHTML = 'puedes ingresar';
  } else {
    respuesta.innerHTML = 'No puedes acceder';
  }
});

volver.addEventListener('click', () => {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  respuesta.classList.add('hide');
  ir.classList.add('hide');
  page2.classList.add('hide');
  login.classList.remove('hide');
});

ir.addEventListener('click', () => {
  page2.classList.remove('hide');
  login.classList.add('hide');
}); 
