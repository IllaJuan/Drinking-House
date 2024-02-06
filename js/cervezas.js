let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];

let cuerpoCervezas = document.getElementById("contenedor-cervezas");

function categoriaCervezas() {
    const arraycervezas = arrayProductos.filter(
        (elemento) => elemento.categoria === "cerveza"
    );

    cuerpoCervezas.innerHTML = "";
    arraycervezas.forEach((elemento) => {
        cuerpoCervezass.innerHTML += ` 
            <div class="col justify-content-center my-3">
                <div class="card my-2 mx-auto mx-sm-0" style="width: 16rem;">
                    <img src="${elemento.urlImagen}" class="card-img-top tamaño-imagen-card" alt="${elemento.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${elemento.nombre}</h5>
                        <p class="card-text">$ ${elemento.precio}</p>
                        <div class="text-center">
                            <a class="btn button-card btn-sm" href="/pages/descripcion_producto.html" onclick="verProducto(${elemento.id})">Ver producto</a>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}
window.verProducto = function (idProducto) {
    localStorage.setItem("idDetalleProducto", idProducto);
}