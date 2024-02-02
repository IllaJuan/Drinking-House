/* 
    Funciones que validan los datos ingresados a través del formulario para "agregar productos" en la página de "admin.html"
*/

export function validarTodo(categoria,nombre,stock,descripcion,precio,urlImagen) {
    // arreglo de booleanos
    let arrayValidacion = [validarStock(stock),validarCategoria(categoria),validarNombre(nombre),validarDescripcion(descripcion),validarPrecio(precio),validarUrlImagen(urlImagen)];

    let arrayInputs = [stock,categoria,nombre,descripcion,precio,urlImagen];
    let indicesVerdaderos = [];
    let indicesFalsos = [];


    // guarda los índices de los input falsos
    for (let i = 0; i < arrayValidacion.length; i++) {
        if (arrayValidacion[i] === false) {
            indicesFalsos.push(i);
        } else {
            indicesVerdaderos.push(i);
        }
    }

    // accede a cada input falso y añade una clase
    for (let indice of indicesFalsos) {
        arrayInputs[indice].className = "form-control is-invalid";
    }
    for (let indice of indicesVerdaderos) {
        arrayInputs[indice].className = "form-control is-valid";
    }
}

export function validarStock(stock) {
    if (stock.value.trim().length > 0 && stock.value.trim().length <= 3 && !Number.isNaN(Number(stock.value))) {
        stock.className = "form-control is-valid";
        return true;
    }
    stock.className = "form-control is-invalid";
    return false; 
}

export function validarCategoria(categoria) {
    if (
    categoria.value === "vino" || 
    categoria.value === "cerveza" ||
    categoria.value === "spirits" ||
    categoria.value === "aperitivos"
    ) {
        categoria.className = "form-control is-valid";
        return true;
    }
    categoria.className = "form-control is-invalid";
    return false; 
}

export function validarNombre(nombre) {
    if (nombre.value.trim().length >= 2 && nombre.value.trim().length <= 100) {
        nombre.className = "form-control is-valid";
        return true;
    }
    nombre.className = "form-control is-invalid";
    return false; 
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
    let regExPrecio = /^[0-9]+(\.[0-9]+)?$/;

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
export function formatoPrecio(precio) {
    return parseFloat(precio.value).toLocaleString('es-AR',{ minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function validarUrlImagen(urlImagen) {
    let regExUrl = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i;

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
