import { mostrarCardsProductos } from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
let arrayFiltroProductos = JSON.parse(localStorage.getItem("filtroProductos")) || undefined;

if (arrayFiltroProductos !== undefined) {
    localStorage.removeItem("filtroProductos");
}


function categoriaAperitivos() {
    let arrayaperitivos = arrayProductos.filter(
        (elemento) => elemento.categoria === "aperitivos"
    );

    localStorage.setItem("filtroProductos", JSON.stringify(arrayaperitivos));
    localStorage.getItem("filtroProductos");
    
    mostrarCardsProductos(arrayaperitivos);
}

categoriaAperitivos();