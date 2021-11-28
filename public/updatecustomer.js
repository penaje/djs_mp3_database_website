//ajax call to PUT rout on update_customers.js

function updateCustomer(id){
    $.ajax({
        url: '/update_customers/' + id,
        type: 'PUT',
        data: $('#update-customer-form').serialize(),
        success: function(result){
            console.log('success');
            window.location.replace("/customers");
        }
    })
};