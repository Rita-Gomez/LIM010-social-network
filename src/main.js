/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable semi-spacing */
// Este es el punto de entrada de tu aplicacion
// import { verPersonaje } from './lib/index.js';
// eslint-disable-next-line no-console
// console.log(verPersonaje('Hola mundo'));

// variables globales
const botonregister = document.getElementById('btn-guardar');
const botonretornar = document.getElementById('btn-regresar');
const botoningresar = document.getElementById('btn-ingresar');
const botonmostrartexto = document.getElementById('btn-mostrartexto');
const etiquetaahrefregister = document.getElementById('ir-guardar');
const etiquetaahrefoutlogin = document.getElementById('logout');
const etiquetaahrefout = document.getElementById('out');
const image = document.getElementById('img');
const login = document.getElementById('login');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');
const page4 = document.getElementById('page4');
const etiquetaparraforespuesta = document.getElementById('respuesta');
const etiquetaparrafoalerta = document.getElementById('passalert');
const etiquetaparrafocorrecto = document.getElementById('lookatme');
const etiquetaparrafoerror = document.getElementById('dontlook');
const parrafotextocorrecto = document.getElementById('parrafotextocorrecto');
const parrafotextoarea = document.getElementById('parrafotextoarea');
const probandoArray = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')) : [];

// funcion
botonregister.addEventListener('click', () => {
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  const expresion = /\w+@\w+\.+[a-z]/;
  if (email === '' || nombre === '' || contraseña === '') {
    etiquetaparrafoalerta.innerHTML = '<i class="bx bx-error-circle"></i> Todos los campos son obligatorios';
    return false;
  } else if (!isNaN(nombre)) {
    etiquetaparrafoalerta.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir nombre';
    return false;
  } else if (contraseña.length < 6) {
    etiquetaparrafoalerta.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir contraseña';
    return false;
  } else if (!expresion.test(email)) {
    etiquetaparrafoalerta.innerHTML = ' <i class="bx bx-error-circle"></i> Email invalido';
    return false;
  } else {
    const encriptar = window.cipher.encode(33, contraseña);
    probandoArray.push({ nombre, email, encriptar });
    localStorage.setItem('usuarios', JSON.stringify(probandoArray));
    etiquetaparrafoalerta.innerHTML = 'Ya estas registrada(o)';
    document.getElementById('nametxt').value = '';
    document.getElementById('emailtxt').value = '';
    document.getElementById('contraseñatxt').value = '';
    page2.classList.remove('hide');
    login.classList.add('hide');
    botonretornar.classList.remove('hide');
    return true;
  }
});

botoningresar.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contraseñainput = document.getElementById('contraseña').value;
  const infoname = document.getElementById('ver-name');
  const parrafoname = document.getElementById('parrafonombre');
  for (let i = 0; i < probandoArray.length; i++) {
    const descencriptar = window.cipher.decode(33, probandoArray[i].encriptar);
    if (email === probandoArray[i].email && descencriptar === contraseñainput) {
      page3.classList.remove('hide');
      page4.classList.remove('hide');
      login.classList.add('hide');
      image.classList.add('hide');
      infoname.innerHTML = `Mi perfil: ${probandoArray[i].nombre}`;
      parrafoname.innerHTML = `${probandoArray[i].nombre}`;
    } else {
      etiquetaparraforespuesta.classList.remove('hide');
      etiquetaparraforespuesta.innerHTML = '<i class="bx bx-error"></i>Lo sentimos. Has introducido una dirección o contraseña incorrecta.';
    }
  }
});

const data = JSON.parse(localStorage.getItem('textos'));
botonmostrartexto.addEventListener('click', () => {
  const area = document.getElementById('textarea').value;
  const imprimir = area;
  const textNode = document.createTextNode(imprimir);
  const liNode = document.createElement('h4');
  if (area === '') {
    etiquetaparrafoerror.classList.remove('hide');
    parrafotextoarea.classList.remove('hide');
    parrafotextoarea.innerHTML = '<i class="bx bx-error-circle"></i> No has ingresado ningun texto';
    return false;
  } else {
    etiquetaparrafoerror.classList.add('hide');
    parrafotextoarea.classList.add('hide');
    etiquetaparrafocorrecto.classList.remove('hide');
    liNode.appendChild(textNode);
    etiquetaparrafocorrecto.appendChild(liNode);
    document.getElementById('textarea').value = '';
    const textoArray = localStorage.getItem('textos') ? JSON.parse(localStorage.getItem('textos')) : [];
    textoArray.push({ imprimir });
    localStorage.setItem('textos', JSON.stringify(textoArray));
    console.log(data);
    return textoArray;
  }
});

etiquetaahrefoutlogin.addEventListener('click', () => {
  page4.classList.add('hide');
  page3.classList.add('hide');
  login.classList.remove('hide');
  image.classList.remove('hide');
  etiquetaparraforespuesta.classList.add('hide');
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
});

etiquetaahrefout.addEventListener('click', () => {
  page4.classList.add('hide');
  page3.classList.add('hide');
  login.classList.remove('hide');
  image.classList.remove('hide');
  etiquetaparraforespuesta.classList.add('hide');
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
});

botonretornar.addEventListener('click', () => {
  location.reload();
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  etiquetap.classList.add('hide');
  page2.classList.add('hide');
  login.classList.remove('hide');
});

etiquetaahrefregister.addEventListener('click', () => {
  page2.classList.remove('hide');
  login.classList.add('hide');
});
