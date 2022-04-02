const express = require('express');
const { retrieveCart, retrieveCartProducts, updateCartAmount, deleteFromCart, submitOrder } = require('../controller/cart');

// Initialise Express
const router = express();

router.get("/", retrieveCart);

router.post('/checkout', retrieveCartProducts);

router.put('/checkout/updateamount', updateCartAmount);

router.delete('/checkout/delete', deleteFromCart);

router.post('/checkout/submitorder', submitOrder);

module.exports = router;