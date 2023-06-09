let sesioninterval = 0;
let sesint = setInterval(() => {
    //CREANDO INTERVALO PARA CERRAR SESION POR INACTIVIDAD
    sesioninterval++; //VARIABLE QUE CONTARÁ LOS INTERVALOS CON UN VALOR INDICADO, EN ESTE CASO SE ESTABLECIO CADA INTERVALO EN 60000 (1 MINUTO)
    if (sesioninterval == 1) {
      //INDICANDO LA CANTIDAD DE INTERVALOS QUE DURARÁ LA SESION EN 5, CON EL VALOR ESTABLECIDO SERÁN 5 MINUTOS DE INACTIVIDAD.
      clearInterval(sesint); //SI SE CIERRA LA SESION SE LIMPIA EL INTERVALO DE INACTIVIDAD
      setTimeout(() => {
        window.location.href = "../login"; //SI SE ACTIVA LA INACTIVIDAD SE CIERRA LA SESIÓN Y SE RETORNA A LA PÁGINA DE INGRESO.
      }, 1000),
        Swal.fire({
          //MOSTRANDO MENSAJE DE INACTIVIDAD MEDIANTE LA LIBRERIA SWEETALERT2.
          position: "center",
          icon: "info",
          title:
            "Redirigiendo al Login...",
          showConfirmButton: false,
        });
    }
  }, 1000); //TIEMPO ESTABLECIDO PARA CADA INTERVALO.
  