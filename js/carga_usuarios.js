import { 
    idUsuario,
    validarTodoRegistro,
    validarNombreUsuario,
    validarApellido,
    validarEmail,
    validarClave,
    compararClaves
} from "./validar_usuario.js";

import { 
    primeraMayuscula,
    rol
} from "./hellpers.js";


let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;
let cuerpoTablaUsuarios = document.getElementById("tabla-usuarios");

let formRegistro = document.getElementById("form-registro");
let inputNombreUsuario = document.getElementById("nombre-usuario");
let inputApellidoUsuario = document.getElementById("apellido-usuario");
let inputEmail = document.getElementById("email");
let inputClave = document.getElementById("clave");
let inputRepetirClave = document.getElementById("repetir-clave");
let aceptarTerminos = document.getElementById("aceptar-terminos");

let botonRegistrarme = document.getElementById("registrarme");
let botonCerrar = document.getElementById("boton-cerrar");


botonRegistrarme.addEventListener("click", (e) => {
    crearUsuario(e);
});
botonCerrar.addEventListener("click", () => {
    limpiarFormulario();
});


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
                 
        let usuario = {
            id: idUsuario(),
            nombre: primeraMayuscula(inputNombreUsuario),
            apellido: primeraMayuscula(inputApellidoUsuario),
            email: inputEmail.value,
            clave: inputClave.value,
            favoritos: [],
            rol: rol()
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
        
        if (window.location.href.includes("/admin.html")) {
            setTimeout(function() {
                location.reload();
            }, 1500);
        }

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

export function mostrarTablaUsuarios() {
    cuerpoTablaUsuarios.innerHTML = "";
    arrayUsuarios.forEach((elemento) => {
        cuerpoTablaUsuarios.innerHTML += `
            <tr>
                <td></td>
                <th scope="row">${elemento.id}</th>
                <td>${elemento.nombre}</td>
                <td>${elemento.apellido}</td>
                <td>${elemento.email}</td>
                <td>${elemento.rol}</td>
                <td>
                    <i class="fa-solid fa-trash-can custom-red" title="Borrar Usuario" onclick="borrarUsuario(${elemento.id})"></i>
                </td>
            </tr>`;
    });
}

window.borrarUsuario = function (idUsuario) {
    Swal.fire({        
        icon: "warning",
        iconColor: "#ffc107",
        title: "¿Estás seguro?",
        text: "¡La acción no se puede revertir!",
        showCancelButton: true,
        focusCancel: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#0d6efd",
        confirmButtonText: "Eliminar Usuario",
        cancelButtonText: "Volver"
    }).then((result) => {
        if (result.isConfirmed) {
            arrayUsuarios = arrayUsuarios.filter(
                (elemento) => elemento.id !== idUsuario
            );
            Swal.fire({
                icon: "success",
                text: "¡El usuario se eliminó correctamente!",
                showConfirmButton: false,
                timer: 2000
            });

            localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios));
            mostrarTablaUsuarios();
            
            let indiceUsuario = arrayUsuarios.findIndex(
                (elemento) => elemento.email === sesion.email
            );
            if (sesion !== undefined && indiceUsuario !== -1) {
                arrayUsuarios[indiceUsuario].favoritos = sesion.favoritos;
            
                sessionStorage.removeItem("sesion");
                window.location.replace("/index.html");
            } else {
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }
        }
    });
}

function limpiarFormulario() {
    formRegistro.reset();
    inputNombreUsuario.className = "form-control";
    inputApellidoUsuario.className = "form-control";
    inputEmail.className = "form-control";
    inputClave.className = "form-control";
    inputRepetirClave.className = "form-control";
}