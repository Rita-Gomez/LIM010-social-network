/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// variables globales
const btnRegistro = document.getElementById('btn-guardar');
const btnRetornar = document.getElementById('btn-regresar');
const btnIngresar = document.getElementById('btn-ingresar');
const btnPublicar = document.getElementById('btn-mostrartexto');
const enlaceRegistro = document.getElementById('ir-guardar');
const btnSalir = document.getElementById('logout');
const inputImagen = document.getElementById('img');
const inputIngreso = document.getElementById('login');
const inputRegistro = document.getElementById('page2');
const inputMenu = document.getElementById('page3');
const inputPost = document.getElementById('page4');
const msjErroneoLogin = document.getElementById('respuesta');
const msjErroneoRegistro = document.getElementById('passalert');
const msjErroneoPost = document.getElementById('dontlook');
const msjVacioPost = document.getElementById('parrafotextoarea');
const arrayLocalStorage = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')) : [];

btnRegistro.addEventListener('click', () => {
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value;
  if (email === '' || nombre === '' || contraseña === '') {
    msjErroneoRegistro.innerHTML = '<i class="bx bx-error-circle"></i> Todos los campos son obligatorios';
    return false;
  } if (!data.validarNombre(nombre)) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir nombre';
    return false;
  } if (!data.validarPassword(contraseña)) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Debe ser como minimo 6 caracteres';
    return false;
  } if (!data.validarEmail(email)) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Email invalido';
    return false;
  }
  const encriptar = window.cipher.encode(33, contraseña);
  arrayLocalStorage.push({ nombre, email, encriptar });
  localStorage.setItem('usuarios', JSON.stringify(arrayLocalStorage));
  msjErroneoRegistro.innerHTML = 'Ya estas registrada(o)';
  document.getElementById('nametxt').value = '';
  document.getElementById('emailtxt').value = '';
  document.getElementById('contraseñatxt').value = '';
  inputRegistro.classList.remove('hide');
  inputIngreso.classList.add('hide');
  btnRetornar.classList.remove('hide');
  return true;
});

btnIngresar.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contraseñainput = document.getElementById('contraseña').value;
  const infoname = document.getElementById('ver-name');
  const parrafoname = document.getElementById('parrafonombre');
  for (let i = 0; i < arrayLocalStorage.length; i++) {
    const descencriptar = window.cipher.decode(33, arrayLocalStorage[i].encriptar);
    if (email === arrayLocalStorage[i].email && descencriptar === contraseñainput) {
      inputMenu.classList.remove('hide');
      inputPost.classList.remove('hide');
      inputIngreso.classList.add('hide');
      inputImagen.classList.add('hide');
      infoname.innerHTML = `Mi perfil: ${arrayLocalStorage[i].nombre}`;
      parrafoname.innerHTML = `${arrayLocalStorage[i].nombre}`;
      pintarPost(data.leerLocalStorage('textos'));
    } else {
      msjErroneoLogin.classList.remove('hide');
      msjErroneoLogin.innerHTML = '<i class="bx bx-error"></i>Lo sentimos. Has introducido una dirección o contraseña incorrecta.';
    }
  }
});

const btnContraseña = document.querySelector('#btn');
btnContraseña.addEventListener('click', () => {
  const tipo = document.getElementById('contraseña');
  if (tipo.type === 'password') {
    tipo.type = 'text';
    btnContraseña.innerHTML = '<i class=\'bx bxs-hide\'></i>';
  } else {
    tipo.type = 'password';
    btnContraseña.innerHTML = '<i class=\'bx bx-show-alt\'></i>';
  }
});

// eslint-disable-next-line consistent-return
btnPublicar.addEventListener('click', () => {
  const area = document.getElementById('textarea').value;
  if (area === '') {
    msjErroneoPost.classList.remove('hide');
    msjVacioPost.classList.remove('hide');
    msjVacioPost.innerHTML = '<i class="bx bx-error-circle"></i> No has ingresado ningun texto';
    return false;
  }
  msjErroneoPost.classList.add('hide');
  msjVacioPost.classList.add('hide');
  document.getElementById('vertabla').classList.remove('hide');
  document.getElementById('textarea').value = '';
  const location1 = data.leerLocalStorage('textos');
  data.agregarElementoArray({ area }, location1);
  data.guardarLocalStorage('textos', location1);
  pintarPost(location1);
});

const pintarPost = (arr) => {
  const tabla = document.getElementById('tblDatos');
  tabla.innerHTML = '';
  arr.forEach((obj, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML += `

                  <td id="objTexto">${obj.area}</td>
                  <td>
                      <button class="btnEditar"><!--<i class='bx bxs-pencil'></i>--></button>
                      <button class="btnEliminar"><!--<i class='bx bxs-trash'></i>--></button>
                  </td>    
    `;
    tr.setAttribute('id', index);
    tabla.appendChild(tr);
    const btnEditar = tr.querySelector('.btnEditar');
    btnEditar.addEventListener('click', () => {
      modificar(index, obj);
    });
    const btnEliminar = tr.querySelector('.btnEliminar');
    btnEliminar.addEventListener('click', () => {
      eliminar(index);
    });
  });
};

const modificar = (index, dataPost) => {
  const idtr = document.getElementById(index);
  idtr.innerHTML = ` 
  <td><input id="newText" placeholder="${dataPost.area}"></input></td>
  <td>
    <button class="btnModificar" data-index=${index}><!--<i class='bx bx-edit-alt'></i>--></button>
    <button class="btnCancel" data-index=${index}><!--<i class='bx bxs-calendar-x'></i>--></button>
  </td>  `;
  const btnCancel = idtr.querySelector('.btnCancel');
  btnCancel.addEventListener('click', () => {
    idtr.innerHTML = `<td id="objTexto">${dataPost.area}</td>
        <td>
          <button class="btnEditar"><!--<i class='bx bxs-pencil'></i>--></button>
          <button class="btnEliminar"><!--<i class='bx bxs-trash'></i>--></button>
        </td>  `;
  });
  const btnModificar = idtr.querySelector('.btnModificar');
  btnModificar.addEventListener('click', () => {
    actualizar2(index);
  });
};

const actualizar2 = (i2) => {
  const arrayPostLocalStorage = data.leerLocalStorage('textos');
  arrayPostLocalStorage[i2].area = document.getElementById('newText').value;
  if (data.editarElementosArray(arrayPostLocalStorage, i2, '')) {
    alert('Espacio vacío');
  } else {
    data.guardarLocalStorage('textos', arrayPostLocalStorage);
    pintarPost(data.leerLocalStorage('textos'));
  }
};

const eliminar = (i) => {
  const arrayPostLocalStorage = data.leerLocalStorage('textos');
  const filtrado = data.eliminarElementoArray(arrayPostLocalStorage, i);
  data.guardarLocalStorage('textos', filtrado);
  pintarPost(data.leerLocalStorage('textos'));
};

btnSalir.addEventListener('click', () => {
  inputPost.classList.add('hide');
  inputMenu.classList.add('hide');
  inputIngreso.classList.remove('hide');
  inputImagen.classList.remove('hide');
  msjErroneoLogin.classList.add('hide');
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
});

btnRetornar.addEventListener('click', () => {
  location.reload();
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  inputRegistro.classList.add('hide');
  inputIngreso.classList.remove('hide');
});

enlaceRegistro.addEventListener('click', () => {
  inputRegistro.classList.remove('hide');
  inputIngreso.classList.add('hide');
});
