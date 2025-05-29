const Row = document.querySelector('#Row')
const Loading = document.querySelector('#Loading')
let Canva = document.querySelector('#canvaBody')
let url = 'https://api.escuelajs.co/api/v1/products'
let card = ''
let array = []

// let produ = localStorage.getItem('productos') ? localStorage.setItem('productos', JSON.stringify(array)) : []


fetch(url)
    .then((response) => {
        return response.json()
    })

    .then((data) => {

        const detalles = data.map(element => ({
            img: element.images[0],
            Nombre: element.title,
            Precio: element.price
        }));

        detalles.forEach(element => {
            card += Crear(element)
        });
        Row.innerHTML = card
    })

    .catch((error) => {
        console.error('Ha occurrido un error', error)
    })


setTimeout(() => {
    Loading.classList.add('d-none')
    Row.classList.remove('d-none')
}, 500)


const Crear = (element) => {
    return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 gy-5">
                    <div class="card position-relative" style="height:25rem">
                        <img src="${element.img}" class="card-img-top position-relative" alt="${element.Nombre}"
                            style="object-fit:cover; height: 200px;">
                            <span class="badge position-absolute m-3 end-0 px-2 py-2 rounded-circle text-black fs-6"><i
                                class="bi bi-suit-heart"></i></span>
                        <span class="badge position-absolute m-3 bg-danger px-2 py-2">Oferta</span>
                        <div class="card-body">
                            <h6 class="card-title fw-bold">${element.Nombre}</h6>
                            <div class="d-flex align-items-center mt-1 mb-3">
                                <span class="fw-bold" style="color: #6a11cb; font-size: larger;">$${element.Precio}</span>
                                <span class="ms-2 text-decoration-line-through">$29.99</span>
                            </div>

                        <button onclick="Agregar('${element.img}', '${element.Precio}', '${element.Nombre}')" id="BtnCarrito" style="background-color: #6a11cb;" class="btn text-white w-100 mt-2" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop">
                Añadir al carrito
                        </button>

                        </div>
                    </div>
                </div>`

}

const Agregar = (Imagen, Precio, Nombre) => {

    let obj = {
        precio: Precio,
        name: Nombre
    }

    array.push(obj)


    Canva.innerHTML += `<div class="unico card m-3" style="width: 15rem; height:15rem">
  <img src="${Imagen}" class="card-img-top" alt="..."
  style="object-fit:cover; height: 100px;">
  <div class="card-body">
    <h5 class="card-title">${Nombre}</h5>
    <p class="card-text">Precio: ${Precio}</p>
    
  </div>
</div>`


    localStorage.setItem('productos', JSON.stringify(array))

}

// Agregar(produ)


