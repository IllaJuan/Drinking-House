import { 
    verificarClaveInicioSesion,
    validarUsuario,
    recuperarClave,
    validarInicioSesion,
    validarEmailInicioSesion
} from "./validar_usuario.js";

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let sesion = JSON.parse(sessionStorage.getItem("sesion")) || [];

let botonIniciarSesion = document.getElementById("inicio-sesion");
let enviarRecuperacion = document.getElementById("enviar-recuperacion");
let emailIngresado = document.getElementById("email-ingresado");
let claveIngresada = document.getElementById("clave-ingresada"); 
let inputCorreoRecuperacion = document.getElementById("inputCorreoRecuperacion");
let modalForm = document.getElementById("modalForm");
let botonModalRecuperarClave = document.getElementById("botonModalRecuperarClave");
let emailInicioSesion = document.getElementById("email-inicio-sesion");


botonIniciarSesion.addEventListener("click", (e) => {
    inicio_sesion(e);
});
enviarRecuperacion.addEventListener("click", (e) => {
    recuperarCuenta(e);
});
botonModalRecuperarClave.addEventListener("click", () => {
    limpiarInput();
});

emailIngresado.addEventListener("blur", () => {
    validarEmailInicioSesion(emailIngresado,emailInicioSesion);
});
claveIngresada.addEventListener("blur", () => {
    verificarClaveInicioSesion(claveIngresada);
});

inputCorreoRecuperacion.addEventListener("blur", () => {
    recuperarClave(inputCorreoRecuperacion);
});

function inicio_sesion(e) {
    e.preventDefault();
    let indiceUsuario;

    if (verificarClaveInicioSesion(claveIngresada) && validarUsuario(emailIngresado,claveIngresada)) {

        indiceUsuario = arrayUsuarios.findIndex(
            (elemento) => elemento.email === emailIngresado.value
        );
        
        sesion = {
            email: arrayUsuarios[indiceUsuario].email,
            clave: arrayUsuarios[indiceUsuario].clave,
            favoritos: arrayUsuarios[indiceUsuario].favoritos || [],
            rol: arrayUsuarios[indiceUsuario].rol
        };
        
        sessionStorage.setItem("sesion", JSON.stringify(sesion));
        sessionStorage.getItem("sesion");
        sessionStorage.setItem("modal", "true");
        sessionStorage.getItem("modal");

        window.location.replace("/index.html");
    } else {
        if (verificarClaveInicioSesion(claveIngresada) && validarEmailInicioSesion(emailIngresado,emailInicioSesion)) {
            Swal.fire({
                icon: "error",
                title: "Usuario y/o contraseña incorrecta",
                text: "Por favor, verifique los campos y vuelva a intentarlo",
                showConfirmButton: false,
                timer: 3000
            });
        } else {
            validarInicioSesion(emailIngresado,emailInicioSesion,claveIngresada);
        }
    }
}

function recuperarCuenta(e) {
    e.preventDefault();

    if (recuperarClave(inputCorreoRecuperacion)) {
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha enviado un código de recuperación a su correo",
            showConfirmButton: false,
            timer: 2300
        });
        setTimeout(function() {
            location.reload();
        }, 2300);
    } 
}

function limpiarInput() {
    modalForm.reset();
    inputCorreoRecuperacion.className = "form-control";
}