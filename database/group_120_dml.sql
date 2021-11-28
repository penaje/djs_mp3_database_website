-- CUSTOMERS --
-- get all customer info to populate the customer page
    SELECT customer_id, customer_first_name, customer_last_name, customer_phone, customer_street, customer_apt,
    customer_city, customer_state, customer_zip, customer_email, credit_card_number, credit_card_exp FROM customers;

-- add a new customer
    INSERT INTO customers
        (customer_first_name, customer_last_name, customer_phone, customer_street, customer_apt,
        customer_city, customer_state, customer_zip, customer_email, credit_card_number, credit_card_exp)
    VALUES 
        (:f_name_input, :l_name_input, :phone_input, :street_input, :apt_input, :city_input, :state_input,
        :zip_input, :email_input, :cc_input, :cc_exp_input);

-- update a customer from customer_id
    UPDATE customers
    SET
        customer_first_name=:f_name_input,
        customer_last_name=:l_name_input,
        customer_phone=:phone_input,
        customer_street=:street_input,
        customer_apt=:apt_input,
        customer_city=:city_input,
        customer_state=:state_input,
        customer_zip=:zip_input,
        customer_email=:email_input,
        credit_card_number=:cc_input,
        credit_card_exp=:cc_exp_input
    WHERE
        customer_id=:selected_customer_id;


-- ORDERS --
-- get all order info to populate the order page
    SELECT order_number, customer_id, DATE_FORMAT(order_date,"%c/%e/%Y") order_date, credit_card_number, credit_card_exp, total_cost FROM orders;

-- add a new order
    INSERT INTO orders (customer_id, order_date, credit_card_number, credit_card_exp,
             total_cost) 
             VALUES ('${data['input-customerid']}', '${data['input-date']}',(SELECT credit_card_number FROM customers WHERE customer_id='${data['input-customerid']}'),
             (SELECT credit_card_exp FROM customers WHERE customer_id='${data['input-customerid']}'), 0.00);

-- get orders where customer_last_name is filter.
    SELECT orders.order_number, customers.customer_id, orders.order_date, customers.credit_card_number, ' +
                    'customers.credit_card_exp, orders.total_cost FROM orders INNER JOIN customers ON orders.customer_id=customers.customer_id' +
                    ' WHERE customer_last_name="'+ name_to_search +'";

-- ALBUMS --
-- get all album info to populate album page
    SELECT album_id, album_title, genre, DATE_FORMAT(release_date, "%m/%d/%Y") release_date FROM albums;

-- add a new album
    INSERT INTO albums 
        (album_title, genre, release_date)
    VALUES
        (:album_title_input, :genre_input, :release_date_input);

-- ARTISTS --
-- get all artist info to populate the artist page
    SELECT artist_id, artist_name FROM artists;

-- add a new artist
    INSERT INTO artists 
        artist_name
    VALUES
        :artist_name_input;

-- TRACKS --
-- get all tracks info to populate the tracks page
    SELECT track_id, title, artist_id, album_id, ind_price, album_price FROM artists;

-- add a new track
    INSERT INTO tracks 
        (title, artist_id, album_id, ind_price, album_price)
    VALUES
        (:title_input, :artist_id_input from drop down menu, :album_id_input from drop down menu, :album_price_input);

-- DOWNLOAD_ITEMS --
-- get all download_items info to populate the download_items page
    SELECT order_number, track_id, single FROM download_items;

-- add a new download_item (M:M relationship addition)
    INSERT INTO download_items 
        (order_number, track_id, single)
    VALUES
        (:order_number_input, :track_id_input, :single_input);

-- delete a download_item (M:M relationship deletion) 
    DELETE FROM download_items WHERE order_number=:order_number_input AND track_id=:track_id_input;

