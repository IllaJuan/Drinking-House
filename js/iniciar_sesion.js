import { 
    verificarInput,
    validarUsuario
} from "./validar_usuario.js";

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let sesion = JSON.parse(sessionStorage.getItem("sesion")) || [];

let botonIniciarSesion = document.getElementById("inicio-sesion");
let emailIngresado = document.getElementById("email-ingresado");
let claveIngresada = document.getElementById("clave-ingresada"); 


botonIniciarSesion.addEventListener("click", (e) => {
    inicio_sesion(e);
});

emailIngresado.addEventListener("blur", () => {
    verificarInput(emailIngresado);
});
claveIngresada.addEventListener("blur", () => {
    verificarInput(claveIngresada);
});

function inicio_sesion(e) {
    e.preventDefault();
    let indiceUsuario;

    if (validarUsuario(emailIngresado,claveIngresada)) {

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

        window.location.replace("/index.html");
    } else {
        Swal.fire({
            icon: "error",
            title: "Acceso inválido",
            text: "Verifique los campos y vuelva a intentarlo",
            showConfirmButton: false,
            timer: 3000
        });
    }
}