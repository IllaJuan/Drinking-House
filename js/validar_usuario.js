/* 
    Funciones que validan los datos ingresados a través del formulario de "Suscripción"
*/

export function validarNombreUsuario(nombre) {
    let regExNombre = /^[a-zA-ZÀ-ÖØ-öø-ÿ']+(\s[a-zA-ZÀ-ÖØ-öø-ÿ]+)?$/;

    if (
    nombre.value.trim().length >= 2 &&
    nombre.value.trim().length <= 50 &&
    regExNombre.test(nombre.value)
    ) {
        nombre.className = "form-control is-valid";
        return true;
    }
    nombre.className = "form-control is-invalid";
    return false; 
}

export function validarEmail(email,arrayUsuarios) {
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let existeUsuario;

    if (
    email.value.trim().length >= 10 &&
    email.value.trim().length <= 40 &&
    regExEmail.test(email.value)
    ) {
        existeUsuario = arrayUsuarios.some(
            (elemento) => elemento["email"].includes(email.value) === true
        );

        if (existeUsuario) {
            return 1;
        }
        
        email.classList = "form-control is-valid"
        return true;
    }
    email.classList = "form-control is-invalid"
    return false;
}

export function validarClave(clave) {
    let regExClave = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    if(
        clave.value.trim().length >= 8 &&
        clave.value.trim().length <= 16 &&
        regExClave.test(clave.value)
    ) {
        clave.classList = "form-control is-valid";
        return true;
    }
    clave.classList = "form-control is-invalid";
    return false;
}
