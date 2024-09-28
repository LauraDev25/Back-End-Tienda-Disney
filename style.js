// Almacenar los productos en localStorage para que persistan en todas las páginas
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Lista de productos disponibles (esto debe estar en cada página que tenga productos)
const productos = [
    { nombre: 'Producto 1', precio: 50.000, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 2', precio: 75.000, imagen: 'https://via.placeholder.com/150' },
    { nombre: 'Producto 3', precio: 100.000, imagen: 'https://via.placeholder.com/150' },
];

// Mostrar productos en la página
function mostrarProductos() {
    const productList = document.getElementById('product-list');

    productos.forEach(producto => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <span>${producto.nombre}</span>
            <span>$${producto.precio.toFixed(3)}</span>
            <button onclick="addToCart('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        `;

        productList.appendChild(productDiv);
    });
}

// Función para agregar productos al carrito y guardar en localStorage
function addToCart(productName, price) {
    Swal.fire({
        title: 'Producto agregado',
        text: productName + ' ha sido agregado al carrito por $' + price.toFixed(3),
        icon: 'success',
        confirmButtonText: 'OK'
    });

    carrito.push({ nombre: productName, precio: price });
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar en localStorage
    updateCart(); // Actualizar el carrito
}

// Función para actualizar el carrito
function updateCart() {
    let cartCount = document.getElementById('cart-count');
    let cartItems = document.getElementById('cart-items');
    let totalPrice = document.getElementById('total-price');

    // Limpiar el contenido actual del carrito
    cartItems.innerHTML = '';

    // Variable para mantener el total
    let total = 0;

    // Recorrer los productos del carrito
    carrito.forEach((item, index) => {
        total += item.precio;

        let li = document.createElement('li');
        li.innerHTML = `${item.nombre} - $${item.precio.toFixed(3)}
            <button onclick="removeFromCart(${index})">Eliminar</button>`;
        cartItems.appendChild(li);
    });

    // Actualizar el contador y el precio total
    cartCount.innerText = carrito.length;
    totalPrice.innerText = total.toFixed(3);
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    carrito.splice(index, 1);  // Eliminar producto por índice
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito actualizado
    updateCart();  // Actualizar el carrito después de eliminar
}

// Función para vaciar el carrito
function clearCart() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Vaciar en localStorage
    updateCart();  // Actualizar el carrito después de vaciarlo
    Swal.fire({
        title: 'Carrito vacío',
        text: 'El carrito ha sido vaciado correctamente.',
        icon: 'info',
        confirmButtonText: 'OK'
    });
}

// Función para mostrar u ocultar el modal del carrito
function toggleCartModal() {
    let cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'block') ? 'none' : 'block';
}

// Cargar el carrito almacenado al iniciar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCart();  // Actualizar el carrito cuando se cargue la página
    mostrarProductos();  // Mostrar productos en la página
});
