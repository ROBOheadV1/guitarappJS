//imports
import {db} from "./guitarras.js";
console.log(db)
//variables
const container = document.querySelector("h2 div")
const divCarrito = document.querySelector ("")
const carrito = []

//funciones
db.forEach(guitar => {
    container.appendChild(createCard(guitar))

})

function createCard(){
    const div  = document.createElement("div")
    div.classList='col-md-6 col-lg-4 my-4 row align-items-center'
    const html =`<div class="col-4">
                    <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="${guitar.nombre}">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">${guitar.precio}</p>
                    <button 
                        data-id="${guitar.id}"
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`

   // div.innerText = "Aqui va una guitarra" + guitar.nombre 
   div.innerHTML = html
    return div
}

function drawCar(){
    const div = document.createElement ("div")
    if (carrito.length===0){
        div.innerHTML = '<p class="text-center">El carrito esta vacio</p>'
    } else {
        let html = `<table class="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>`
        carrito.forEach(guitar => {
            html += `<tr>
                                        <td>
                                            <img class="img-fluid" src="./public/img/guitarra_02.jpg" alt="imagen guitarra">
                                        </td>
                                        <td>SRV</td>
                                        <td class="fw-bold">
                                                $299
                                        </td>
                                        <td class="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                            >
                                                -
                                            </button>
                                                1
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-danger"
                                                type="button"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>`
        })
        html += `</tbody>
                            </table>
                            <p class="text-end">Total pagar: <span class="fw-bold">$899</span></p>
                            <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>`
        div.innerHTML = html
    }
    divCarrito.innerHTML = ''
    divCarrito.appendChild
}

function getGuitar(e){
    if (e.target.classList.contains (btn))// muestra las clases que tiene el objeto
    {
        const id = e.target.getAttribute("data-id")//optenemos el id del elemnto 
        //console.log("Botón", id)
        const idSelected =db.findIndex(g => g.id === Number(id))
        const idInCart = carrito.findIndex(gIncart => gIncart.id === Number(id))
        if(idInCart === -1){
            carrito.push({...db[idSelected], cantidad: 1 })
        } else{
            carrito[idInCart].cantidad++ 
        }
        drawCar()
        //ver en gemini todo
    }
}
db.forEach(guitar => {
    container.appendChild(createCard(guitar))
})
//listeners

