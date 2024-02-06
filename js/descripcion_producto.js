import { mostrarCardsProductos } from "./hellpers.js";

let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

let descripcionProducto = document.getElementById("descripcion-producto");
let datosProducto = document.getElementById("datos-producto");
let detalleProducto = parseInt(localStorage.getItem("idDetalleProducto"));
let producto = [];


mostrarDescripcion();

function mostrarDescripcion() {    
    producto = arrayProductos.filter(
        (elemento) => elemento.id === detalleProducto
    );
    
    datosProducto.innerHTML = `
        <div class="col text-center">
            <img src="${producto[0].urlImagen}" alt="${producto[0].nombre}" class="img-fluid tamaño-imagen-card">
        </div>
        <div class="col align-items-center">
            <h2>${producto[0].nombre}</h2>
            <h3>$ ${producto[0].precio}</h3>
            <p class="infotext mb-0 mt-2">Cantidad en stock: ${producto[0].stock}</p>
            <p class="infotext mb-4">Categoría: ${producto[0].categoria}</p>
            <div class="d-grid gap-3 col-8">
                <a class="btn custom-btn-buynow btn-sm" type="button" href="/pages/error404.html">Comprar ahora</a>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-6 order-md-1 my-2">
                        <h5>Compartir</h5>
                    </div>
                    <div class="col-6 order-md-2 my-2">
                        <a href="/pages/error404.html"><i class="fa-brands fa-facebook"></i></a>
                        <a href="/pages/error404.html"><i class="fa-brands fa-square-x-twitter"></i></a>
                        <a href="/pages/error404.html"><i class="fa-brands fa-square-instagram"></i></a>
                        <a href="/pages/error404.html"><i class="fa-brands fa-square-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>`;
    
    descripcionProducto.innerHTML = `<p class="infotext">${producto[0].descripcion}</p>`;

    sugerecias(producto);
}


function sugerecias(productoMostrado) {
    let arraySugerencias = arrayProductos.filter(
        (elemento) => elemento.id !== productoMostrado[0].id && elemento.categoria === productoMostrado[0].categoria
    );

    let arrayFiltroProductos = JSON.parse(localStorage.getItem("filtroProductos")) || undefined;

    if (arrayFiltroProductos !== undefined) {
        localStorage.removeItem("filtroProductos");
    }

    localStorage.setItem("filtroProductos", JSON.stringify(arraySugerencias));
    localStorage.getItem("filtroProductos");

    mostrarCardsProductos(arraySugerencias);
}
