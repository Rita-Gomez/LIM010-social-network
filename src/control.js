const validarPasswoard = (string) => {
  if(string.length < 6){
    return false
  } else {
    return true
  }
}

const validarEmail = (string) => {
  const expresion = /\w+@\w+\.+[a-z]/;
}

const validarNombre = () => {
  
}

const leerLocalStorage = (string) => {
  return localStorage.getItem(string) ? JSON.parse(localStorage.getItem(string)) : [];
}

const guardarLocalStorage = (string, arr) => {
  localStorage.setItem(string, JSON.stringify(arr));
}

/* Trabajar con arrays*/

const agregarElementoArray = (ele, arr) => {
 arr.push(ele)
 return arr;
}

const eliminarElementoArray = (arr, indice) => {
  
}

const editarElementosArray = (arr, indice) => {
  
}




leerLocalStorage('textos');
leerLocalStorage('usuarios');
leerLocalStorage('perros');
leerLocalStorage('imagenes');


const getTextos =()=>{
  return localStorage.getItem('textos') ? JSON.parse(localStorage.getItem('textos')) : [];
 };

