const express = require('express');
const { retrieveOrders, retrieveOrder } = require('../controller/orders');

const router = express();

router.get('/getorders', retrieveOrders);

router.get('/:id', retrieveOrder);

module.exports = router;