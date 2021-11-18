//DOWNLOAD ITEMS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM download_items';

        let query2 = 'SELECT * FROM tracks';

        db.pool.query(query1, function(error, rows, fields){

            let download_items_info = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let tracks_info = rows;
                
                let headers_list = ['Order Number', 'Track ID', 'Single']

                return res.render('download_items', {headers:headers_list, data: download_items_info, tracks_info: tracks_info});
        })
    });
});

router.post('/add-download-items-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO download_items (order_number, track_id, single) 
             VALUES ("${data["input-order-number"]}", "${data["input-track-id"]}", "${data["input-single"]}")`;
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
            res.redirect('/download_items');
        }
    })
})

module.exports = router;
