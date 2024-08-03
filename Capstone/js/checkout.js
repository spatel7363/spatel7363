document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkoutForm');

    checkoutForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const cart = JSON.parse(localStorage.getItem('cart')) || {};

        // Prepare the order details
        const orderDetails = {
            name,
            email,
            address,
            cart
        };

        // Send order details to the server
        fetch('/submit-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Order confirmed! A confirmation email has been sent.');
                  localStorage.removeItem('cart'); // Clear the cart
                  window.location.href = 'index.html'; // Redirect to home page
              } else {
                  alert('There was an error processing your order. Please try again.');
              }
          });
    });
});
