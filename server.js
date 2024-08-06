// server.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe')('your-secret-key-here'); // Replace with your secret key

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Other routes...

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

// Handle payment
app.post('/charge', async (req, res) => {
    try {
        const { token } = req.body;
        const charge = await stripe.charges.create({
            amount: 5000, // Amount in cents (for $50.00)
            currency: 'usd',
            source: token,
            description: 'Ebook Purchase'
        });
        res.status(200).send('Payment successful!');
    } catch (error) {
        res.status(500).send('Payment failed!');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
                 
