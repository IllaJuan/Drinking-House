import { 
    validarNombreUsuario,
    validarEmail,
    validarClave
} from "./validar_usuario";


let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let inputNombreUsuario = document.getElementById("nombre-usuario");
let inputEmail = document.getElementById("email");
let inputClave = document.getElementById("clave");
let idUsuario;

let botonSuscribir = document.getElementById("suscribirse");
let botonIniciarSesion = document.getElementById("inicio-sesion");


botonSuscribir.addEventListener("click", () => {
    crearUsuario();
});
botonIniciarSesion.addEventListener("click", () => {
    inicioSesion();
});


function crearUsuario() {
    if (
        validarEmail(inputEmail,arrayUsuarios) &&
        validarEmail(inputEmail,arrayUsuarios) !== 1 &&
        validarClave(inputClave) &&
        validarNombreUsuario(inputNombreUsuario)
        ) {
        (arrayUsuarios.length > 0) ? idUsuario = arrayUsuarios[arrayUsuarios.length - 1].id + 1 : idUsuario = 1;
         
        let usuario = {
            id: idUsuario,
            nombre: inputNombreUsuario.value,
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


    } else if (validarEmail(inputEmail) === 1) {
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
            timer: 4000
        });
    }
}

function inicioSesion() {
    
}