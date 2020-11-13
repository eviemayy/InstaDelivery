-- A) DATA DEFINITION QUERIES

CREATE TABLE customers (
    customerID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY(customerID),
    UNIQUE (email)
) ENGINE=InnoDB

CREATE TABLE products (
    productID INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price DECIMAL,  -- Need to include decimal places
    quantity INT,
    PRIMARY KEY(productID)
) ENGINE=InnoDB

CREATE TABLE orders (
    orderID INT AUTO_INCREMENT NOT NULL,
    customerID INT NOT NULL,
    delivererID INT,
    dateOrdered DATE NOT NULL,
    deliveryStatus VARCHAR(255) NOT NULL,
    departureTime TIME NOT NULL,
    arrivalTime TIME NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (customerID) REFERENCES customers(customerID),
    FOREIGN KEY (delivererID) REFERENCES deliverers(delivererID)
) ENGINE=InnoDB

CREATE TABLE payments (
    paymentID INT AUTO_INCREMENT NOT NULL,
    customerID INT NOT NULL,   -- Does not have to be UNIQUE
    cardNumber INT(19),
    bank VARCHAR(255) NOT NULL,
    ccv INT NOT NULL,
    expirationDate DATE NOT NULL,
    PRIMARY KEY (paymentID),
    FOREIGN KEY (customerID) REFERENCES customers(customerID) ON DELETE CASCADE
) ENGINE=InnoDB

CREATE TABLE deliverers (
    delivererID INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    PRIMARY KEY(delivererID)
) ENGINE=InnoDB

CREATE TABLE products_orders (
    productID INT NOT NULL,
    orderID INT NOT NULL,   
    FOREIGN KEY (productID) REFERENCES products(productID),
    FOREIGN KEY (orderID) REFERENCES orders(orderID)
) ENGINE=InnoDB

-- Include the CASCADE where necessary

-- B) SAMPLE DATA

-- sample customers

INSERT INTO customers (firstName, lastName, email, password, address)
VALUES ('Harry', 'Potter', 'potterh@hogwarts.com', 'dumbledor1234', '608 NW Folk St');

INSERT INTO customers (firstName, lastName, email, password, address)
VALUES ('Ron', 'Weasley', 'weasleyr@hogwarts.com', 'ilovehermoine8', '244 Magic Ln');

INSERT INTO customers (firstName, lastName, email, password, address)
VALUES ('Hermione', 'Granger', 'grangerh@hogwarts.com', 'HgaBc749', '710 Monroe Ave');

-- sample products

INSERT INTO products (name, description, price, quantity)
VALUES ('Apple', 'Fresh honeycrisp apples from golden orchard farms. Non GMO.',
2.99, 800);

INSERT INTO products (name, description, price, quantity)
VALUES ('Banana', 'Non organic yellow banana.', 0.69, 1000);

INSERT INTO products (name, description, price, quantity)
VALUES ('Kale', 'Organic, common curly kale.', 2.00, 500);

INSERT INTO products (name, description, price, quantity)
VALUES ('Potato', 'Yukon gold potato from Idaho.', 2.00, 1000);

INSERT INTO products (name, description, price, quantity)
VALUES ('Celery', 'Packages celery. Comes in a pack of approx. 10 stalks.', 2.50, 300);

INSERT INTO products (name, description, price, quantity)
VALUES ('Tomato', 'Roma tomatoes. Non GMO.', 0.69, 900);

INSERT INTO products (name, description, price, quantity)
VALUES (`Dave's Killer Bread`, `Dave's Killer Bread Good Seed Thin Sliced Organic.`, 5.49, 300);

INSERT INTO products (name, description, price, quantity)
VALUES ('Eggs', 'Cage free brown eggs.', 2.49, 300);

INSERT INTO products (name, description, price, quantity)
VALUES ('Milk', '2% Reduced Fat Milk.', 2.00, 550);

INSERT INTO products (name, description, price, quantity)
VALUES ('Greek Yogurt', 'Greek Gods Plain Traditional Greek Style Yogurt.', 3.79, 500);

INSERT INTO products (name, description, price, quantity)
VALUES ('Ice Cream', 'Tillamook cookie dough ice cream. 1.75 qt.', 5.99, 100);

INSERT INTO products (name, description, price, quantity)
VALUES ('Cheddar Cheese', 'Tillamook sharp cheddar cheese.', 3.79, 750);

-- sample deliverers

INSERT INTO deliverers (firstName, lastName)
VALUES ('Draco', 'Malfoy');

INSERT INTO deliverers (firstName, lastName)
VALUES ('Rubeus', 'Hagrid');

INSERT INTO deliverers (firstName, lastName)
VALUES ('Severus', 'Snape');