document.addEventListener('DOMContentLoaded', () => {
    const learnMoreButton = document.getElementById('learnMore');
    learnMoreButton.addEventListener('click', () => {
        window.location.href = '#about';
    });
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, idx) => {
        slide.style.display = (idx === index) ? 'block' : 'none';
    });
}

function moveSlide(step) {
    currentSlide += step;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    showSlide(currentSlide);
}

document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlide); // Show initial slide
    document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
    document.querySelector('.next').addEventListener('click', () => moveSlide(1));
});

let currentMenuSlideIndex = 0;

function moveMenuSlide(step) {
    const slides = document.querySelectorAll('.menu-slide');
    slides[currentMenuSlideIndex].classList.remove('active');
    currentMenuSlideIndex += step;
    if (currentMenuSlideIndex >= slides.length) {
        currentMenuSlideIndex = 0;
    } else if (currentMenuSlideIndex < 0) {
        currentMenuSlideIndex = slides.length - 1;
    }
    slides[currentMenuSlideIndex].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    moveMenuSlide(0); // Initialize slider by showing the first slide
});

// order-now
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    const cartList = document.querySelector('.list-group');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.card-body').querySelector('.card-title').textContent;
            const productPrice = this.closest('.card-body').querySelector('.card-text').textContent;
            const cartItem = document.createElement('li');
            cartItem.classList.add('list-group-item');
            cartItem.textContent = productName + ' - ' + productPrice;
            cartList.appendChild(cartItem);
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    let cart = {};

    function addToCart(id, name, price) {
        if (cart[id]) {
            cart[id].qty += 1;
        } else {
            cart[id] = { name, price, qty: 1 };
        }
        renderCart();
    }

    function removeFromCart(id) {
        if (cart[id]) {
            if (cart[id].qty > 1) {
                cart[id].qty -= 1;
            } else {
                delete cart[id];
            }
            renderCart();
        }
    }

    function clearCart() {
        cart = {};
        renderCart();
    }

    function renderCart() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalContainer = document.getElementById('cartTotal');
        cartItemsContainer.innerHTML = '';
        let total = 0;

        Object.keys(cart).forEach(id => {
            const { name, price, qty } = cart[id];
            const itemElement = document.createElement('li');
            itemElement.textContent = `${name} - $${price} x ${qty}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remove';
            deleteBtn.onclick = () => removeFromCart(id);
            itemElement.appendChild(deleteBtn);
            cartItemsContainer.appendChild(itemElement);
            total += price * qty;
        });

        cartTotalContainer.textContent = total.toFixed(2);
    }

    // Example usage: Assuming button clicks for adding items
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            addToCart(id, name, price);
        });
    });
});



// clear cart

document.addEventListener('DOMContentLoaded', () => {
    const cart = {};
    const cartList = document.querySelector('.list-group');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');

    function addToCart(id, name, price) {
        if (cart[id]) {
            cart[id].qty += 1;
        } else {
            cart[id] = { name, price, qty: 1 };
        }
        renderCart();
    }

    function removeFromCart(id) {
        if (cart[id]) {
            if (cart[id].qty > 1) {
                cart[id].qty -= 1;
            } else {
                delete cart[id];
            }
            renderCart();
        }
    }

    function clearCart() {
        Object.keys(cart).forEach(id => delete cart[id]);
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        Object.keys(cart).forEach(id => {
            const { name, price, qty } = cart[id];
            const itemElement = document.createElement('li');
            itemElement.classList.add('list-group-item');
            itemElement.textContent = `${name} - $${price} x ${qty}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Remove';
            deleteBtn.onclick = () => removeFromCart(id);
            itemElement.appendChild(deleteBtn);

            cartItemsContainer.appendChild(itemElement);
            total += price * qty;
        });

        cartTotalContainer.textContent = total.toFixed(2);
        if (Object.keys(cart).length === 0) {
            cartList.innerHTML = '<li>Your cart is empty</li>';
        }
    }

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', () => {
            const cardBody = button.closest('.card-body');
            const id = cardBody.querySelector('.card-title').textContent.trim(); // Assuming titles are unique for simplicity
            const name = cardBody.querySelector('.card-title').textContent;
            const price = parseFloat(cardBody.querySelector('.card-text').textContent.replace(/^\$/, ''));

            addToCart(id, name, price);
        });
    });

    document.querySelector('button[onclick="clearCart()"]').addEventListener('click', clearCart);
});


// menu

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.closest('.card-body').querySelector('.card-title').innerText;
        const itemPrice = button.closest('.card-body').querySelector('.card-text').innerText;
        console.log(`Added ${itemName} at ${itemPrice} to cart`); // Replace with real cart handling logic
    });
});
