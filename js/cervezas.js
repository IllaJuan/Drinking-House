import { mostrarCardsProductos } from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let arrayFiltroProductos = JSON.parse(localStorage.getItem("filtroProductos")) || undefined;

if (arrayFiltroProductos !== undefined) {
    localStorage.removeItem("filtroProductos");
}


function categoriaCervezas() {
    let arraycervezas = arrayProductos.filter(
        (elemento) => elemento.categoria === "cervezas"
    );

    localStorage.setItem("filtroProductos", JSON.stringify(arraycervezas));
    localStorage.getItem("filtroProductos");

    mostrarCardsProductos(arraycervezas);
}

categoriaCervezas();