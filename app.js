/*
    SETUP
*/

// Express
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
PORT = 6915;

// Database
var db = require('./database/db-connector');

// Handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM bsg_people';

        db.pool.query(query1, function(error, rows, fields){
            
            res.render('index', {data: rows});
        })
    });

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});