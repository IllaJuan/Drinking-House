/* 
    Funciones que validan los datos ingresados a través del formulario de "registro.html"
*/

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

export function idUsuario() {
    let id;

    if (arrayUsuarios.length > 0) {
        if (arrayUsuarios[arrayUsuarios.length - 1].id === 1) {
            id = arrayUsuarios[arrayUsuarios.length - 2].id + 1;
            return id;
        }
        id = arrayUsuarios[arrayUsuarios.length - 1].id + 1;
        return id;
    }
}

export function validarTodoRegistro(nombre,apellido,email,clave,repeticionClave,terminos) {
    if (
        validarNombreUsuario(nombre) &&
        validarApellido(apellido) &&
        validarEmail(email) &&
        validarEmail(email) !== 2 &&
        validarClave(clave) &&
        compararClaves(clave,repeticionClave) &&
        checkboxTerminos(terminos)
        ) { 
            return true;
    } else if (validarEmail(email) === 2) {
        return 2;
    } else {
        return false;
    }
}

export function validarNombreUsuario(nombre) {
    let regExNombre = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;

    if (
    nombre.value.trim().length >= 2 &&
    nombre.value.trim().length <= 30 &&
    regExNombre.test(nombre.value)
    ) {
        nombre.className = "form-control";
        return true;
    }
    nombre.className = "form-control is-invalid";
    return false; 
}

export function validarApellido(apellido) {
    let regExApellido = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+$/;

    if (
    apellido.value.trim().length >= 2 &&
    apellido.value.trim().length <= 30 &&
    regExApellido.test(apellido.value)
    ) {
        apellido.className = "form-control";
        return true;
    }
    apellido.className = "form-control is-invalid";
    return false; 
}

export function validarEmail(email) {
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let existeUsuario = false;

    existeUsuario = arrayUsuarios.some(
        (elemento) => elemento["email"].includes(email.value) === true && email.value !== ""
    );

    if (
    email.value.trim().length >= 10 &&
    email.value.trim().length <= 40 &&
    regExEmail.test(email.value)
    ) { 
        if (existeUsuario) {
            email.className = "form-control is-invalid"
            return 2;
        }
        email.className = "form-control"
        return true;
    }
    email.className = "form-control is-invalid"
    return false;
}

export function validarClave(clave) {
    let regExClave = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if(
        clave.value.trim().length >= 8 &&
        clave.value.trim().length <= 16 &&
        regExClave.test(clave.value)
    ) {
        clave.className = "form-control";
        return true;
    }
    clave.className = "form-control is-invalid";
    return false;
}

export function compararClaves(clave,repeticionClave) {
    if (clave.value === repeticionClave.value) {
        repeticionClave.className = "form-control";
        return true;
    }
    repeticionClave.className = "form-control is-invalid";
    return false;
}

export function checkboxTerminos(terminos) {
    if (terminos.checked) {
        terminos.className = "form-check-input";
        return true;
    }
    terminos.className = "form-check-input is-invalid";
    return false;
}

export function validarUsuario(email,clave) {
    let usuarioExiste = false;

    usuarioExiste = arrayUsuarios.some(
        (elemento) => elemento["email"] === email.value && email.value !== "" && elemento["clave"] === clave.value && clave.value !== ""
    );
    
    return usuarioExiste;
}

export function verificarInput(input) {
    if (input.value !== "") {
        input.className = "form-control";
        return true;
    }
    input.className = "form-control is-invalid";
    return false;
}