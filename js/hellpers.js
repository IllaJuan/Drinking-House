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


//   Área de "usuarios" 

export function guardarLocalStorageUsers(array) {
    localStorage.setItem("usuarios", JSON.stringify(array));
}