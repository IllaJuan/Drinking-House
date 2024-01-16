import {
    generarCodigo,
    validarDescripcion,
    validarNombre,
    validarPrecio,
    validarUrlImagen,
    arrayProductos
} from "./validacion_producto.js";

let formulario = document.getElementById("formulario-productos");
let inputCategorias = document.getElementById("categoria");
let inputNombre = document.getElementById("nombre");
let inputDescripcion = document.getElementById("descripcion");
let inputPrecio = document.getElementById("precio");
let inputUrlImagen = document.getElementById("urlImagen");
let cuerpoTabla = document.querySelector("#tabla");
let inputCodigo;

formulario.addEventListener("submit",crearProducto);

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

mostrarTablaProductos()

function crearProducto() {
    if (
    validarNombre(inputNombre) &&
    validarDescripcion(inputDescripcion) &&
    validarPrecio(inputPrecio) &&
    validarUrlImagen(inputUrlImagen)
    ) {
        inputCodigo = generarCodigo(inputNombre);

        const producto = {
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
        // <=== MOSTRAR modal advirtiendo que hay un error y que no se ha podido crear el producto
    }
} 

function mostrarTablaProductos() {
    arrayProductos.map((elemento) => {
        let fila = document.createElement("tr");
        let columnas = `    
                        <td><input type="checkbox" class="mostrar-checkboxButtonProductos checkbox-productos d-none mx-2"></td>
                        <th scope="row">${elemento.codigo}</th>
                        <td>${elemento.categoria}</td>
                        <td>${elemento.nombre}</td>
                        <td>${elemento.descripcion}</td>
                        <td>$${elemento.precio}</td>
                        <td><a href="${elemento.urlImagen}" target="_blank" title="Ver Imagen">${elemento.urlImagen}</a></td>
                        <td>
                            <a href="" title="Editar Producto"><i class="icono-eliminar-editar fa-solid fa-pen me-3 custom-blue"></i></a>
                            <a href="" title="Borrar Producto"><i class="icono-eliminar-editar fa-solid fa-trash-can custom-red"></i></a>
                        </td>`;
        fila.innerHTML = columnas;
        cuerpoTabla.append(fila);
    }) 
}
  

function mostrarCardsProductos() {
    
}