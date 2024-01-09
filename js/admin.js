let mostrarCheckboxButton = document.querySelectorAll(".mostrar-checkboxButton");
let iconoEliminar = document.querySelectorAll(".icono-eliminar");
let checkboxUsuarios = document.querySelectorAll(".checkbox-usuarios");
let botonEliminarUsuario = document.querySelector(".boton-eliminar");

let mostrarCheckboxButtonProductos = document.querySelectorAll(".mostrar-checkboxButtonProductos");
let iconoEliminarEditar = document.querySelectorAll(".icono-eliminar-editar");
let checkboxProductos = document.querySelectorAll(".checkbox-productos");
let botonEliminarProducto = document.querySelector(".boton-eliminar-producto");


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
    removerElemento(mostrarCheckboxButtonProductos);
    agregarElemento(iconoEliminarEditar);
    botonEliminarProducto.classList.add("d-none");
}

function confirmarEliminarProductos() {
    

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