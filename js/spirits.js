import { mostrarCardsProductos } from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let arrayFiltroProductos = JSON.parse(localStorage.getItem("filtroProductos")) || undefined;

if (arrayFiltroProductos !== undefined) {
    localStorage.removeItem("filtroProductos");
}


function categoriaSpirits() {
    let arrayspirits = arrayProductos.filter(
        (elemento) => elemento.categoria === "spirits"
    );

    localStorage.setItem("filtroProductos", JSON.stringify(arrayspirits));
    localStorage.getItem("filtroProductos");
        
    mostrarCardsProductos(arrayspirits);
}

categoriaSpirits();