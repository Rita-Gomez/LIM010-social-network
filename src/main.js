const btnRegistro = document.getElementById('btn-guardar');
const btnRetornar = document.getElementById('btn-regresar');
const btnIngresar = document.getElementById('btn-ingresar');
const btnPublicar = document.getElementById('btn-mostrartexto');
const enlaceRegistro = document.getElementById('ir-guardar');
const btnSalir = document.getElementById('logout');
const cajaImagen = document.getElementById('img');
const cajaIngreso = document.getElementById('login');
const cajaRegistro = document.getElementById('page2');
const cajaMenu = document.getElementById('page3');
const cajaPost = document.getElementById('page4');
const msjErroneoLogin = document.getElementById('respuesta');
const msjErroneoRegistro = document.getElementById('passalert');
const msjErroneoPost = document.getElementById('dontlook');
const msjVacioPost = document.getElementById('parrafotextoarea');
const arrayLocalStorage = localStorage.getItem('usuarios') ? JSON.parse(localStorage.getItem('usuarios')) : [];

btnRegistro.addEventListener('click', () => {
  const email = document.getElementById('emailtxt').value;
  const nombre = document.getElementById('nametxt').value;
  const contraseña = document.getElementById('contraseñatxt').value; 
  const expresion = /\w+@\w+\.+[a-z]/;
  if (email === '' || nombre === '' || contraseña === '') {
    msjErroneoRegistro.innerHTML = '<i class="bx bx-error-circle"></i> Todos los campos son obligatorios';
    return false;
  } else if (!isNaN(nombre)) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Corregir nombre';
    return false;
  } else if (contraseña.length < 6) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Debe ser como minimo 6 caracteres';
    return false;
  } else if (!expresion.test(email)) {
    msjErroneoRegistro.innerHTML = ' <i class="bx bx-error-circle"></i> Email invalido';
    return false;
  } else {
    const encriptar = window.cipher.encode(33, contraseña);
    arrayLocalStorage.push({ nombre, email, encriptar });
    localStorage.setItem('usuarios', JSON.stringify(arrayLocalStorage));
    msjErroneoRegistro.innerHTML = 'Ya estas registrada(o)';
    document.getElementById('nametxt').value = '';
    document.getElementById('emailtxt').value = '';
    document.getElementById('contraseñatxt').value = '';
    cajaRegistro.classList.remove('hide');
    cajaIngreso.classList.add('hide');
    btnRetornar.classList.remove('hide');
    return true;
  }
});

btnIngresar.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const contraseñainput = document.getElementById('contraseña').value;
  const infoname = document.getElementById('ver-name');
  const parrafoname = document.getElementById('parrafonombre');
  for (let i = 0; i < arrayLocalStorage.length; i++) {
    const descencriptar = window.cipher.decode(33, arrayLocalStorage[i].encriptar);    
    if (email === arrayLocalStorage[i].email && descencriptar === contraseñainput) {
      cajaMenu.classList.remove('hide');
      cajaPost.classList.remove('hide');
      cajaIngreso.classList.add('hide');
      cajaImagen.classList.add('hide');
      infoname.innerHTML = `Mi perfil: ${arrayLocalStorage[i].nombre}`;
      parrafoname.innerHTML = `${arrayLocalStorage[i].nombre}`;
      pintarPost(getTextos());
    } else {
      msjErroneoLogin.classList.remove('hide');
      msjErroneoLogin.innerHTML = '<i class="bx bx-error"></i>Lo sentimos. Has introducido una dirección o contraseña incorrecta.';
    }
  }
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {  
  const tipo = document.getElementById("contraseña");
  if(tipo.type == "password"){
      tipo.type = "text";
      btn.innerHTML = `<i class='bx bxs-hide'></i>`;
  }else{
      tipo.type = "password";      
      btn.innerHTML = `<i class='bx bx-show-alt'></i>`;
  }
});

btnPublicar.addEventListener('click', () => {
  const area = document.getElementById('textarea').value;
  if (area === '') {
    msjErroneoPost.classList.remove('hide');
    msjVacioPost.classList.remove('hide');
    msjVacioPost.innerHTML = '<i class="bx bx-error-circle"></i> No has ingresado ningun texto';
    return false;
  } else {
    msjErroneoPost.classList.add('hide');
    msjVacioPost.classList.add('hide');
    document.getElementById('vertabla').classList.remove('hide');
    document.getElementById('textarea').value = '';
    const location1 = getTextos();
    location1.push({ area });
    localStorage.setItem('textos', JSON.stringify(location1));
    console.log(location1);
    pintarPost();
  }
});

 const getTextos =()=>{
  return localStorage.getItem('textos') ? JSON.parse(localStorage.getItem('textos')) : [];
 };


const pintarPost = () => {
  const tabla = document.getElementById('tblDatos');
  const arrayPostLocalStorage = getTextos();
  tabla.innerHTML = '';
  arrayPostLocalStorage.forEach((obj, index) => {
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
  console.log('estoy consoleando my getelementbyid', idtr)
  idtr.innerHTML = ` 
  <td><input id="newText" placeholder="${dataPost.area}"></input></td>
  <td>
    <button class="btnModificar" data-index=${index}><!--<i class='bx bx-edit-alt'></i>--></button>
    <button class="btnCancel" data-index=${index}><!--<i class='bx bxs-calendar-x'></i>--></button>
  </td>  `
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
  const arrayPostLocalStorage = getTextos();
  arrayPostLocalStorage[i2].area = document.getElementById('newText').value;
  if (arrayPostLocalStorage[i2].area === ''){
   alert("Escribe su nombre");
  } else {
  localStorage.setItem('textos', JSON.stringify(arrayPostLocalStorage));
  pintarPost();
  }
};

const eliminar = (i) => {
  const arrayPostLocalStorage = getTextos();
  const filtrado = arrayPostLocalStorage.filter((y, posicion) => posicion !== i);
  localStorage.setItem('textos', JSON.stringify(filtrado));   
  pintarPost();
  
};

btnSalir.addEventListener('click', () => {
  cajaPost.classList.add('hide');
  cajaMenu.classList.add('hide');
  cajaIngreso.classList.remove('hide');
  cajaImagen.classList.remove('hide');
  msjErroneoLogin.classList.add('hide');
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
});

btnRetornar.addEventListener('click', () => {
  location.reload();
  document.getElementById('email').value = '';
  document.getElementById('contraseña').value = '';
  cajaRegistro.classList.add('hide');
  cajaIngreso.classList.remove('hide');
});

enlaceRegistro.addEventListener('click', () => {
  cajaRegistro.classList.remove('hide');
  cajaIngreso.classList.add('hide');
});