-- B) SAMPLE DATA

-- sample customers

INSERT INTO `customers` (`firstName`, `lastName`, `email`, `password`, `address`)
VALUES ('Harry', 'Potter', 'potterh@hogwarts.com', 'dumbledor1234', '608 NW Folk St');

INSERT INTO `customers` (`firstName`, `lastName`, `email`, `password`, `address`)
VALUES ('Ron', 'Weasley', 'weasleyr@hogwarts.com', 'ilovehermoine8', '244 Magic Ln');

INSERT INTO `customers` (`firstName`, `lastName`, `email`, `password`, `address`)
VALUES ('Hermione', 'Granger', 'grangerh@hogwarts.com', 'HgaBc749', '710 Monroe Ave');

-- sample products

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Apple', 'Fresh honeycrisp apples from golden orchard farms. Non GMO.',
2.99, 800);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Banana', 'Non organic yellow banana.', 0.69, 1000);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Kale', 'Organic, common curly kale.', 2.00, 500);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Potato', 'Yukon gold potato from Idaho.', 2.00, 1000);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Celery', 'Packages celery. Comes in a pack of approx. 10 stalks.', 2.50, 300);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Tomato', 'Roma tomatoes. Non GMO.', 0.69, 900);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Dave''s Killer Bread', 'Dave''s Killer Bread Good Seed Thin Sliced Organic.', 5.49, 300);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Eggs', 'Cage free brown eggs.', 2.49, 300);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Milk', '2% Reduced Fat Milk.', 2.00, 550);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Greek Yogurt', 'Greek Gods Plain Traditional Greek Style Yogurt.', 3.79, 500);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Ice Cream', 'Tillamook cookie dough ice cream. 1.75 qt.', 5.99, 100);

INSERT INTO `products` (`name`, `description`, `price`, `quantity`)
VALUES ('Cheddar Cheese', 'Tillamook sharp cheddar cheese.', 3.79, 750);

-- sample deliverers

INSERT INTO `deliverers` (`firstName`, `lastName`)
VALUES ('Draco', 'Malfoy');

INSERT INTO `deliverers` (`firstName`, `lastName`)
VALUES ('Rubeus', 'Hagrid');

INSERT INTO `deliverers` (`firstName`, `lastName`)
VALUES ('Severus', 'Snape');

-- sample payments

INSERT INTO `payments` (`customerID`, `cardNumber`, `bank`, `ccv`, `expirationDate`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Harry' AND `lastName` = 'Potter'),
12345678910, 'Gringotts Wizarding Bank', 843, '2022-03-20');

INSERT INTO `payments` (`customerID`, `cardNumber`, `bank`, `ccv`, `expirationDate`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Ron' AND `lastName` = 'Weasley'),
45678925347, 'Gringotts Wizarding Bank', 799, '2022-04-06');

INSERT INTO `payments` (`customerID`, `cardNumber`, `bank`, `ccv`, `expirationDate`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Hermione' AND `lastName` = 'Granger'),
12121212121, 'Gringotts Wizarding Bank', 523, '2023-05-14');

-- sample orders

INSERT INTO `orders` (`customerID`, `delivererID`, `dateOrdered`, `deliveryStatus`, `departureTime`, `arrivalTime`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Harry' AND `lastName` = 'Potter'), 
(SELECT `delivererID` FROM `deliverers` WHERE `firstName` = 'Draco' AND `lastName` = 'Malfoy'),
'2020-11-13', 'Complete', '04:33:19', '05:02:47');

INSERT INTO `orders` (`customerID`, `delivererID`, `dateOrdered`, `deliveryStatus`, `departureTime`, `arrivalTime`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Ron' AND `lastName` = 'Weasley'), 
(SELECT `delivererID` FROM `deliverers` WHERE `firstName` = 'Draco' AND `lastName` = 'Malfoy'),
'2020-11-10', 'Complete', '12:30:22', '01:05:09');

INSERT INTO `orders` (`customerID`, `delivererID`, `dateOrdered`, `deliveryStatus`, `departureTime`, `arrivalTime`)
VALUES ((SELECT `customerID` FROM `customers` WHERE `firstName` = 'Hermione' AND `lastName` = 'Granger'), 
(SELECT `delivererID` FROM `deliverers` WHERE `firstName` = 'Severus' AND `lastName` = 'Snape'),
'2020-11-10', 'Complete', '06:02:19', '06:48:27');

-- sample products_orders

INSERT INTO `products_orders` (`productID`, `orderID`)
VALUES ((SELECT `productID` FROM `products` WHERE `name` = 'Ice Cream'), 
(SELECT `orderID` FROM `customers` INNER JOIN `orders` ON orders.customerID = customers.customerID 
WHERE `firstName` = 'Harry' AND `lastName` = 'Potter'));

INSERT INTO `products_orders` (`productID`, `orderID`)
VALUES ((SELECT `productID` FROM `products` WHERE `name` = 'Eggs'), 
(SELECT `orderID` FROM `customers` INNER JOIN `orders` ON orders.customerID = customers.customerID 
WHERE `firstName` = 'Hermione' AND `lastName` = 'Granger'));

INSERT INTO `products_orders` (`productID`, `orderID`)
VALUES ((SELECT `productID` FROM `products` WHERE `name` = 'Potato'), 
(SELECT `orderID` FROM `customers` INNER JOIN `orders` ON orders.customerID = customers.customerID 
WHERE `firstName` = 'Ron' AND `lastName` = 'Weasley'));

-- SELECT QUERIES
-- Select all data, this will need to change to specify the exact attributes

SELECT * FROM `customers`;
SELECT * FROM  `products`;
SELECT * FROM  `deliverers`;
SELECT * FROM  `payments`;
SELECT * FROM  `orders`;
SELECT * FROM  `products_orders`;

-- UPDATE QUERIES

-- update order assignment for deliverer
UPDATE `orders`
SET
`delivererID` = NULL
WHERE `orderID` = $order_id_input;

-- update quantity of products
UPDATE `products`
SET
`quantity` =  $quantity_input
WHERE `pruductsID` = $product_id_input;

-- update status on order
UPDATE `orders`
SET
`arrivalTime` =  $arrival_time_input,
`deliveryStatus` = $order_id_input,
`departureTime` = $departureTime_input
WHERE `orderID` = $order_id_input;

-- update a payment method
UPDATE `payments`
SET
`cardNumber` =  $arrival_time_input,
`bank` = $order_id_input,
`ccv` = $departureTime_input,
`expirationDate` = $departureTime_input
WHERE `paymentID` = $payment_id_input;

-- DELETE QUERIES

DELETE FROM `orders` WHERE `orderID`= $order_id_input;
DELETE FROM `products` WHERE `productID`= $product_id_input;
DELETE FROM `payments` WHERE `paymentID`= $payment_id_input;
DELETE FROM `customers` WHERE `customerID`= $customer_id_input;
DELETE FROM `deliverers` WHERE `delivererID`= $deliverer_id_input;





