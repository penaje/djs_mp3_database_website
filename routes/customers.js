//CUSTOMERS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1 = 'SELECT * FROM customers';

        db.pool.query(query1, function(error, rows, fields){
            
            res.render('customers', {data: rows});
        })
    });

router.post('/add-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
        // Capture NULL values
    let customer_apt = parseInt(data['input-apt']);
    if (isNaN(customer_apt))
    {
        customer_apt = 'NULL'
    }
    
    // Create the query and run it on the database
    query1 = `INSERT INTO customers (customer_first_name, customer_last_name, customer_phone, customer_street,
             customer_apt, customer_city, customer_state, customer_zip, customer_email, credit_card_number, credit_card_exp) 
             VALUES ('${data['input-fname']}', '${data['input-lname']}','${data['input-pnumber']}', '${data['input-street']}',
              ${customer_apt}, '${data['input-city']}', '${data['input-state']}', '${data['input-zip']}', '${data['input-email']}',
              '${data['input-card']}', '${data['input-cardexp']}')`;
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
            res.redirect('/customers');
        }
    })
})

module.exports = router;
