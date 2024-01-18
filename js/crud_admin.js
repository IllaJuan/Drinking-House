import {
    generarCodigo,
    validarDescripcion,
    validarNombre,
    validarPrecio,
    validarUrlImagen,
} from "./validacion_producto.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

let indexProducto;

let inputCategorias = document.getElementById("categoria");
let inputNombre = document.getElementById("nombre");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputUrlImagen = document.getElementById("urlImagen");
let inputCodigo;

let cuerpoTabla = document.getElementById("tabla");

let botonAgregar = document.querySelector(".custom-green-button");
let formularioAdmin = document.getElementById("formulario-admin");

let botonEditarProducto = document.querySelectorAll(".botonEditarProducto");
let botonGuardarEdicion = document.getElementById("botonGuardarEdicion");
let botonGuardarProducto = document.getElementById("botonGuardarProducto");


botonGuardarProducto.addEventListener("click", () => {
    crearProducto();
});
botonAgregar.addEventListener("click", () => {
    mostrarFormulario();
});
botonGuardarEdicion.addEventListener("click", () => {
    guardarCambios();
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

function crearProducto() {
    if (
    validarNombre(inputNombre) &&
    validarDescripcion(inputDescripcion) &&
    validarPrecio(inputPrecio) &&
    validarUrlImagen(inputUrlImagen)
    ) {
        inputCodigo = generarCodigo(inputNombre,arrayProductos);

        const producto = {
            check: false,
            id: arrayProductos.length + 1,
            codigo: inputCodigo,
            categoria: inputCategorias.value,
            nombre: inputNombre.value, 
            descripcion: inputDescripcion.value, 
            precio: inputPrecio.value, 
            urlImagen: inputUrlImagen.value
        };

        arrayProductos.push(producto);

        localStorage.setItem("productos", JSON.stringify(arrayProductos));
        localStorage.getItem("productos");   // <=== no es necesario

        mostrarTablaProductos();
        // mostrarCardsProductos();
    } else {
        // MODAL advirtiendo que hay un error y que no se ha podido crear el producto
    }
} 


function mostrarTablaProductos() {
    arrayProductos.map((elemento) => {
        let fila = document.createElement("tr");
        let columnas = ` 
                        <th scope="row">${elemento.codigo}</th>
                        <td>${elemento.categoria}</td>
                        <td>${elemento.nombre}</td>
                        <td>${elemento.descripcion}</td>
                        <td>$${elemento.precio}</td>
                        <td><a href="${elemento.urlImagen}" target="_blank" title="Ver Imagen">${elemento.urlImagen}</a></td>
                        <td>
                            <i class="fa-solid fa-pen me-3 custom-blue" title="Editar Producto" onclick="editarInfoProducto(${elemento.id})"></i>
                            <a href="" title="Borrar Producto" onclick="borrarProducto(${elemento.id})"><i class="fa-solid fa-trash-can custom-red"></i></a>
                        </td>`;
        fila.innerHTML = columnas;
        cuerpoTabla.append(fila);
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
    
    mostrarFormulario();
    botonEditarProducto.forEach(elemento => {
        elemento.classList.toggle("d-none")
    });
}
function mostrarFormulario() {
    formularioAdmin.classList.remove("d-none");
}
window.guardarCambios = function () {
    if (
        validarNombre(inputNombre) &&
        validarDescripcion(inputDescripcion) &&
        validarPrecio(inputPrecio) &&
        validarUrlImagen(inputUrlImagen)
        ) {
            arrayProductos[indexProducto].categoria = inputCategorias.value,
            arrayProductos[indexProducto].nombre = inputNombre.value, 
            arrayProductos[indexProducto].descripcion = inputDescripcion.value, 
            arrayProductos[indexProducto].precio = inputPrecio.value, 
            arrayProductos[indexProducto].urlImagen = inputUrlImagen.value   

            guardarLocalStorage();
            mostrarTablaProductos();
        } else {
            alert("No se editó el elemento")     // <==== BORRAR
            // MODAL DE ERROR AL EDITAR PRODUCTO
        }
}


window.borrarProducto = function (idProducto) {
    // MODAL PREGUNTANDO SI ESTÁ SEGURO DE ELIMINAR EL PRODUCTO DE LA TABLA
    arrayProductos = arrayProductos.filter(
        (elemento) => elemento.id !== idProducto
    );

    guardarLocalStorage();
    mostrarTablaProductos();
}

function guardarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}