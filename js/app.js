import { ocultarFavoritos } from "./favoritos.js";

let arrayUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

/* 
    Código para que cambie el color del navbar cuando se haga scroll
*/
document.addEventListener('scroll' , () => { 
    const header=document.querySelector('.navcolor');
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
document.addEventListener('scroll' , () => { 
    const header=document.querySelector('.sidebar');
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


/* 
    Código para que se cargue un administrador por defecto
*/
let pepitoExiste = arrayUsuarios.some(
    elemento => elemento["email"] === "pepito@gmail.com" && elemento["rol"] === "admin"
)

if (arrayUsuarios.length === 0 || !pepitoExiste) {    
    const pepito = {
        id: 1,
        nombre: "Pepito",
        apellido: "Pérez",
        email: "pepito@gmail.com",
        clave: "@Pepito2024",
        favoritos: [],
        rol: "admin"
    }

    arrayUsuarios.push(pepito);

    localStorage.setItem("usuarios",JSON.stringify(arrayUsuarios));
    localStorage.getItem("usuarios");
}

if (window.location.href.includes("index.html")) {
/* 
    Código para que aparezca la ventana modal de la página principal preguntado si el que entra al sitio es +18
*/
    let myModal = document.getElementById('staticBackdrop');
    let modal = bootstrap.Modal.getOrCreateInstance(myModal);
    modal.show();
}
ocultarFavoritos();
