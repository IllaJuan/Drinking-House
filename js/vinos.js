import { mostrarCardsProductos } from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let arrayFiltroProductos = JSON.parse(localStorage.getItem("filtroProductos")) || undefined;

if (arrayFiltroProductos !== undefined) {
    localStorage.removeItem("filtroProductos");
}


function categoriaVinos() {
    let arrayvinos = arrayProductos.filter(
        (elemento) => elemento.categoria === "vinos"
    );
          
    localStorage.setItem("filtroProductos", JSON.stringify(arrayvinos));
    localStorage.getItem("filtroProductos");

    mostrarCardsProductos(arrayvinos);
}

categoriaVinos();