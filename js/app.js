let cardProductos = document.getElementById("card-productos");

let myModal = document.getElementById('staticBackdrop');
let modal = bootstrap.Modal.getOrCreateInstance(myModal)
modal.show()

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

function mostrarCardsProductos() {
    let arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
    cardProductos.innerHTML = "";
    arrayProductos.forEach((elemento) => {
        cardProductos.innerHTML += `
            <div class="card col-sm-12 col-md-4 col-lg-3 my-3 mx-2" style="width: 18rem;">
                <img src="${elemento.urlImagen}" class="card-img-top my-2 tamaño-imagen-card" alt="${elemento.nombre}">                   
                <hr class="my-0">
                <div class="card-body">
                    <h4 class="card-title">$${elemento.precio}</h4>
                    <p class="card-text my-0">${elemento.descripcion}</p>
                    <a href=""><i class="ri-heart-line heart-card"></i></a>
                    <div class="text-center mt-2">
                        <a class="btn button-card" href="index.html" role="button">Ver Producto</a> 
                    </div>                        
                </div>
            </div>`;
    });
}

mostrarCardsProductos();