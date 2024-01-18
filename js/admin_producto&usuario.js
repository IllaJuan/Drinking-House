// Variables para los usuarios
let mostrarCheckboxButton = document.querySelectorAll(".mostrar-checkboxButton");
let iconoEliminar = document.querySelectorAll(".icono-eliminar");
let checkboxUsuarios = document.querySelectorAll(".checkbox-usuarios");
let botonEliminarUsuario = document.querySelector(".boton-eliminar");

// Variables para los productos
let mostrarCheckboxButtonProductos = document.querySelectorAll(".mostrar-checkboxButtonProductos");
let iconoEliminarEditar = document.querySelectorAll(".icono-eliminar-editar");
let botonEliminarProducto = document.querySelector(".boton-eliminar-producto");


// let formularioAdmin = document.querySelector("#formulario-admin");

function removerElemento(array) {
    array.forEach(function(elemento) {
        elemento.classList.remove("d-none");
    });
}

function agregarElemento(array) {
    array.forEach(function(elemento) {
        elemento.classList.add("d-none");
    });
}


function eliminarProductos() {
    
}


function confirmarEliminarProductos() {
    productosParaBorrar = checkboxUsuarios.filter((elemento) =>
        elemento.checked === true
    );

    if (productosParaBorrar.length > 0) {
        productosParaBorrar.forEach(function(elemento) {
            localStorage.removeItem(elemento);
        });
    }

}

function atrasEliminarProductos() {
    agregarElemento(mostrarCheckboxButtonProductos);
    removerElemento(iconoEliminarEditar);
    botonEliminarProducto.classList.remove("d-none");

    checkboxProductos.forEach(function(elemento) {
        elemento.checked = false;
    });
}


function eliminarUsuarios() {
    removerElemento(mostrarCheckboxButton);
    agregarElemento(iconoEliminar);
    botonEliminarUsuario.classList.add("d-none");
}

function confirmarEliminarUsuarios() {
    

}

function atrasEliminarUsuarios() {
    agregarElemento(mostrarCheckboxButton);
    removerElemento(iconoEliminar);
    botonEliminarUsuario.classList.remove("d-none");

    checkboxUsuarios.forEach(function(elemento) {
        elemento.checked = false;
    });
}

// function mostrarFormulario() {
//     formularioAdmin.classList.remove("d-none");
// }

