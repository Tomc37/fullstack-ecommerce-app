const express = require('express');
const router = express.Router();
const path = require("path");

// Get routers
const auth = require('./auth.js');
const account = require('./account');
const cart = require('./cart');
const products = require('./products');
const orders = require('./orders');
const { appendFile } = require('fs');

router.use('/auth', auth);
router.use('/account', account);
router.use('/cart', cart);
router.use('/products', products);
router.use('/orders', orders);

router.use(express.static(path.join(__dirname, "..", "view", "build")));

router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "view", "build", "index.html"));
});

module.exports = router;