//imports
import { db } from "./guitarras.js";

//variables
const contenedorGuitarras = document.querySelector('#guitarras');
const carritoBody = document.querySelector('#carrito-body');
const carritoVacio = document.querySelector('#carrito-vacio');
const carritoTabla = document.querySelector('#carrito-tabla');
const carritoTotal = document.querySelector('#carrito-total');
const btnVaciar = document.querySelector('#vaciar-carrito');

//state
let carrito = [];

//listeners
document.addEventListener('DOMContentLoaded', () => {
    db.forEach(guitar => contenedorGuitarras.appendChild(crearCard(guitar)));
});

document.addEventListener('click', e => {
    // Agregar al carrito
    if (e.target.matches('button[data-id]') && e.target.textContent.includes('Agregar')) {
        agregarAlCarrito(parseInt(e.target.dataset.id));
    }

    // Eliminar un producto (X)
    if (e.target.matches('#carrito-body .btn-danger')) {
        eliminarDelCarrito(parseInt(e.target.dataset.id));
    }

    // Sumar cantidad (+)
    if (e.target.matches('#carrito-body .btn-sumar')) {
        sumarCantidad(parseInt(e.target.dataset.id));
    }

    // Restar cantidad (-)
    if (e.target.matches('#carrito-body .btn-restar')) {
        restarCantidad(parseInt(e.target.dataset.id));
    }
});

btnVaciar.addEventListener('click', () => {
    carrito = [];
    renderCarrito();
});

//funciones
function crearCard(guitar) {
    const div = document.createElement('div');
    div.classList = 'col-md-6 col-lg-4 my-4 row align-items-center';
    div.innerHTML = `
        <div class="col-4">
            <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="imagen guitarra">
        </div>
        <div class="col-8">
            <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
            <p>${guitar.descripcion}</p>
            <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
            <button
                type="button"
                data-id="${guitar.id}"
                class="btn btn-dark w-100"
            >Agregar al Carrito</button>
        </div>
    `;
    return div;
}

function agregarAlCarrito(id) {
    const guitarra = db.find(g => g.id === id);
    const existeEnCarrito = carrito.find(g => g.id === id);

    if (existeEnCarrito) {
        existeEnCarrito.cantidad++;
    } else {
        carrito.push({ ...guitarra, cantidad: 1 });
    }

    renderCarrito();
}

function sumarCantidad(id) {
    const guitarra = carrito.find(g => g.id === id);
    guitarra.cantidad++;
    renderCarrito();
}

function restarCantidad(id) {
    const guitarra = carrito.find(g => g.id === id);
    guitarra.cantidad--;

    if (guitarra.cantidad === 0) {
        carrito = carrito.filter(g => g.id !== id);
    }

    renderCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(g => g.id !== id);
    renderCarrito();
}

function renderCarrito() {
    carritoBody.innerHTML = '';

    if (carrito.length === 0) {
        carritoTabla.style.display = 'none';
        carritoVacio.style.display = 'block';
        carritoTotal.textContent = '$0';
        return;
    }

    carritoTabla.style.display = 'table';
    carritoVacio.style.display = 'none';

    let total = 0;

    carrito.forEach(guitarra => {
        total += guitarra.precio * guitarra.cantidad;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img class="img-fluid" src="./public/img/${guitarra.imagen}.jpg" alt="imagen guitarra">
            </td>
            <td>${guitarra.nombre}</td>
            <td class="fw-bold">$${guitarra.precio}</td>
            <td>
                <button type="button" data-id="${guitarra.id}" class="btn btn-dark btn-restar">-</button>
                ${guitarra.cantidad}
                <button type="button" data-id="${guitarra.id}" class="btn btn-dark btn-sumar">+</button>
            </td>
            <td>
                <button type="button" data-id="${guitarra.id}" class="btn btn-danger">X</button>
            </td>
        `;
        carritoBody.appendChild(tr);
    });

    carritoTotal.textContent = `$${total}`;
}