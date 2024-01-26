import { 
    validarTodoRegistro,
    validarNombreUsuario,
    validarApellido,
    validarEmail,
    validarClave,
    compararClaves
} from "./validar_usuario.js";

import { primeraMayuscula } from "./hellpers.js";

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let formRegistro = document.getElementById("form-registro");
let inputNombreUsuario = document.getElementById("nombre-usuario");
let inputApellidoUsuario = document.getElementById("apellido-usuario");
let inputEmail = document.getElementById("email");
let inputClave = document.getElementById("clave");
let inputRepetirClave = document.getElementById("repetir-clave");
let aceptarTerminos = document.getElementById("aceptar-terminos");
let idUsuario;

let botonRegistrarme = document.getElementById("registrarme");
let botonCerrar = document.getElementById("boton-cerrar");
let botonIniciarSesion = document.getElementById("inicio-sesion");


botonRegistrarme.addEventListener("click", (e) => {
    crearUsuario(e);
});
botonCerrar.addEventListener("click", () => {
    limpiarFormulario();
});
// botonIniciarSesion.addEventListener("click", () => {
//     inicioSesion();
// });

inputNombreUsuario.addEventListener("blur", () => {
    validarNombreUsuario(inputNombreUsuario);
});
inputApellidoUsuario.addEventListener("blur", () => {
    validarApellido(inputApellidoUsuario);
});
inputEmail.addEventListener("blur", () => {
    validarEmail(inputEmail);
});
inputClave.addEventListener("blur", () => {
    validarClave(inputClave);
});
inputRepetirClave.addEventListener("blur", () => {
    compararClaves(clave,inputRepetirClave);
});


function crearUsuario(e) {
    e.preventDefault();

    let validacion = validarTodoRegistro(inputNombreUsuario,inputApellidoUsuario,inputEmail,inputClave,inputRepetirClave,aceptarTerminos);

    if (validacion && validacion !== 2) {
        (arrayUsuarios.length > 0) ? idUsuario = arrayUsuarios[arrayUsuarios.length - 1].id + 1 : idUsuario = 1;
         
        let usuario = {
            id: idUsuario,
            nombre: primeraMayuscula(inputNombreUsuario),
            apellido: primeraMayuscula(inputApellidoUsuario),
            email: inputEmail.value,
            clave: inputClave.value,
            rol: "usuario"
        }

        arrayUsuarios.push(usuario);

        localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios));
        localStorage.getItem("usuarios");

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Se ha registrado correctamente",
            showConfirmButton: false,
            timer: 1500
        });

        limpiarFormulario();

    } else if (validacion === 2) {
        Swal.fire({
            icon: "error",
            text: "Ya existe un usuario con este correo electrónico",
            showConfirmButton: false,
            timer: 4000
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "No se registró el usuario",
            text: "Verifique los campos y vuelva a intentarlo",
            showConfirmButton: false,
            timer: 3000
        });
    }
}

function inicioSesion() {
    
}

function limpiarFormulario() {
    formRegistro.reset();
    inputNombreUsuario.className = "form-control";
    inputApellidoUsuario.className = "form-control";
    inputEmail.className = "form-control";
    inputClave.className = "form-control";
    inputRepetirClave.className = "form-control";
}