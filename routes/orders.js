//ORDERS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT order_number, customer_id, order_date, credit_card_number, credit_card_exp, total_cost FROM orders';

        let query2 = 'SELECT * FROM customers'

        db.pool.query(query1, function(error, rows, fields){

            let order_info = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let first_names = rows;
                return res.render('orders', {data: order_info, first_names: first_names});
        })
    });

});

router.post('/add-orders-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO orders (customer_id, order_date, credit_card_number, credit_card_exp,
             total_cost) 
             VALUES ('${data['input-customerid']}', '${data['input-date']}','${data['input-card']}', '${data['input-cardexp']}',
              '${data['input-cost']}')`;
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
            res.redirect('/orders');
        }
    })
})

module.exports = router;
