import { verificarRol } from "./hellpers.js";

let sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;
let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let ocultarAdministracion = document.getElementById("ocultar-admin");
let botonCerrarSesion = document.getElementById("ocultar-boton");
let ocultarInicioSesion = document.getElementById("ocultar-inicio-sesion");
let cerrarSesion = document.getElementById("cerrar-sesion");
let indiceUsuario;

cerrarSesion.addEventListener("click", () => {
    eliminarSesion();
});

function eliminarSesion() {

    indiceUsuario = arrayUsuarios.findIndex(
        (elemento) => elemento.email === sesion.email
    );

    arrayUsuarios[indiceUsuario].favoritos = sesion.favoritos;

    sessionStorage.removeItem("sesion");
    window.location.replace("/index.html");
}

if (sesion !== undefined) {
    if (verificarRol(sesion)) {
        ocultarAdministracion.classList.remove("d-none");
    }
    botonCerrarSesion.classList.remove("d-none");
} else {
    if (!(ocultarAdministracion.classList.contains("d-none"))) {
        ocultarAdministracion.classList.add("d-none");
        botonCerrarSesion.classList.add("d-none");
    } else if (!(botonCerrarSesion.classList.contains("d-none"))) {
        botonCerrarSesion.classList.add("d-none");
    }
    ocultarInicioSesion.classList.remove("d-none");
}