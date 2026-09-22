//imports
import {db} from "./guitarras.js";
console.log(db)
//variables
const container = document.querySelector("h2 div")
const carrito = 

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

function getGuitar(e){
    if (e.target.classList.contains (btn))// muestra las clases que tiene el objeto
    {
        const id = e.target.getAttribute("data-id")//optemos el id del elemnto 
        //console.log("Botón", id)
        const idSelected =db.findIndex(g => g.id === Number(id))
        carrito.push([...db[idSelected]])
        console.log(carrito)
        //ver en gemini todo
    }
}
db.forEach(guitar => {
    container.appendChild(createCard(guitar))
})
//listeners

