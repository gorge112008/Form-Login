/* ALGORITMO DE SIMULACIÓN DE VENTAS DE COMIDA RÁPIDA:LOGIN */

/* DEFINIENDO VARIABLES Y CONSTANTES: */
let registro = document.querySelector(".btnSignUp"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: REGISTRAR.
  ingreso = document.querySelector(".btnLogin"); //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: INGRESAR.
  //checkbox = document.querySelector(".form-check-input"); //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: CHECK.
const user = document.querySelector("#usuario"); //OBTENIENDO DATOS INGRESADOS EN EL INPUT USUARIO.
const password = document.querySelector("#password"); //OBTENIENDO DATOS INGRESADOS EN EL INPUT PASSWORD.
let label = document.querySelectorAll(".form-label"); //OBTENIENDO DATOS DE LAS ETIQUETAS HTML CON LAS CLASES:FORM-LABEL.

//FUNCIÓN QUE REGISTRARÁ Y GUARDARÁ LOS VALORES INGRESADOS EN LOS IMPUTS.
function guardar(valor) {
  let usuario = { usuario: user.value, password: password.value }; //CONSTRUYENDO UN OBJETO CON LOS VALORES INGRESADOS.
  if (usuario.usuario == "" || usuario.password == "") {
    //SI LOS CAMPOS ESTAN VACIOS SE ACTIVA UN INDICADOR Y RETORNA
    Swal.fire({
      //INDICANDO FINALIZACIÓN DEL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      title: "Campos Vacios!",
      text: "Por favor, todos los campos son requeridos",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
    user.classList.add("form-input");
    password.classList.add("form-input");
    return;
  } else {
    if (valor === "localStorage") {
      //GUARDANDO VALORES EN LA LOCALSTORAGE.
      localStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); ///DESHABILITANDO EL BOTON REGISTRAR.
      ingreso.className = "ref-ingresar"; //ACTIVANDO EL BOTON INGRESAR.
      user.setAttribute("readonly", "true");
      password.setAttribute("readonly", "true");
      //checkbox.setAttribute("disabled", "true");
    }
    if (valor === "sessionStorage") {
      //GUARDANDO VALORES EN LA SESSIONSTORAGE.
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); //ACTIVANDO EL BOTON INGRESAR.
      ingreso.className = "ref-ingresar"; //ACTIVANDO EL BOTON INGRESAR.
      user.setAttribute("readonly", "true");
      password.setAttribute("readonly", "true");
    }
  }
  return usuario; //RETORNANDO EL OBJETO CREADO.
}
//FUNCION QUE COMPROBARÁ LA CONTRASEÑA DE LOS USUARIOS REGISTRADOS.
function comprobar(valor) {
  password.value == valor
    ? (window.location.href = "index.html")
    : Swal.fire({
        //COMPROBANDO CONTRASEÑA DE USUARIO.
        //INDICANDO CONTRASEÑA INCORRECTA MEDIANTE LIBRERIA SWEETALERT2.
        title: "Contraseña incorrecta!",
        text: "Por favor, ingrese su contraseña correcta o haga un nuevo registro",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
}

//COMPROBANDO EXISTENCIA DE USUARIOS DENTRO DE LA LOCALSTORAGE.
const existe = JSON.parse(localStorage.getItem("usuario"));
if (existe != null) {
  user.value = existe.usuario; //INGRESANDO EL USUARIO RECORDADO EN EL INPUT AUTOMATICAMENTE.
  //checkbox.setAttribute("checked", "true");
  //checkbox.setAttribute("disabled", "true");
  Swal.fire({
    title: "Bienvenido de nuevo!",
    text: "Usuario Registrado: " + user.value,
    icon: "info",
    confirmButtonText: "Aceptar",
  });
  registro.innerText = "NUEVO"; //CAMBIANDO VALOR DEL BOTON REGISTRAR PARA INGRESAR NUEVO USUARIO.
  ingreso.className = "ref-ingresar"; //ACTIVANDO BOTON INGRESAR.
}

//REGISTRANDO A UN NUEVO USUARIO
registro.addEventListener("click", (event) => {
  if (registro.innerText == "REGISTRAR") {
    event.preventDefault();
    //checkbox.checked ? guardar("localStorage") : guardar("sessionStorage"); //REGISTRANDO NUEVO USUARIO.
  } else if (registro.innerText == "NUEVO") {
    localStorage.removeItem("usuario"); //ELIMINANDO USUARIO ALMACENADO EN LA LOCALSTORAGE.
  }
});

//INGRESANDO A LA APLICACIÓN
ingreso.addEventListener("click", (event) => {
  event.preventDefault();
  const existe = JSON.parse(localStorage.getItem("usuario")); //OBTENIENDO USUARIO DENTRO DE LA LOCALSTORE.
  const existe2 = JSON.parse(sessionStorage.getItem("usuario")); //OBTENIENDO USUARIO DENTRO DE LA SESSIONSTORE.
 // checkbox.checked ? comprobar(existe.password) : comprobar(existe2.password); //COMPROBANDO CONTRASEÑA DE USUARIO INGRESADO.
});
document.addEventListener('DOMContentLoaded', function() {
  M.AutoInit();
});