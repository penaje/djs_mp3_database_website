//DOWNLOAD ITEMS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {   

        let query1 = 'SELECT * FROM download_items';

        let query2 = 'SELECT * FROM tracks';

        let query3 = 'SELECT * FROM orders';

        db.pool.query(query1, function(error, rows, fields){

            let download_items_info = rows;

            db.pool.query(query3, function(error, rows, fields){

                let orders_info = rows;
            

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

                

                    return res.render('download_items', {headers:headers_list, data: download_items_info, tracks_info: tracks_info, orders_info: orders_info, jsscripts:["deleteDownloadItems.js"]});
                })
        })
    });
});


router.post('/add-download-items-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    let order_number = data['input-order-number'];
    
    // Create the query and run it on the database
    query1 = `INSERT INTO download_items (order_number, track_id, single) 
             VALUES ("${data["input-order-number"]}", "${data["input-track-id"]}", "${data["input-single"]}")`;


    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

            else

             // If there was no error, we run our second query to update the order total and then redirect back to our root route

            query2 = `UPDATE orders
                      SET orders.total_cost = (
                      SELECT SUM(tracks.ind_price) 
                      FROM orders 
                      INNER JOIN download_items ON orders.order_number=download_items.order_number 
                      INNER JOIN tracks ON download_items.track_id=tracks.track_id
                      WHERE orders.order_number='${order_number}' AND download_items.single='1')
                      WHERE orders.order_number='${order_number}'`;

            db.pool.query(query2, function(error, rows, fields){
    
                // Check to see if there was an error
                if (error) {
        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }
                //if no error send back to download_items page
                else
                {
                    res.redirect('/download_items');
                }
        
        })
    
   
        
    })

    
})

router.delete('/order_number/:order_number/track_id/:track_id', function(req, res){
    console.log(req.params.order_number);
    console.log(req.params.track_id);

    let order_number = req.params.order_number;

    let query = 'DELETE FROM download_items WHERE order_number = ? AND track_id = ?';

    let inserts = [req.params.order_number, req.params.track_id]

    db.pool.query(query, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }        

        else


        query2 = `UPDATE orders
                  SET orders.total_cost = (
                  SELECT SUM(tracks.ind_price) 
                  FROM orders 
                  INNER JOIN download_items ON orders.order_number=download_items.order_number 
                  INNER JOIN tracks ON download_items.track_id=tracks.track_id
                  WHERE orders.order_number='${order_number}' AND download_items.single='1')
                  WHERE orders.order_number='${order_number}'`;

        db.pool.query(query2, function(error, rows, fields){
            console.log(query2)
    
            // Check to see if there was an error
            if (error) {
    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }

            else
                {
                res.status(202).end();
                }
        })
})
})

module.exports = router;
