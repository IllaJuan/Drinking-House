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
    let sesion = JSON.parse(sessionStorage.getItem("sesion"));
    let existeFavorito = false;

    existeFavorito = sesion.favoritos.some(elemento => elemento === idProducto);

    if (!existeFavorito) {        
        sesion.favoritos.push(idProducto);
        sessionStorage.setItem("sesion", JSON.stringify(sesion));
    }
}
window.verProducto = function (idProducto) {
    localStorage.setItem("idDetalleProducto", idProducto);
}

export function mostrarFavoritos() {
    let sesion = JSON.parse(sessionStorage.getItem("sesion"));
    let arrayProductos = JSON.parse(localStorage.getItem("productos"));
    let contenedorFavoritos = document.getElementById("contenedor-favoritos");
    let productoEncontrado;
    let arrayFavoritos = [];

    // Convierte el arreglo en un conjunto
    let conjuntoProductos = new Set(arrayProductos.map(producto => producto.id));

    // Verificar si cada elemento del arreglo de sesion.favoritos está adentro de conjuntoProductos y crea una arreglo con esos productos
    sesion.favoritos.forEach(elemento => {
        if (conjuntoProductos.has(elemento)) {
            productoEncontrado = arrayProductos.find(producto => producto.id === elemento);

            arrayFavoritos.push(productoEncontrado);
        }
    });

    contenedorFavoritos.innerHTML = "";
    arrayFavoritos.forEach((elemento) => {
        contenedorFavoritos.innerHTML += `
            <div class="card mb-3 custom-card-width mx-auto">
                <div class="row g-0">
                    <div class="col-md-4 text-center">
                        <img src="${elemento.urlImagen}" class="img-fluid rounded-start custom-imagen-alto" alt="${elemento.nombre}">
                    </div>
                    <div class="col-md-8 my-auto">
                        <div class="card-body">
                            <h5 class="card-title">${elemento.nombre}</h5>
                            <p>Categoría: ${elemento.categoria}</p>
                            <a class="btn button-card" href="/pages/descripcion_producto.html" onclick="verProducto(${elemento.id})" role="button">Ver Producto</a> 
                            <button class="btn btn-danger btn-sm" onclick="eliminarFavorito(${elemento.id})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
window.eliminarFavorito = function (idProducto) {
    let sesion = JSON.parse(sessionStorage.getItem("sesion"));

    sesion.favoritos = sesion.favoritos.filter(elemento => elemento !== idProducto);
    sessionStorage.setItem("sesion", JSON.stringify(sesion));
    sessionStorage.getItem("sesion");
    mostrarFavoritos();
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
    if (window.location.href.includes("https://drinking-house.netlify.app/pages/registro")) {
        return rol;
    }
    rol = "admin";
    return rol;
}

export function verificarRol(sesion) {
    return sesion.rol === "admin";
}