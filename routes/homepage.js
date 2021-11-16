//HOMEPAGE .js file

var express = require('express');

var router = express.Router();

var db = require('../database/db-connector');

router.get('/', function(req, res)
    {           
        res.render('index');
    });
    
module.exports = router;