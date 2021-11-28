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

                //create the track map
                tracks_map = {}


                //map the track_id to track_title
                tracks_info.map(track => {
                    let track_id = parseInt(track.track_id, 10)

                    tracks_map[track_id] = track['title'];
                })

                //replace the track_id in download_info with the title from track_map
                download_items_info = download_items_info.map(download_item => {
                    return Object.assign(download_item, {track_id: tracks_map[download_item.track_id], track_num: download_item.track_id})
                })
                
                let headers_list = ['Order Number', 'Track Numerical ID','Track Name', 'Single'];

                

                return res.render('download_items', {headers:headers_list, data: download_items_info, tracks_info: tracks_info, jsscripts:["deleteDownloadItems.js"]});
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

router.delete('/order_number/:order_number/track_id/:track_id', function(req, res){
    console.log(req.params.order_number);
    console.log(req.params.track_id);
    let query = 'DELETE FROM download_items WHERE order_number = ? AND track_id = ?';
    let inserts = [req.params.order_number, req.params.track_id]
    db.pool.query(query, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})

module.exports = router;
