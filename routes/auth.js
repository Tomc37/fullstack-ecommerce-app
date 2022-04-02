const express = require('express');
const passport = require('passport');
const { createUser } = require('../controller/auth');

// Initialise Express
const router = express();

// New account creation

router.post('/register', createUser);

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  // console.log(req.user);
    res.status(200).send(req.user);
});

router.get('/logout', (req, res, next) => {
  // console.log(req.user);
  req.logout();
  res.sendStatus(200);
})

module.exports = router;