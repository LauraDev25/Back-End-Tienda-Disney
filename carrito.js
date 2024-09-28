let carrito = [];

// Cargar carrito desde Local Storage cuando se cargue la página
document.addEventListener('DOMContentLoaded', loadCart);

function loadCart() {
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
        carrito = JSON.parse(storedCart);
        updateCart();
    }
}

function addToCart(productName, price) {
    Swal.fire({
        title: 'Producto agregado',
        text: productName + ' ha sido agregado al carrito por $' + price.toFixed(3),
        icon: 'success',
        confirmButtonText: 'OK'
    });

    carrito.push({ nombre: productName, precio: price });
    updateCart();
}

function updateCart() {
    let cartCount = document.getElementById('cart-count');
    let cartItems = document.getElementById('cart-items');
    let totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        let li = document.createElement('li');
        li.innerHTML = `${item.nombre} - $${item.precio.toFixed(3)}
            <button onclick="removeFromCart(${index})" style="color:red;">Eliminar</button>`;
        cartItems.appendChild(li);
    });

    cartCount.innerText = carrito.length;
    totalPrice.innerText = total.toFixed(3);

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function removeFromCart(index) {
    carrito.splice(index, 1);
    updateCart();
}

function clearCart() {
    carrito = [];
    updateCart();
    localStorage.removeItem('carrito');

    Swal.fire({
        title: 'Carrito vaciado',
        text: 'Has vaciado tu carrito de compras.',
        icon: 'warning',
        confirmButtonText: 'OK'
    });
}
