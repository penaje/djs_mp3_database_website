//TRACKS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM tracks';

        let query2 = 'SELECT * FROM artists';

        let query3 = 'SELECT * FROM albums'

        db.pool.query(query1, function(error, rows, fields){

            let track_info=rows;

            db.pool.query(query2, (error, rows, fields) => {

                let artist_info = rows;

                db.pool.query(query3, (error, rows, fields) => {

                    let album_info=rows;
                    return res.render('tracks', {data: track_info, artist_info: artist_info, album_info: album_info});
        })
    });
})
});

router.post('/add-tracks-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO tracks (title, artist_id, album_id, ind_price, album_price) 
             VALUES
              ('${data['input-title']}', '${data['input-artist-id']}','${data['input-album-id']}',
              '${data['input-ind-price']}', '${data['input-album-price']}')`;
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
            res.redirect('/tracks');
        }
    })
})

module.exports = router;
