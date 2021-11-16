var express = require('express');

var router = express.Router();

//This file routes to the .js files to render the pages

router.use('/', require('./homepage.js'));

router.use('/customers', require('./customers.js'));

router.use('/orders', require('./orders.js'));

router.use('/albums', require('./albums.js'));

module.exports = router;

