import { mostrarFavoritos } from "./hellpers.js";

let sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;

if (window.location.href.includes("/pages/favoritos") && sesion !== undefined) {
    if (sesion.favoritos.length > 0) {
        mostrarFavoritos();
    }
} else if (window.location.href.includes("/pages/favoritos") && sesion === undefined) {
    window.location.replace("/index.html");
}

export function ocultarFavoritos() {
    let corazonFavoritos = document.querySelectorAll(".corazon-favoritos");
        
    if (sesion === undefined) {
        corazonFavoritos.forEach((elemento) => {
            elemento.classList.add("d-none")
        });
    } else {
        corazonFavoritos.forEach((elemento) => {
            elemento.classList.remove("d-none")
        });
    }
}

