import { 
    validarRegistro,
    idUsuario,
    validarTodoRegistro,
    validarNombreUsuario,
    validarApellido,
    validarEmail,
    validarClave,
    compararClaves,
    checkboxTerminos
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
let usuarioRepetido = document.getElementById("usuario-repetido");

let botonRegistrarme = document.getElementById("registrarme");
let agregarAdmin = document.getElementById("agregar-admin");


botonRegistrarme.addEventListener("click", (e) => {
    crearUsuario(e);
});
agregarAdmin.addEventListener("click", () => {
    limpiarFormulario();
});


inputNombreUsuario.addEventListener("blur", () => {
    validarNombreUsuario(inputNombreUsuario);
});
inputApellidoUsuario.addEventListener("blur", () => {
    validarApellido(inputApellidoUsuario);
});
inputEmail.addEventListener("blur", () => {
    validarEmail(inputEmail,usuarioRepetido);
});
inputClave.addEventListener("blur", () => {
    validarClave(inputClave,inputRepetirClave);
});
inputRepetirClave.addEventListener("blur", () => {
    compararClaves(inputClave,inputRepetirClave);
});
aceptarTerminos.addEventListener("change", function() {
    checkboxTerminos(aceptarTerminos);
});


function crearUsuario(e) {
    e.preventDefault();

    let validacion = validarTodoRegistro(inputNombreUsuario,inputApellidoUsuario,inputEmail,inputClave,inputRepetirClave,aceptarTerminos,usuarioRepetido);

    if (validacion) {
                 
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
        
        if (window.location.href.includes("/admin")) {
            setTimeout(function() {
                location.reload();
            }, 1500);
        }

    } else {
        validarRegistro(inputNombreUsuario,inputApellidoUsuario,inputEmail,inputClave,inputRepetirClave,aceptarTerminos,usuarioRepetido);
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
                    <i class="fa-solid fa-trash-can custom-red ${elemento.id === 1 ? 'd-none' : sesion.email !== 'pepito@gmail.com' && elemento.rol !== 'usuario' ? 'd-none' : ''}" title="Borrar Usuario" onclick="borrarUsuario(${elemento.id})"></i>
                </td>
            </tr>`;
    });
}

window.borrarUsuario = function (idUsuario) {
    sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;
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
            
            setTimeout(function() {
                location.reload();
            }, 2000);
        }
    });
}

function limpiarFormulario() {
    formRegistro.reset();
    inputNombreUsuario.className = "form-control shadow";
    inputApellidoUsuario.className = "form-control shadow";
    inputEmail.className = "form-control shadow";
    inputClave.className = "form-control shadow";
    inputRepetirClave.className = "form-control shadow";
    aceptarTerminos.className = "form-check-input me-0";
    inputRepetirClave.setAttribute("disabled","");
}


// solo al administrador "Pepito" le muestra el botón para agregar administradores
if (window.location.href.includes("/admin")) {
    if (sesion.email === 'pepito@gmail.com') {
        agregarAdmin.classList.remove("d-none");
    } else {
        agregarAdmin.classList.add("d-none");
    }
}