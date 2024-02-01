import {
    generarCodigo,
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
    mostrarOcultarFormulario,
    mostrarOcultarBotonForm,
} from "./hellpers.js";

import { mostrarTablaUsuarios } from "./carga_usuarios.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

let indexProducto;

let form = document.getElementById("form");
let inputCategorias = document.getElementById("categoria");
let inputNombre = document.getElementById("nombre");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputUrlImagen = document.getElementById("urlImagen");
let inputCodigo;
let inputId;
let precio;

let cuerpoTabla = document.getElementById("tabla");

let botonAgregar = document.querySelector(".custom-green-button");
let formularioAdmin = document.getElementById("formulario-admin");

let botonEditarProducto = document.querySelectorAll(".boton-editar-producto");
let botonGuardarEdicion = document.getElementById("boton-guardar-edicion");
let botonGuardarProducto = document.getElementById("boton-guardar-producto");


botonGuardarProducto.addEventListener("click", function (e) {
    crearProducto(e);
});
botonAgregar.addEventListener("click", () => {
    mostrarOcultarFormulario(formularioAdmin);
});
botonGuardarEdicion.addEventListener("click", function (e) {
    guardarCambios(e);
});

inputNombre.addEventListener("blur", () => {
    validarNombre(inputNombre);
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
    validarDescripcion(inputDescripcion) &&
    validarPrecio(inputPrecio) &&
    validarUrlImagen(inputUrlImagen)
    ) {
        precio = formatoPrecio(inputPrecio);
        inputCodigo = generarCodigo(inputNombre,arrayProductos);
        (arrayProductos.length > 0) ? inputId = arrayProductos[arrayProductos.length - 1].id + 1 : inputId = 1;

        const producto = {
            id: inputId,
            codigo: inputCodigo,
            categoria: inputCategorias.value,
            nombre: inputNombre.value, 
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

        limpiarFormulario(form,inputCategorias,inputNombre,inputDescripcion,inputPrecio,inputUrlImagen);
        mostrarOcultarFormulario(formularioAdmin);
        mostrarTablaProductos();
    } else {
        Swal.fire({
            icon: "error",
            title: "No se guardó el producto",
            text: "Verifique los campos y vuelva a intentarlo",
            showConfirmButton: false,
            timer: 2500
        });
    }
} 

function mostrarTablaProductos() {
    cuerpoTabla.innerHTML = "";
    arrayProductos.forEach((elemento) => {
        cuerpoTabla.innerHTML += ` 
            <tr>
                <th scope="row">${elemento.codigo}</th>
                <td>${elemento.categoria}</td>
                <td>${elemento.nombre}</td>
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
    indexProducto = arrayProductos.findIndex(
        function (elemento) {
        return elemento.id === idProduct;
    }
    );     
    
    inputCategorias.value = arrayProductos[indexProducto].categoria;
    inputNombre.value = arrayProductos[indexProducto].nombre;
    inputDescripcion.value = arrayProductos[indexProducto].descripcion;
    inputPrecio.value = arrayProductos[indexProducto].precio;
    inputUrlImagen.value = arrayProductos[indexProducto].urlImagen;
    
    mostrarOcultarFormulario(formularioAdmin);
    mostrarOcultarBotonForm(botonEditarProducto);
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
            arrayProductos[indexProducto].descripcion = inputDescripcion.value, 
            arrayProductos[indexProducto].precio = precio, 
            arrayProductos[indexProducto].urlImagen = inputUrlImagen.value   

            Swal.fire({
                icon: "success",
                text: "¡Cambios guardados correctamente!",
                showConfirmButton: false,
                timer: 2000
            });

            limpiarFormulario(form,inputCategorias,inputNombre,inputDescripcion,inputPrecio,inputUrlImagen);
            mostrarOcultarFormulario(formularioAdmin);
            mostrarOcultarBotonForm(botonEditarProducto);
            guardarLocalStorage(arrayProductos);
            mostrarTablaProductos();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudieron guardar los cambios :(",
                footer: '<p>¡Verifique que haya ingresado bien todos los campos!</p>',
                showConfirmButton: false,
                timer: 4000
            });
        }
}

window.borrarProducto = function (idProducto) {
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

            limpiarFormulario(form,inputCategorias,inputNombre,inputDescripcion,inputPrecio,inputUrlImagen);
            guardarLocalStorage(arrayProductos);
            mostrarTablaProductos();
        }
    });
}