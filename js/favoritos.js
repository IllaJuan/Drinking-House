let sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;

if (sesion !== undefined) {
    if (sesion.favoritos.length > 0) {
        mostrarCardsProductos();
    } else {
        // Mostrar imagen o mensaje que indique que todavia no hay favoritos
    }
}

export function mostrarCardsProductos() {
    let cardProductos = document.getElementById("card-productos");
    let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
    cardProductos.innerHTML = "";
    arrayProductos.forEach((elemento) => {
        cardProductos.innerHTML += `
            <div class="card col-sm-12 col-md-4 col-lg-3 my-3 mx-2" style="width: 18rem;">
                <img src="${elemento.urlImagen}" class="card-img-top my-2 tamaño-imagen-card" alt="${elemento.nombre}">                   
                <hr class="my-0">
                <div class="card-body">
                    <h4 class="card-title">${elemento.nombre}</h4>
                    <p class="card-text my-0">$${elemento.precio}</p>
                    <a class="corazon-favoritos">
                        <i class="ri-heart-line heart-card" onclick="agregarFavorito(${elemento.id})"></i>
                    </a>
                    <div class="text-center mt-2">
                        <a class="btn button-card" href="/pages/descripcion_producto.html" role="button">Ver Producto</a> 
                    </div>                        
                </div>
            </div>`;
    });
}

window.agregarFavorito = function (idProducto) {
    let arrayFavoritos = sesion["favoritos"];
    arrayFavoritos = arrayFavoritos.push(idProducto);
    sesion.favoritos = arrayFavoritos;
}

export function ocultarFavoritos() {
    let corazonFavoritos = document.querySelectorAll(".corazon-favoritos");
        
    if (sesion === undefined) {
        corazonFavoritos.forEach((elemento) => {
            elemento.classList.add("d-none")
        });
    } else {
        corazonFavoritos.forEach((elemento) => {
            elemento.classList.remove("d-none")
        });
    }
}