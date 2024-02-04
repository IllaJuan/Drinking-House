import {
    validarTodo,
    validarStock,
    validarCategoria,
    validarNombre,
    validarDescripcion,
    validarPrecio,
    validarUrlImagen,
    formatoPrecio
} from "./validar_producto.js";

import {
    guardarLocalStorage,
    limpiarFormulario,
    mostrarOcultarFormulario
} from "./hellpers.js";

import { mostrarTablaUsuarios } from "./carga_usuarios.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

let indexProducto;

let form = document.getElementById("form");
let inputCategorias = document.getElementById("categoria");
let inputNombre = document.getElementById("nombre");
let inputStock = document.getElementById("stock");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputUrlImagen = document.getElementById("urlImagen");
let inputId;
let precio;

let cuerpoTabla = document.getElementById("tabla");
let tituloFormulario = document.getElementById("titulo-formulario");

let botonAgregar = document.querySelector(".custom-green-button");
let formularioAdmin = document.getElementById("formulario-admin");

let subir = document.getElementById("subir");
let botonEditar = document.querySelector(".boton-editar");
let botonGuardar = document.querySelector(".boton-guardar");
let botonCancelar = document.getElementById("boton-cancelar");
let botonGuardarEdicion = document.getElementById("boton-guardar-edicion");
let botonGuardarProducto = document.getElementById("boton-guardar-producto");


botonGuardarProducto.addEventListener("click", function (e) {
    crearProducto(e);
});
botonAgregar.addEventListener("click", () => {
    tituloFormulario.innerHTML = "Agregar Producto";
    botonGuardar.classList.remove("d-none");
    botonEditar.classList.add("d-none");
    limpiarFormulario(form,inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
    mostrarOcultarFormulario(formularioAdmin);
});
botonGuardarEdicion.addEventListener("click", function (e) {
    guardarCambios(e);
});
botonCancelar.addEventListener("click", () => {
    formularioAdmin.classList.add("d-none");
});

inputCategorias.addEventListener("blur", () => {
    validarCategoria(inputCategorias);
});
inputNombre.addEventListener("blur", () => {
    validarNombre(inputNombre);
});
inputStock.addEventListener("blur", () => {
    validarStock(inputStock);
});
inputDescripcion.addEventListener("blur", () => {
    validarDescripcion(inputDescripcion);
});
inputPrecio.addEventListener("blur", () => {
    validarPrecio(inputPrecio);
});
inputUrlImagen.addEventListener("blur", () => {
    validarUrlImagen(inputUrlImagen);
});


mostrarTablaProductos();
mostrarTablaUsuarios();

function crearProducto(e) {
    e.preventDefault();

    if (
    validarCategoria(inputCategorias) &&
    validarNombre(inputNombre) &&
    validarStock(inputStock) &&
    validarDescripcion(inputDescripcion) &&
    validarPrecio(inputPrecio) &&
    validarUrlImagen(inputUrlImagen)
    ) {
        precio = formatoPrecio(inputPrecio);
        (arrayProductos.length > 0) ? inputId = arrayProductos[arrayProductos.length - 1].id + 1 : inputId = 1;

        const producto = {
            id: inputId,
            categoria: inputCategorias.value,
            nombre: inputNombre.value, 
            stock: inputStock.value, 
            descripcion: inputDescripcion.value, 
            precio: precio, 
            urlImagen: inputUrlImagen.value
        };

        arrayProductos.push(producto);

        localStorage.setItem("productos", JSON.stringify(arrayProductos));
        localStorage.getItem("productos"); 

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto guardado correctamente",
            showConfirmButton: false,
            timer: 1500
        });

        limpiarFormulario(form,inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
        mostrarOcultarFormulario(formularioAdmin);
        mostrarTablaProductos();
        window.scrollTo(0, 0);
    } else {
        validarTodo(inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
    }
} 

function mostrarTablaProductos() {
    cuerpoTabla.innerHTML = "";
    arrayProductos.forEach((elemento) => {
        cuerpoTabla.innerHTML += ` 
            <tr>
                <th scope="row">${elemento.id}</th>
                <td>${elemento.categoria}</td>
                <td>${elemento.nombre}</td>
                <td>${elemento.stock}</td>
                <td>${elemento.descripcion}</td>
                <td>$${elemento.precio}</td>
                <td><a href="${elemento.urlImagen}" target="_blank" title="Ver Imagen">${elemento.urlImagen}</a></td>
                <td>
                    <i class="fa-solid fa-pen me-3 custom-blue" title="Editar Producto" onclick="editarInfoProducto(${elemento.id})"></i>
                    <i class="fa-solid fa-trash-can custom-red" title="Borrar Producto" onclick="borrarProducto(${elemento.id})"></i>
                </td>
            </tr>`;
    });
}

window.editarInfoProducto = function (idProduct) {
    limpiarFormulario(form,inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
    tituloFormulario.innerHTML = "Editar Producto";
    botonGuardar.classList.add("d-none");
    botonEditar.classList.remove("d-none");

    indexProducto = arrayProductos.findIndex(
        function (elemento) {
        return elemento.id === idProduct;
    });     
    
    inputCategorias.value = arrayProductos[indexProducto].categoria;
    inputNombre.value = arrayProductos[indexProducto].nombre;
    inputStock.value = arrayProductos[indexProducto].stock;
    inputDescripcion.value = arrayProductos[indexProducto].descripcion;
    inputPrecio.value = arrayProductos[indexProducto].precio;
    inputUrlImagen.value = arrayProductos[indexProducto].urlImagen;
    
    formularioAdmin.classList.remove("d-none");
    subir.scrollIntoView({ behavior: "smooth" });
}
window.guardarCambios = function (e) {
    e.preventDefault();

    if (
        validarCategoria(inputCategorias) &&
        validarNombre(inputNombre) &&
        validarDescripcion(inputDescripcion) &&
        validarPrecio(inputPrecio) &&
        validarUrlImagen(inputUrlImagen)
        ) {
            precio = formatoPrecio(inputPrecio);

            arrayProductos[indexProducto].categoria = inputCategorias.value,
            arrayProductos[indexProducto].nombre = inputNombre.value, 
            arrayProductos[indexProducto].stock = inputStock.value, 
            arrayProductos[indexProducto].descripcion = inputDescripcion.value, 
            arrayProductos[indexProducto].precio = precio, 
            arrayProductos[indexProducto].urlImagen = inputUrlImagen.value   

            Swal.fire({
                icon: "success",
                text: "¡Cambios guardados correctamente!",
                showConfirmButton: false,
                timer: 2000
            });

            limpiarFormulario(form,inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
            mostrarOcultarFormulario(formularioAdmin);
            guardarLocalStorage(arrayProductos);
            mostrarTablaProductos();
            window.scrollTo(0, 0);
    } else {
        validarTodo(inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
    }
}

window.borrarProducto = function (idProducto) {
    formularioAdmin.classList.add("d-none");
    Swal.fire({        
        icon: "warning",
        iconColor: "#ffc107",
        title: "¿Estás seguro?",
        text: "¡La acción no se puede revertir!",
        showCancelButton: true,
        focusCancel: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#0d6efd",
        confirmButtonText: "Borrar producto",
        cancelButtonText: "Volver"
    }).then((result) => {
        if (result.isConfirmed) {
            arrayProductos = arrayProductos.filter(
                (elemento) => elemento.id !== idProducto
            );
            Swal.fire({
                icon: "success",
                text: "¡El producto se eliminó correctamente!",
                showConfirmButton: false,
                timer: 2000
            });

            limpiarFormulario(form,inputCategorias,inputNombre,inputStock,inputDescripcion,inputPrecio,inputUrlImagen);
            guardarLocalStorage(arrayProductos);
            mostrarTablaProductos();
            window.scrollTo(0, 0);
        }
    });
}