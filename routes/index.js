var express = require('express');

var router = express.Router();

//This file routes to the .js files to render the pages

router.use('/', require('./homepage.js'));

router.use('/customers', require('./customers.js'));

module.exports = router;

