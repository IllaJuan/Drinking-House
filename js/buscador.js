import { ocultarFavoritos } from "./favoritos.js";
import { mostrarCardsProductos } from "./hellpers.js";

let inputBusqueda = document.getElementById("busqueda");
let inputBuscado = document.getElementById("search-btn");
let inputBusquedaMovil = document.getElementById("busqueda-movil");
let inputBuscadoMovil = document.getElementById("search-btn-movil");


inputBusqueda.addEventListener("click", () => {
    filtrarProductos();
});
inputBusquedaMovil.addEventListener("click", () => {
    filtrarProductos();
});

function filtrarProductos() {
    let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
    let categoriasFiltradas = [];
    if (inputBuscado.value.trim() === "" && inputBuscadoMovil.value.trim() === "") {
        // si la busqueda esta vacia, mostrar todos los productos
        categoriasFiltradas = arrayProductos;
    } else {
        // filtrado por categorias y nombre
        if (inputBuscado.value.trim() !== "") {
            categoriasFiltradas = arrayProductos.filter(producto => {
                const categoriaIncluida = producto.categoria.toLowerCase().includes(inputBuscado.value.toLowerCase());
                const nombreIncluido = producto.nombre.toLowerCase().includes(inputBuscado.value.toLowerCase());
                return categoriaIncluida || nombreIncluido;
            });
        } else {
            categoriasFiltradas = arrayProductos.filter(producto => {
                let categoriaBuscada = producto.categoria.toLowerCase().includes(inputBuscadoMovil.value.toLowerCase());
                let nombreBuscado = producto.nombre.toLowerCase().includes(inputBuscadoMovil.value.toLowerCase());
                return categoriaBuscada || nombreBuscado;
            });
        }
    }

    mostrarCardsProductos(categoriasFiltradas);
    ocultarFavoritos();
}

if (inputBuscado.value === "" && inputBuscadoMovil.value === "") {
    mostrarCardsProductos(JSON.parse(localStorage.getItem("productos")) || []);
    ocultarFavoritos();
}
