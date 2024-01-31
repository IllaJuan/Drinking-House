/* 
    Funciones de la página de "Administración"
*/ 

//   Área de "productos" 

export function guardarLocalStorage(arrayProductos) {
    localStorage.setItem("productos", JSON.stringify(arrayProductos));
}

export function limpiarFormulario(form,inputCategorias,inputNombre,inputDescripcion,inputPrecio,inputUrlImagen) {
    form.reset();
    inputCategorias.className = "form-control";
    inputNombre.className = "form-control";
    inputDescripcion.className = "form-control";
    inputPrecio.className = "form-control";
    inputUrlImagen.className = "form-control";
}

export function mostrarOcultarFormulario(formularioAdmin) {
    formularioAdmin.classList.toggle("d-none");
}

export function mostrarOcultarBotonForm(botonEditarProducto) {
    botonEditarProducto.forEach(elemento => {
        elemento.classList.toggle("d-none")
    });
}

export function mostrarCardsProductos(productos) {
    let cardProductos = document.getElementById("card-productos");
    cardProductos.innerHTML = "";
    productos.forEach((elemento) => {
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
                        <a class="btn button-card" href="/pages/descripcion_producto.html" onclick="verProducto(${elemento.id})" role="button">Ver Producto</a> 
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
window.verProducto = function (idProducto) {
    localStorage.setItem("idDetalleProducto", idProducto);
}


//   Área de "usuarios" 

export function guardarLocalStorageUsers(array) {
    localStorage.setItem("usuarios", JSON.stringify(array));
}

export function primeraMayuscula(usuario) {
    return usuario.value.charAt(0).toUpperCase() + usuario.value.slice(1);
}

export function rol() {
    let rol = "usuario";
    if (window.location.href.includes("/pages/registro.html")) {
        return rol;
    }
    rol = "admin";
    return rol;
}

export function verificarRol(sesion) {
    return sesion.rol === "admin";
}