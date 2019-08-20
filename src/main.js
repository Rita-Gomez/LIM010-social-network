// Este es el punto de entrada de tu aplicacion
// import { verPersonaje } from './lib/index.js';


// variables globales

const register = document.getElementById('boton-guardar');
const logearse = document.getElementById('boton-segunda');
const retornar = document.getElementById('boton-regresar');
const login = document.getElementById('login');
const go = document.getElementById('ir-guardar');
const page2 = document.getElementById('page2');
const respuesta = document.getElementById('respuesta');
const alerta = document.getElementById('passalert');
const probandoArray = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')) : [];
// funcion

register.addEventListener('click', () => {
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  const expresion = /\w+@\w+\.+[a-z]/;
  if (email === '' || nombre === '' || contraseña === '') {
    alerta.innerHTML = '<i class="bx bx-error-circle"></i> Todos los campos son obligatorios';
    return false;
  } else if (!isNaN(nombre)) {
    alerta.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir nombre';
    return false;
  } else if (contraseña.length < 6) {
    alerta.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir contraseña';
    return false;
  } else if (!expresion.test(email)) {
    alerta.innerHTML = ' <i class="bx bx-error-circle"></i> Email invalido';
    return false;
  } else {
    const encriptar = window.cipher.encode(33, contraseña);
    probandoArray.push({ nombre, email, encriptar });
    localStorage.setItem('usuarios', JSON.stringify(probandoArray));
    alerta.innerHTML = 'Ya estas registrada(o)';
    document.getElementById('nametxt').value = '';
    document.getElementById('emailtxt').value = '';
    document.getElementById('contraseñatxt').value = '';
    page2.classList.remove('hide');
    login.classList.add('hide');
    retornar.classList.remove('hide');
    return true;
  }
});

logearse.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  const descencriptar = window.cipher.decode(33, contraseña);
  for (let i = 0; i < probandoArray.length; i++) {
    if (email === probandoArray[i].email && descencriptar) {
      alert('ingresar');
    } else {
      respuesta.classList.remove('hide');
      respuesta.innerHTML = '<i class="bx bx-error"></i>Lo sentimos. Has introducido una dirección o contraseña incorrecta.';
    }

  }
});

retornar.addEventListener('click', () => {
  location.reload();
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  go.classList.add('hide');
  page2.classList.add('hide');
  login.classList.remove('hide');
});

go.addEventListener('click', () => {
  page2.classList.remove('hide');
  login.classList.add('hide');

}); 


