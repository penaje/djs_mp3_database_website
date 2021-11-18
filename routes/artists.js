//ARTISTS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM artists';

        db.pool.query(query1, function(error, rows, fields){

            let headers_list = ['Artist Id', 'Artist Name']
            
            res.render('artists', {headers: headers_list, data: rows});
        })
    });

router.post('/add-artists-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO artists (artist_name) 
             VALUES ("${data["input-artist-name"]}")`;
              console.log(data)
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/artists');
        }
    })
})

module.exports = router;
