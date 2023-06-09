/*signup*/

/*********************************************************CONSTANTES/VARIABLES*************************************************************/
let URLorigin = window.location.origin;
let UrlU = URLorigin + "/api/users";
let UrlCook = URLorigin + "/api/";
let Urlsignup = URLorigin + "/sessions/";
let SignUp = document.querySelector(".btnSignUp"), //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: REGISTRAR.
  Login = document.querySelector(".btnLogin"); //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: INGRESAR.
checkbox = document.querySelector(".form-check-input"); //OBTENIENDO DATOS DE LA ETIQUETA HTML CON EL ID: CHECK.
const user = document.querySelector(".signup__user"); //OBTENIENDO DATOS INGRESADOS EN EL INPUT USUARIO.
const password = document.querySelector(".signup__psw"); //OBTENIENDO DATOS INGRESADOS EN EL INPUT PASSWORD.
let label = document.querySelectorAll(".form-label"); //OBTENIENDO DATOS DE LAS ETIQUETAS HTML CON LAS CLASES:FORM-LABEL.

let form = document.querySelector("form"),
  ageInput = document.querySelector(".signup__age");

const inputFirstName = document.getElementById("first_name"),
  inputLastName = document.getElementById("last_name"),
  inputEmail = document.getElementById("email"),
  inputAge = document.getElementById("age"),
  inputPassword = document.getElementById("password");
  const btnViewPsw=document.getElementById("btnTogglePsw");

/*****************************************************************CLASES*************************************************************/
class NewCart {
  constructor() {
    this.products = [{ status: "sucess", payload: [] }];
  }
}

class NewUser {
  constructor() {
    this.first_name = inputFirstName.value;
    this.last_name = inputLastName.value;
    this.email = inputEmail.value;
    this.age = inputAge.value;
    this.password = inputPassword.value;
  }
}

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
    return;
  } else {
    if (valor === "localStorage") {
      //GUARDANDO VALORES EN LA LOCALSTORAGE.
      localStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); ///DESHABILITANDO EL BOTON REGISTRAR.
      ingreso.className = "ref-ingresar"; //ACTIVANDO EL BOTON INGRESAR.
      user.setAttribute("readonly", "true");
      password.setAttribute("readonly", "true");
      checkbox.setAttribute("disabled", "true");
    }
    if (valor === "sessionStorage") {
      //GUARDANDO VALORES EN LA SESSIONSTORAGE.
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      registro.setAttribute("disabled", "true"); //ACTIVANDO EL BOTON INGRESAR.
      user.setAttribute("readonly", "true");
      password.setAttribute("readonly", "true");
    }
  }
  return usuario; //RETORNANDO EL OBJETO CREADO.
}
//FUNCION QUE COMPROBARÁ LA CONTRASEÑA DE LOS USUARIOS REGISTRADOS.
function comprobar(valor) {
  password.value == valor
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
  user.value = existe.usuario; //INGRESANDO EL USUARIO RECORDADO EN EL INPUT AUTOMATICAMENTE.
  //checkbox.setAttribute("checked", "true");
  //checkbox.setAttribute("disabled", "true");
  Swal.fire({
    title: "Bienvenido de nuevo!",
    text: "Usuario Registrado: " + user.value,
    icon: "info",
    confirmButtonText: "Aceptar",
  });
  //registro.innerText = "NUEVO"; //CAMBIANDO VALOR DEL BOTON REGISTRAR PARA INGRESAR NUEVO USUARIO.
  ingreso.className = "ref-ingresar"; //ACTIVANDO BOTON INGRESAR.
}

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
  checkbox.checked ? comprobar(existe.password) : comprobar(existe2.password); //COMPROBANDO CONTRASEÑA DE USUARIO INGRESADO.
});*/

Login.addEventListener("click", async (e) => {
  e.preventDefault();
  window.location.href = "../login";
  //const userSet=await setDataCookie(data,cookSafe[0]);
  // console.log("USUARIO REGISTRADO CON EXITO: Usuario>"+userSet.user +" y Password>"+userSet.password);
});

async function startSession(data) {
  try {
    const ruta = Urlsignup + "session";
    console.log(ruta);
    let response = await fetch(Urlsignup + "session", {
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
      console.warn("Error en el cliente");
      return;
    } else if (response.status == 200) {
      return response.json();
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

async function getUser(params) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    let response = await fetch(`${UrlU}?${queryParams}`, {
      method: "GET",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
    });
    JSON.stringify;
    const data = await response.json();
    return data;
  } catch {
    console.log(Error);
  }
}

async function postUser(user) {
  try {
    let response = await fetch(UrlU, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      mode: "cors",
      body: JSON.stringify(user),
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

async function validateUser(user) {
  const existingUser = await getUser({ email: user.email });
  const inputMsj = [];
  let result = "Success";
  if (existingUser) {
    inputMsj.push(`The email ${existingUser.email} it already exists`);
    result = "Error";
  } else {
    inputMsj.push(`Email ${user.email} successfully registered`);
  }
  return [result, inputMsj];
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newUser = new NewUser();
  validateUser(newUser)
    .then((response) => {
      [result, inputMsj] = response;
      if (result == "Success") {
        postUser(newUser)
          .then(async (data) => {
            await setDataCookie({ user: data.email, timer: 15000 });
            setTimeout(() => {
              window.location.href = "../login";
            }, 1000),
              Swal.fire({
                position: "center",
                icon: "info",
                title: "Successful registration",
                text: inputMsj,
                showConfirmButton: false,
              });
          })
          .catch((error) => console.log("Error:" + error));
      } else if (result == "Error") {
        Swal.fire({
          text: inputMsj,
          icon: "error",
          confirmButtonText: "Accept",
        });
        inputEmail.value = "";
        inputEmail.focus();
      }
    })
    .catch((error) => console.log("Error:" + error));
});

async function age() {
  let listAge;
  for (let i = 18; i < 70; i++) {
    listAge += `<option value="${i}">${i}</option>`;
  }
  ageInput.innerHTML = `${listAge}`;
}

age();

btnViewPsw.addEventListener("click", function () {
  if (inputPassword.type === "password") {
    inputPassword.type = "text";
    btnViewPsw.innerHTML=`<i class="fa-regular fa-eye"></i>`
  } else {
    inputPassword.type = "password";
    btnViewPsw.innerHTML=`<i class="fa-regular fa-eye-slash"></i>`;
  }
});