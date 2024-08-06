// script.js

// Your existing code...

// Stripe integration
document.addEventListener('DOMContentLoaded', function () {
    const stripe = Stripe('your-public-key-here'); // Replace with your public key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const {token, error} = await stripe.createToken(cardElement);
        if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
        } else {
            // Send the token to your server
            const response = await fetch('/charge', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({token: token.id})
            });
            if (response.ok) alert('Payment successful!');
            else alert('Payment failed!');
        }
    });
});
