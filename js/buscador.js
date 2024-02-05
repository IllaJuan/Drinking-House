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
        // filtrado por categorias
        if (inputBuscado.value.trim() !== "") {
            categoriasFiltradas = arrayProductos.filter(producto => {
                return producto.categoria.toLowerCase().includes(inputBuscado.value.toLowerCase());
            });
        } else {
            categoriasFiltradas = arrayProductos.filter(producto => {
                return producto.categoria.toLowerCase().includes(inputBuscadoMovil.value.toLowerCase());
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
