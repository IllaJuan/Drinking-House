export function generarCodigo(inputNombre,arrayProductos) {
    let codigoProducto;
    let codigoDeBarras;
    let indiceProducto;
    let existeCodigo = false;

    /* Todos los productos que lleven el mismo nombre tendrán el mismo código de barra */
    indiceProducto = arrayProductos.findIndex(
        (elemento) => elemento.nombre === inputNombre.value
    );

    if (indiceProducto !== -1) {
        return arrayProductos[indiceProducto].codigo;
    } else if (arrayProductos.length > 0) {
        do {
            codigoProducto = Math.floor(Math.random() * 100000);
            codigoProducto = codigoProducto.toString();
            codigoProducto = codigoProducto.padStart(5,"00000");

            existeCodigo = arrayProductos.some(
                (elemento) => elemento["codigo"].includes(codigoProducto) === true
            );
        } while (existeCodigo);
        
        codigoDeBarras = `7791234${codigoProducto}8`;

        return codigoDeBarras;
    } else {
        codigoProducto = Math.floor(Math.random() * 100000);
        codigoProducto = codigoProducto.toString();
        codigoProducto = codigoProducto.padStart(5,"00000");

        codigoDeBarras = `7791234${codigoProducto}8`;

        return codigoDeBarras;
    }
}

export function validarNombre(nombre) {
    if (nombre.value.trim().length >= 2 && nombre.value.trim().length <= 100) {
        nombre.className = "form-control is-valid";
        return true;
    }
    nombre.className = "form-control is-invalid";
    return false;   // Mostrar mensaje que diga que ingrese de manera corecta este campo
}

export function validarDescripcion(descripcion) {
    if (descripcion.value.trim().length >= 5 && descripcion.value.trim().length <= 100) {
        descripcion.className = "form-control is-valid";
        return true;
    }
    descripcion.className = "form-control is-invalid";
    return false;
}

export function validarPrecio(precio) {
    let regExPrecio = /^[0-9]+(?:,[0-9]+)?$/;

    if (
    precio.value.trim().length >= 1 && 
    precio.value.trim().length <= 20 && 
    regExPrecio.test(precio.value)
    ) {
        precio.className = "form-control is-valid";
        return true;
    }
    precio.className = "form-control is-invalid";
    return false;
}

export function validarUrlImagen(urlImagen) {
    let regExUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    if (
    urlImagen.value.trim().length >= 5 &&
    urlImagen.value.trim().length <= 400 &&
    regExUrl.test(urlImagen.value)
    ) {
        urlImagen.className = "form-control is-valid";
        return true;
    }
    urlImagen.className = "form-control is-invalid";
    return false;
}
