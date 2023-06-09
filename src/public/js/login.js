/*LOGIN*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/

let URLorigin = window.location.origin;
let UrlCook = URLorigin + "/api/";
let UrlLogin = URLorigin + "/sessions/";
let SignUp = document.querySelector(".btnSignUp"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: REGISTRAR.
  Login = document.querySelector(".btnLogin"); //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: INGRESAR.
//OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: CHECK.
const form = document.querySelector("form"),
  inputUser = document.getElementById("user"), //OBTENIENDO DATOS INGRESADOS EN EL INPUT USUARIO.
  inputPassword = document.getElementById("password"),
  userCheckbox = document.getElementById("userCheck"),
  rememberCheckbox = document.getElementById("loginCheck"); //OBTENIENDO DATOS INGRESADOS EN EL INPUT PASSWORD.
let label = document.querySelectorAll(".form-label"); //OBTENIENDO DATOS DE LAS ETIQUETAS HTML CON LAS CLASES:FORM-LABEL.
const btnViewPsw=document.getElementById("btnTogglePsw");

//the username or password you entered is incorrect.
/*//FUNCIÓN QUE REGISTRARÁ Y GUARDARÁ LOS VALORES INGRESADOS EN LOS IMPUTS.
function guardar(valor) {
  let usuario = { usuario: inputUser.value, inputPassword: inputPassword.value }; //CONSTRUYENDO UN OBJETO CON LOS VALORES INGRESADOS.
  if (usuario.usuario == "" || usuario.inputPassword == "") {
    //SI LOS CAMPOS ESTAN VACIOS SE ACTIVA UN INDICADOR Y RETORNA
    Swal.fire({
      //INDICANDO FINALIZACIÓN DEL PEDIDO MEDIANTE LIBRERIA SWEETALERT2.
      title: "Campos Vacios!",
      text: "Por favor, todos los campos son requeridos",
      icon: "warning",
      confirmButtonText: "Aceptar",
    });
    return;
  } else {
    if (valor === "localStorage") {
      //GUARDANDO VALORES EN LA LOCALSTORAGE.
      localStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); ///DESHABILITANDO EL BOTON REGISTRAR.
      ingreso.className = "ref-ingresar"; //ACTIVANDO EL BOTON INGRESAR.
      inputUser.setAttribute("readonly", "true");
      inputPassword.setAttribute("readonly", "true");
      checkbox.setAttribute("disabled", "true");
    }
    if (valor === "sessionStorage") {
      //GUARDANDO VALORES EN LA SESSIONSTORAGE.
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); //ACTIVANDO EL BOTON INGRESAR.
      inputUser.setAttribute("readonly", "true");
      inputPassword.setAttribute("readonly", "true");
    }
  }
  return usuario; //RETORNANDO EL OBJETO CREADO.
}
//FUNCION QUE COMPROBARÁ LA CONTRASEÑA DE LOS USUARIOS REGISTRADOS.
function comprobar(valor) {
  inputPassword.value == valor
    ? (window.location.href = "/")
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
  inputUser.value = existe.usuario; //INGRESANDO EL USUARIO RECORDADO EN EL INPUT AUTOMATICAMENTE.
  //checkbox.setAttribute("checked", "true");
  //checkbox.setAttribute("disabled", "true");
  Swal.fire({
    title: "Bienvenido de nuevo!",
    text: "Usuario Registrado: " + inputUser.value,
    icon: "info",
    confirmButtonText: "Aceptar",
  });
  //registro.innerText = "NUEVO"; //CAMBIANDO VALOR DEL BOTON REGISTRAR PARA INGRESAR NUEVO USUARIO.
  ingreso.className = "ref-ingresar"; //ACTIVANDO BOTON INGRESAR.
}*/

//REGISTRANDO A UN NUEVO USUARIO
/*registro.addEventListener("click", (e) => {
  if (registro.innerText == "REGISTER") {
    e.preventDefault();
    checkbox.checked ? guardar("localStorage") : guardar("sessionStorage"); //REGISTRANDO NUEVO USUARIO.
  } else if (registro.innerText == "NUEVO") {
    localStorage.removeItem("usuario"); //ELIMINANDO USUARIO ALMACENADO EN LA LOCALSTORAGE.
  }
});*/

//INGRESANDO A LA APLICACIÓN
/*ingreso.addEventListener("click", (event) => {
  event.preventDefault();
  const existe = JSON.parse(localStorage.getItem("usuario")); //OBTENIENDO USUARIO DENTRO DE LA LOCALSTORE.
  const existe2 = JSON.parse(sessionStorage.getItem("usuario")); //OBTENIENDO USUARIO DENTRO DE LA SESSIONSTORE.
  checkbox.checked ? comprobar(existe.inputPassword) : comprobar(existe2.inputPassword); //COMPROBANDO CONTRASEÑA DE USUARIO INGRESADO.
});*/

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    User: inputUser.value,
    Password: inputPassword.value,
  };
  const { status, msj } = await startSession(data);
  if (status == 200) {
    rememberCheckbox.checked
      ? setDataCookie({ user: data.email, timer: Infinity })
      : delDataCookie({ name: "UserCookie" });
    setTimeout(() => {
      window.location.href = "../";
    }, 2000),
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Successful Login",
        text: msj.success,
        showConfirmButton: false,
      });
  } else if (status == 400) {
    Swal.fire({
      title: msj.error,
      text: "The username or password you entered is incorrect",
      icon: "error",
      showDenyButton: true,
      confirmButtonText: "Try again",
      denyButtonText: "Sign up",
    }).then((result) => {
      if (result.isConfirmed) {
        userCheckbox.setAttribute("checked", "true");
        form.reset();
        inputUser.value=data.User;
        inputUser.focus();
      } else if (result.isDenied) {
        window.location.href = "../signup";
      }
    });

    userCheckbox.setAttribute("checked", "true");
    form.reset();
    inputUser.focus();
  }
});

SignUp.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../signup";
});

async function startSession(data) {
  try {
    let response = await fetch(UrlLogin + "session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
    if (response.status == 400) {
      const Err = await response.json();
      console.warn(Err.error);
      return { status: 400, msj: Err };
    } else if (response.status == 200) {
      const data = await response.json();
      return { status: 200, msj: data };
    }
  } catch {
    console.log(Error);
  }
}

async function setDataCookie(data) {
  try {
    fetch(UrlCook + "setUserCookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
  } catch {
    console.log(Error);
  }
}

async function getDataCookie() {
  try {
    let response = await fetch(UrlCook + "getUserCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    if (response.status == 400) {
      console.warn("Error en el cliente");
      return;
    } else if (response.status == 200) {
      return response.json();
    }
  } catch {
    console.log(Error);
  }
}

async function delDataCookie(data) {
  try {
    await fetch(UrlCook + "delUserCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(data),
    });
  } catch {
    console.log(Error);
  }
}

async function VerificateCookie() {
  const cookie = await getDataCookie();
  const email = cookie.email.toString();
  if (email != "") {
    inputUser.value = email;
    userCheckbox.setAttribute("checked", "true");
    rememberCheckbox.setAttribute("checked", "true");
    inputPassword.focus();
  }
}

VerificateCookie();

btnViewPsw.addEventListener("click", function () {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    btnViewPsw.innerHTML=`<i class="fa-regular fa-eye"></i>`
  } else {
    inputPassword.type = "password";
    btnViewPsw.innerHTML=`<i class="fa-regular fa-eye-slash"></i>`;
  }
});