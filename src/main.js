/* eslint-disable semi-spacing */
// Este es el punto de entrada de tu aplicacion
// import { verPersonaje } from './lib/index.js';

// eslint-disable-next-line no-console
// console.log(verPersonaje('hOLA MUNDO'));

// variables globales
const registrar = document.getElementById('boton-guardar');
const ingresar = document.getElementById('boton-segunda');
const volver = document.getElementById('boton-regresar');
const login = document.getElementById('login');
const ir = document.getElementById('ir-guardar');
const page2 = document.getElementById('page2');
const respuesta = document.getElementById('respuesta');
const invalida = document.getElementById('passinvalida');
// funcion
registrar.addEventListener('click', () => {
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  const expresion = /\w+@\w+\.+[a-z]/; 
  

  // const arr = [];

  // arr.push({nombre:'nuevo',  email:'usuario@hotmail.com',edad:20});
  // arr.push({nombre:'usuario2', email:'usuario@hotmail.com', edad:1000})
  // console.log(arr);
 
  // localStorage.setItem('usuarios',  JSON.stringify(arr));
 
  console.log(JSON.parse(localStorage.getItem('usuarios')));

  // localStorage.setItem('Nombre', nombre);
  // localStorage.setItem('Email', email);
  // localStorage.setItem('Contraseña', contraseña);
  if (email === ''|| nombre===''||contraseña==='') {
    invalida.innerHTML = '<i class="bx bx-error-circle"></i> Todos los campos son obligatorios';
    return false ;
  
} else if (contraseña.length<=6){
 invalida.innerHTML =' <i class="bx bx-error-circle"></i> Contraseña mínimo de 6 caracteres';
return false   ;
}else if (!expresion.test(email)){
  invalida.innerHTML='<i class="bx bx-error-circle"></i> Ingrese un correo válido';
return false; 
} else if (!isNaN(nombre)){
  invalida.innerHTML =' <i class="bx bx-error-circle"></i> Por favor su nombre debe contener solo letras';
  return false   ; 
}else{
  const probandoArr = [];
  probandoArr.push ({nombre: nombre, email: email, contraseña: contraseña});
localStorage.setItem('usuarios' , JSON.stringify(probandoArr));
  invalida.innerHTML = 'Ya estas registrada(o)'
  document.getElementById('nametxt').value = '';
  document.getElementById('emailtxt').value = '';
  document.getElementById('contraseñatxt').value = '';
  page2.classList.remove('hide');
  login.classList.add('hide');
  volver.classList.remove('hide');
  return true ;
}
});


ingresar.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  console.log(JSON.parse(localStorage.getItem('usuarios')));
  if (email === localStorage.getItem('email') && contraseña === localStorage.getItem('contraseña')){
    /* respuesta.innerHTML = 'puedes ingresar'; */
    // eslint-disable-next-line no-alert
    alert('puedes ingresar');
  } else {
    respuesta.classList.remove('hide');
    respuesta.innerHTML = '<i class="bx bx-error"></i>Lo sentimos. Has introducido una dirección electrónica o contraseña incorrecta.';
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


