document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');

    renderCart();

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        cartItemsContainer.innerHTML = '';
        let total = 0;

        Object.keys(cart).forEach(id => {
            const { name, price, qty } = cart[id];
            const itemElement = document.createElement('li');
            itemElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            itemElement.innerHTML = `
                <span>${name} - $${price}</span>
                <span class="badge badge-primary badge-pill">${qty}</span>
                <div>
                    <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity('${id}')">-</button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity('${id}')">+</button>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart('${id}')"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;

            cartItemsContainer.appendChild(itemElement);
            total += price * qty;
        });

        cartTotalContainer.textContent = total.toFixed(2);
        if (Object.keys(cart).length === 0) {
            cartItemsContainer.innerHTML = '<li class="list-group-item">Your cart is empty</li>';
        }
    }

    window.removeFromCart = function(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };

    window.clearCart = function() {
        localStorage.removeItem('cart');
        renderCart();
    };

    window.increaseQuantity = function(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            cart[id].qty += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    window.decreaseQuantity = function(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id] && cart[id].qty > 1) {
            cart[id].qty -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else {
            removeFromCart(id);
        }
    };
});
