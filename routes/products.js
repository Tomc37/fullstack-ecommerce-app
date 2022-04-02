const express = require('express')
const { retrieveProducts, addToCart } = require('../controller/products');

const router = express();

router.get('/getproducts', retrieveProducts)

router.post('/addtocart', addToCart);

module.exports = router;