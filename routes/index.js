var express = require('express');

var router = express.Router();

//This file routes to the .js files to render the pages

router.use('/', require('./homepage.js'));

router.use('/customers', require('./customers.js'));

router.use('/orders', require('./orders.js'));

router.use('/albums', require('./albums.js'));

router.use('/artists', require('./artists.js'));

router.use('/tracks', require('./tracks.js'));

router.use('/download_items', require('./download_items.js'));

// route for update customers page
router.use('/update_customers', require('./update_customers.js'));

module.exports = router;

