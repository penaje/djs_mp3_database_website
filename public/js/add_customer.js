// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputLastName = document.getElementById("input-lname");
    let inputPhone = document.getElementById("input-phone");
    let inputStreet = document.getElementById("input-street");
    let inputApt = document.getElementById("input-apt");
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputZip = document.getElementById("input-zip");
    let inputEmail = document.getElementById("input-email");
    let inputCard = document.getElementById("input-card");
    let inputCardExp = document.getElementById("input-cardexp");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let phoneValue = inputPhone.value;
    let streetValue = inputStreet.value;
    let aptValue = inputApt.value;
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let zipValue = inputZip.value;
    let emailValue = inputEmail.value;
    let cardValue = inputCard.value;
    let cardExpValue = inputCardExp.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_first_name: firstNameValue,
        customer_last_name: lastNameValue,
        customer_phone: phoneValue,
        customer_street: streetValue,
        customer_apt: aptValue,
        customer_city: cityValue,
        customer_state: stateValue,
        customer_zip: zipValue,
        customer_email: emailValue,
        credit_card_number: cardValue,
        credit_card_exp: cardExpValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPhone.value = '';
            inputStreet.value = '';
            inputApt.value = '';
            inputCity.value = '';
            inputState.value = '';
            inputZip.value = '';
            inputEmail.value = '';
            inputCard.value = '';
            inputCardExp.value = '';
        
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let streetCell = document.createElement("TD");
    let aptCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let cardCell = document.createElement("TD");
    let cardExpCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customer_id;
    firstNameCell.innerText = newRow.customer_first_name;
    lastNameCell.innerText = newRow.customer_last_name;
    phoneCell.innerText = newRow.customer_phone;
    streetCell.innerText = newRow.customer_street;
    aptCell.innerText = newRow.customer_apt;
    cityCell.innerText = newRow.customer_city;
    stateCell.innerText = newRow.customer_state;
    zipCell.innerText = newRow.customer_zip;
    emailCell.innerText = newRow.customer_email;
    cardCell.innerText = newRow.credit_card_number;
    cardExpCell.innerText = newRow.credit_card_exp;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(phoneCell);
    row.appendChild(streetCell);
    row.appendChild(aptCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(zipCell);
    row.appendChild(emailCell);
    row.appendChild(cardCell);
    row.appendChild(cardExpCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}