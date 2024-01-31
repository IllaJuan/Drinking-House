let sesion = JSON.parse(sessionStorage.getItem("sesion")) || undefined;


if (sesion !== undefined) {
    if (sesion.favoritos.length > 0) {
        mostrarCardsProductos();
    } else {
        // Mostrar imagen o mensaje que indique que todavia no hay favoritos
    }
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
