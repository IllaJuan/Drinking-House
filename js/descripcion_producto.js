let detallesDeProducto = document.getElementById('detallesDeProducto');

function crearDetalledeProducto () {
    const arrayProductos = JSON.parse(localStorage.getItem("productos")) || [];
    detallesDeProducto.innerHTML = "";
   
    arrayProductos.forEach(elemento => {
        findIndex
    });() => {
        detallesDeProducto.innerHTML += `<div class="row row-cols-1 row-cols-md-2 lg-2 xl-2 sm-1">
        <div class="col">
            <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/index.html">Inicio</a></li>
                  <li class="breadcrumb-item"><a href="#">Categorias</a></li>
                  <li class="breadcrumb-item"><a href="#">Destilados</a></li>
                  <li class="breadcrumb-item active" aria-current="page">Jack Daniels</li>
                </ol>
              </nav>
            <img src="${elemento.urlImg}" alt="Jack Daniels Whiskey" class="img-fluid">
        </div>
        <div class="col align-items-center">
            <h3>${elemento.nombre}</h3>
            <h2>${elemento.precio}</h2>
            <p>Stock disponible: 20</p>
            <p>Código:${elemento.codigo}</p>
            <div class="d-grid gap-3 col-8">
                <button class="btn custom-btn-buynow btn-sm" type="button">Comprar ahora</button>
                <button class="btn btn-secondary btn-sm" type="button">Agregar a Favoritos</button>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-6 order-md-1 my-2">
                        <h5>Compartir</h5>
                    </div>
                    <div class="col-md-6 order-md-2 my-2">
                        <a href="#"><i class="fa-brands fa-facebook"></i></a>
                        <a href="#"><i class="fa-brands fa-square-x-twitter"></i></a>
                        <a href="#"><i class="fa-brands fa-square-instagram"></i></a>
                        <a href="#"><i class="fa-brands fa-square-whatsapp"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="container">
        <h2>Características del producto/Información Adiconal</h2>
        <div class="col my-2">
            <p class="infotext">Marca: Jack Daniels</p>
            <p class="infotext">Volúmen neto: 750ml</p>
            <p class="infotext">Graduación alcohólica: 40%</p>
            <p class="infotext">Incluye estuche: No</p>
            <p class="infotext">Tipo de envase: Botella de vidrio</p>
            <p class="infotext">Origen: USA</p>
        </div>
    </section>
    <section class="container">
        <h2>Descripción</h2>
        <div class="container justify-content">
            <p class="infotext">${elemento.descripcion}</p>
        </div>
    </section>
</div>`
    }
}

crearDetalledeProducto();
