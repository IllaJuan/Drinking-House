/* 
    Funciones que validan los datos ingresados a través del formulario de "registro.html"
*/

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

export function idUsuario() {
    let id;

    if (arrayUsuarios.length > 0) {
        if (arrayUsuarios[arrayUsuarios.length - 1].id === 1 && arrayUsuarios.length > 1) {
            id = arrayUsuarios[arrayUsuarios.length - 2].id + 1;
            return id;
        }
        id = arrayUsuarios[arrayUsuarios.length - 1].id + 1;
        return id;
    }
}

export function validarRegistro(nombre,apellido,email,clave,repeticionClave,terminos,usuarioRepetido) {
    // arreglo de booleanos
    let arrayValidacion = [validarNombreUsuario(nombre),validarApellido(apellido),validarEmail(email,usuarioRepetido),validarClave(clave,repeticionClave)];

    let arrayInputs = [nombre,apellido,email,clave,repeticionClave];
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

    if (checkboxTerminos(terminos) === false) {
        terminos.className = "form-check-input is-invalid me-0";
    } else {
        terminos.className = "form-check-input me-0";
    }
}

export function validarTodoRegistro(nombre,apellido,email,clave,repeticionClave,terminos,usuarioRepetido) {
    if (
        validarNombreUsuario(nombre) &&
        validarApellido(apellido) &&
        validarEmail(email,usuarioRepetido) &&
        validarClave(clave,repeticionClave) &&
        compararClaves(clave,repeticionClave) &&
        checkboxTerminos(terminos)
        ) { 
            return true;
    }  else {
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
        nombre.className = "form-control is-valid";
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
        apellido.className = "form-control is-valid";
        return true;
    }
    apellido.className = "form-control is-invalid";
    return false; 
}

export function validarEmail(email,usuarioRepetido) {
    arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let existeUsuario = false;

    // verifica la existencia del usuario
    existeUsuario = arrayUsuarios.some(
        (elemento) => elemento["email"] === email.value && email.value !== ""
    );

    if (
    email.value.trim().length >= 10 &&
    email.value.trim().length <= 40 &&
    regExEmail.test(email.value) &&
    !existeUsuario
    ) { 
        email.className = "form-control is-valid";
        return true;
    }

    if (existeUsuario) {
        usuarioRepetido.innerHTML = "El correo ingresado ya está registrado";
        email.className = "form-control is-invalid";
        return false;
    }
    usuarioRepetido.innerHTML = "Debe ingresar una dirección de email válida";
    email.className = "form-control is-invalid";
    return false;
}

export function validarClave(clave,repeticionClave) {
    let regExClave = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if(
        clave.value.trim().length >= 8 &&
        clave.value.trim().length <= 16 &&
        regExClave.test(clave.value)
    ) {
        repeticionClave.removeAttribute("disabled");
        clave.className = "form-control is-valid";
        return true;
    }
    repeticionClave.setAttribute("disabled","");
    repeticionClave.className = "form-control shadow";
    repeticionClave.value = "";
    clave.className = "form-control is-invalid";
    return false;
}

export function compararClaves(clave,repeticionClave) {
    if (clave.value !== "" && clave.value === repeticionClave.value) {
        repeticionClave.className = "form-control is-valid";
        return true;
    } 
    repeticionClave.className = "form-control is-invalid";
    return false;
}

export function checkboxTerminos(terminos) {
    if (terminos.checked) {
        terminos.className = "form-check-input me-0";
        return true;
    }
    terminos.className = "form-check-input is-invalid me-0";
    return false;
}

export function validarUsuario(email,clave) {
    let usuarioExiste = false;

    usuarioExiste = arrayUsuarios.some(
        (elemento) => elemento["email"] === email.value && email.value !== "" && elemento["clave"] === clave.value && clave.value !== ""
    );
    
    return usuarioExiste;
}

export function recuperarClave(email) {
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let existeUsuario = false;

    existeUsuario = arrayUsuarios.some(
        (elemento) => elemento["email"] === email.value && email.value !== ""
    );

    if (
        email.value.trim().length >= 10 &&
        email.value.trim().length <= 40 &&
        regExEmail.test(email.value) &&
        existeUsuario
    ) {
        email.className = "form-control is-valid";
        return true;
    } else {
        email.className = "form-control is-invalid";
        return false;
    }
}

export function verificarClaveInicioSesion(clave) {
    if(clave.value.trim().length >= 8 && clave.value.trim().length <= 16) {
        clave.className = "form-control shadow";
        return true;
    }
    clave.className = "form-control is-invalid";
    return false;
}

export function validarEmailInicioSesion(email,emailInicioSesion) {
    arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
    email.value.trim().length >= 10 &&
    email.value.trim().length <= 40 &&
    regExEmail.test(email.value)
    ) { 
        email.className = "form-control shadow";
        return true;
    } else if (email.value.trim() === "") {
        emailInicioSesion.innerHTML = "Debe ingresar su correo electrónico";
        email.className = "form-control is-invalid";
        return false;
    }
    
    emailInicioSesion.innerHTML = "Debe ingresar un correo electrónico válido";
    email.className = "form-control is-invalid";
    return false;
}

export function validarInicioSesion(email,emailInicioSesion,clave) {
    // arreglo de booleanos
    let arrayValidacion = [validarEmailInicioSesion(email,emailInicioSesion),verificarClaveInicioSesion(clave)];

    let arrayInputs = [email,clave];
    let indiceVerdadero = [];
    let indiceFalso = [];


    for (let i = 0; i < arrayValidacion.length; i++) {
        if (arrayValidacion[i] === false) {
            indiceFalso.push(i);
        } else {
            indiceVerdadero.push(i);
        }
    }    

    for (let indice of indiceFalso) {
        arrayInputs[indice].className = "form-control is-invalid";
    }
    for (let indice of indiceVerdadero) {
        arrayInputs[indice].className = "form-control shadow";
    }
}