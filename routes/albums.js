//ALBUMS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT album_id, album_title, genre, DATE_FORMAT(release_date, "%m/%d/%Y") release_date FROM albums';

        db.pool.query(query1, function(error, rows, fields){

            let headers_list = ['Album Id', 'Album Title', 'Genre', 'Release Date']
            
            res.render('albums', {headers: headers_list, data: rows});
        })
    });

router.post('/add-albums-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let genre = (data['input-genre']); 

    if (genre === undefined){
        genre = 'NULL'
    }
    if (genre === '') {
        genre = 'NULL'
    }
    else
        //append quotations marks to denote string 
        genre = "'" + data['input-genre'] + "'"

    let release_date = (data['input-release-date']);
    if (release_date === undefined) {
        release_date = 'NULL'
    }
    if (release_date === '') {
        release_date = 'NULL'
    }
    else
    //append quotations marks to denote string 
    release_date = "'" + data['input-release-date'] + "'"


    
    // Create the query and run it on the database
    query1 = `INSERT INTO albums (album_title, genre, release_date) 
             VALUES ("${data["input-album-title"]}", ${genre}, ${release_date})`;

              console.log(data)
              console.log(query1)
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
            res.redirect('/albums');
        }
    })
})

module.exports = router;
