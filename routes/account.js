const express = require('express');
const { changeEmail, changePassword } = require('../controller/account');

// Initialise Express
const router = express();

router.put('/email', changeEmail);

router.put('/password', changePassword)

module.exports = router;