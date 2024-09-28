// Función para obtener los datos del carrito del almacenamiento local
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar los datos del carrito en el almacenamiento local
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para actualizar el carrito en la interfaz
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    const cart = getCart();
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <li class="cart-item">
                ${item.name} - $${item.price.toFixed(3)}
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </li>
        `;
    });

    totalPriceElement.textContent = total.toFixed(3);
    cartCount.textContent = cart.length;
}

// Función para agregar un artículo al carrito
function addToCart(itemName, itemPrice) {
    const cart = getCart();
    cart.push({ name: itemName, price: itemPrice });
    saveCart(cart);
    updateCart();
}

// Función para eliminar un artículo del carrito
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateCart();
}

// Función para vaciar el carrito
function clearCart() {
    saveCart([]);
    updateCart();
}

// Función para alternar la visibilidad del carrito
function toggleCart() {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

// Inicializa el carrito cuando la página se carga
window.onload = updateCart;






