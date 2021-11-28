
-- Table structure for table `customers`

DROP TABLE IF EXISTS customers;
CREATE TABLE customers (
customer_id int(11) NOT NULL AUTO_INCREMENT,
customer_first_name varchar(255) NOT NULL,
customer_last_name varchar(255) NOT NULL,
customer_phone char(11) NOT NULL,
customer_street varchar(255) NOT NULL,
customer_apt varchar(255),
customer_city varchar(255) NOT NULL,
customer_state char(2) NOT NULL,
customer_zip char(5) NOT NULL,
customer_email varchar(255) NOT NULL, 
credit_card_number char(16) NOT NULL,
credit_card_exp char(4) NOT NULL,
PRIMARY KEY (customer_id)
) ENGINE=InnoDB;

-- Data dump into table `customers`

INSERT INTO customers (customer_first_name, customer_last_name, customer_phone, customer_street, 
customer_city, customer_state, customer_zip, customer_email,
 credit_card_number, credit_card_exp)
 VALUES 
	('Daniel', 'Peng', '714-878-0034', 'North Blossom St', 'Fountain Valley', 
    'CA', '92708', 'danielpeng@gmail.com', '2543456765437678', '0928');


-- Table structure for table `orders`

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
	order_number int(11) NOT NULL AUTO_INCREMENT,
    customer_id int(11) NOT NULL,
    order_date date NOT NULL,
    credit_card_number char(16) NOT NULL,
    credit_card_exp char(4) NOT NULL,
    total_cost int(10) NOT NULL,
    PRIMARY KEY (order_number),
    CONSTRAINT
    FOREIGN KEY (customer_id)
		REFERENCES customers(customer_id)
) ENGINE=InnoDB;

-- Data dump into table `orders`

INSERT INTO orders (customer_id, order_date, credit_card_number, credit_card_exp, total_cost)
VALUES (1, '2021-08-08', '2543456765437678', '0928', 28.89);

-- Table structure for table `artists`

DROP TABLE IF EXISTS artists;
CREATE table artists(
	artist_id int(11) NOT NULL AUTO_INCREMENT,
    artist_name varchar(255) NOT NULL,
    PRIMARY KEY (artist_id)
) ENGINE=InnoDB;

-- Data dump into table `artists`

INSERT INTO artists (artist_name)
VALUES ('John Coltrane'),
		('Thelonius Monk'),
        ('Herbert von Karajan'),
        ('Claudio Abbado'),
        ('Fred Hersch'),
        ('Richard Strauss'),
        ('Richard Wagner');


-- Table structure for table `albums`

DROP TABLE IF EXISTS albums;
CREATE table albums(
	album_id int(11) NOT NULL AUTO_INCREMENT,
    album_title varchar(255) NOT NULL,
    genre varchar(255),
    release_date date,
    PRIMARY KEY (album_id)
) ENGINE = InnoDB;


-- Data dump for table `albums`
INSERT INTO albums (album_title, genre)
	VALUES ('A Love Supreme', 'jazz'),
			('Giant Steps', 'jazz'),
			('Die Frau Ohne Schatten', 'classical'),
            ('Salome', 'classical'),
            ('Gotterdammerung', 'classical');


-- Table structure for table `tracks`

DROP TABLE IF EXISTS tracks;
CREATE table tracks (
	track_id int(11) NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    artist_id int(11) NOT NULL,
    album_id int(11) NOT NULL,
    ind_price int(11) NOT NULL, -- price if purchased individually
    album_price int(11) NOT NULL, -- price if purchased as part of album
    PRIMARY KEY (track_id),
    CONSTRAINT
    FOREIGN KEY (artist_id)
		REFERENCES artists(artist_id),
	CONSTRAINT
    FOREIGN KEY (album_id)
		REFERENCES albums(album_id)
) ENGINE=InnoDB;

INSERT INTO tracks (title, artist_id, album_id, ind_price, album_price)
VALUES ('Acknowledgement', 1, 1, 0.99, 0.75),
		('Vorspiel', 7, 5, 0.99, 0.75);

-- Table structure for table `download_items`

DROP TABLE IF EXISTS download_items;
CREATE table download_items (
    order_number int(11) NOT NULL,
    track_id int(11) NOT NULL,
    single bool NOT NULL,
    PRIMARY KEY (order_number, track_id),
    CONSTRAINT 
    FOREIGN KEY (order_number) REFERENCES orders(order_number),
    CONSTRAINT
    FOREIGN KEY (track_id) REFERENCES tracks(track_id)
)ENGINE=InnoDB;

INSERT INTO download_items (order_number, track_id, single) VALUES (
    (SELECT order_number FROM orders WHERE order_number = '1'),
    (SELECT track_id FROM tracks WHERE title = 'Vorspiel'),
    '1'
);

