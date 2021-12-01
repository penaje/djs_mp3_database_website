//UPDATE CUSTOMERS .js file

var express = require('express');
var router = express.Router();
var db = require('../database/db-connector');


// function called by below get route to grab customer with matching id

function getCustomer(res, mysql, context, id, complete){
    let query = "SELECT * FROM customers WHERE customer_id = ?"
    let inserts = [id];
    db.pool.query(query, inserts, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.customer = results[0];
        complete();
    });
}

//get route that prefills update table with values of customer with matching customer id
router.get('/:id', function(req,res){
    callbackCount = 0;
    let context = {};
    context.jsscripts = ["updatecustomer.js"];
    let mysql = req.app.get('mysql');

    getCustomer(res, mysql, context, req.params.id, complete);
    function complete(){
        callbackCount ++;
        if (callbackCount >= 1){
            res.render('update_customers', context);
        }
    }
})


router.put('/:id', function(req, res){
    console.log(req.body);
    console.log(req.params.id);
    let data = req.body;

    // handle possible NULL insert for customer apartment
    let customer_apt = parseInt(data['input-apt']);
    if (isNaN(customer_apt)){
        customer_apt = 'NULL'
    }

    
    //new query
    let query = `UPDATE customers SET 
    customer_first_name='${data['input-fname']}', customer_last_name='${data['input-lname']}', customer_phone='${data['input-phone-number']}', 
    customer_street='${data['input-street']}', customer_apt=${customer_apt}, customer_city='${data['input-city']}', 
    customer_state='${data['input-state']}', customer_zip='${data['input-zip']}', customer_email='${data['input-email']}', 
    credit_card_number='${data['input-card']}', credit_card_exp='${data['input-cardexp']}' WHERE customer_id='${req.params.id}'`


    // test with new query
    db.pool.query(query, function(error, results, fields){
        if (error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            // res.render('customers')
            res.end();
        }
    } )


})


module.exports = router;
