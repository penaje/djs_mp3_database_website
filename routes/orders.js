//ORDERS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');

router.get('/', function(req, res)
    {
        let query1;

        //IF NO QUERY STRING, DISPLAY ALL RESULTS
        if (req.query.order_name === undefined)
        {
            query1 = 'SELECT order_number, customer_id, DATE_FORMAT(order_date,"%c/%e/%Y") order_date, credit_card_number, credit_card_exp, total_cost FROM orders;'
        }

        //IF THERE IS A QUERY STRING
        else
        {
            console.log(req.query.order_name)

            name_to_search = req.query.order_name

            query1 = 'SELECT orders.order_number, customers.customer_id, orders.order_date, customers.credit_card_number, ' +
                    'customers.credit_card_exp, orders.total_cost FROM orders INNER JOIN customers ON orders.customer_id=customers.customer_id' +
                    ' WHERE customer_last_name="'+ name_to_search +'";';

            console.log(query1)
        }

        //query2 stays the same
        let query2 = 'SELECT * FROM customers'

        db.pool.query(query1, function(error, rows, fields){


            //Has all the orders info as key:value pairs
            let order_info = rows;

            db.pool.query(query2, (error, rows, fields) => {


                //Has all the customers info as a key:value pair
                let customer_info = rows;

                customer_map = {}


                //create an array with customer_id as key and customer_full_name as value
                customer_info.map(customer => {
                    let customer_id = parseInt(customer.customer_id, 10)

                    let customer_full_name = (customer['customer_first_name'] + " " + customer['customer_last_name'])

                    customer_map[customer_id] = customer_full_name;
                })

                console.log(customer_info)

                //replace the customer_id in orders with the customer_full_name from customer_map
                order_info = order_info.map(order => {
                    return Object.assign(order, {customer_id: customer_map[order.customer_id]})
                })

                console.log(order_info)

                let headers_list = ['Order Number', 'Customer', 'Order Date', 'Card Number', 'Card Exp', 'Total Cost']

                return res.render('orders', {headers: headers_list, data: order_info, customer_name: customer_info});
        })
    });

});


router.post('/add-orders-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO orders (customer_id, order_date, credit_card_number, credit_card_exp,
             total_cost) 
             VALUES ('${data['input-customerid']}', '${data['input-date']}',(SELECT credit_card_number FROM customers WHERE customer_id='${data['input-customerid']}'),
             (SELECT credit_card_exp FROM customers WHERE customer_id='${data['input-customerid']}'), 0.00)`;
              console.log(data)

    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our root route
        else
        {
            res.redirect('/orders');
        }
    })
})

module.exports = router;
