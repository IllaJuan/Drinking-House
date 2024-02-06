let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let consulta = document.getElementById("consulta");
let enviarConsulta = document.getElementById("enviar-consulta");

enviarConsulta.addEventListener("click", (e) => {
    validarFormulario(e);
});

nombre.addEventListener("blur", () => {
    validarNombre(nombre);
});
email.addEventListener("blur", () => {
    validarEmail(email);
});
consulta.addEventListener("blur", () => {
    validarConsulta(consulta);
});

function validarFormulario(e) {
    e.preventDefault();

    if (
        validarNombre(nombre) && 
        validarEmail(email) && 
        validarConsulta(consulta)
    ) {
        Swal.fire({
            icon: "success",
            text: "¡La consulta ha sido enviada!",
            footer: "En breve tendrá la respuesta en su correo",
            showConfirmButton: false,
            timer: 4000
        });
        setTimeout(function() {
            location.reload();
        }, 4000);
    } else {
        validarTodo(nombre,email,consulta);
    }
}

function validarTodo(nombre,email,consulta) {
    // arreglo de booleanos
    let arrayValidacion = [validarNombre(nombre),validarEmail(email),validarConsulta(consulta)];

    let arrayInputs = [nombre,email,consulta];
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

function validarNombre(nombre) {
    let regExNombre = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;

    if (
        nombre.value.trim().length >= 2 &&
        nombre.value.trim().length <= 30 &&
        regExNombre.test(nombre.value)
    ) {
        nombre.className = 'form-control is-valid';
        return true;
    } else {
        nombre.className = 'form-control is-invalid';
        return false;
    }
}

function validarEmail(email) {
    let regExEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
        email.value.trim().length >= 10 &&
        email.value.trim().length <= 40 &&
        regExEmail.test(email.value)
    ) {
        email.className = 'form-control is-valid';
        return true;
    } else {
        email.className = 'form-control is-invalid';
        return false;
    }
}

function validarConsulta(consulta) {
    if (consulta.value.trim().length > 0 && consulta.value.trim().length <= 250) {
        consulta.className = 'form-control is-valid';
        return true;
    } else {
        consulta.className = 'form-control is-invalid';
        return false;
    }
}
