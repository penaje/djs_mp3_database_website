//This is the setup file

// Express
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// PORT = 9215; port I used
PORT = 5357;

// Database
var db = require('./database/db-connector');

// Handlebars
app.use(express.static('public'));
var routes = require('./routes/index.js')
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


/*
    ROUTES
*/
app.use('/', routes);

app.use(require('./routes/index.js'));



app.listen(PORT, function(){
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
