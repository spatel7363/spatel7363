document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.col-sm-6, .col-md-4, .col-lg-3');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = parseFloat(card.getAttribute('data-price'));

            addToCart(id, name, price);
            window.location.href = 'order-now.html';
        });
    });

    function addToCart(id, name, price) {
        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[id]) {
            cart[id].qty += 1;
        } else {
            cart[id] = { name, price, qty: 1 };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
