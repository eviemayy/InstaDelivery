CREATE DATABASE `InstaDelivery`;
USE `InstaDelivery`;

-- A) DATA DEFINITION QUERIES

DROP TABLE IF EXISTS `products_orders`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `deliverers`;

CREATE TABLE `customers` (
    `customerID` INT AUTO_INCREMENT NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    UNIQUE (`email`),
    PRIMARY KEY(`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `products` (
    `productID` INT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DECIMAL,  -- Need to include decimal places
    `quantity` INT,
    PRIMARY KEY(`productID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `deliverers` (
    `delivererID` INT AUTO_INCREMENT NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`delivererID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `payments` (
    `paymentID` INT AUTO_INCREMENT NOT NULL,
    `customerID` INT NOT NULL,   -- Does not have to be UNIQUE
    `cardNumber` INT(19),
    `bank` VARCHAR(255) NOT NULL,
    `ccv` INT NOT NULL,
    `expirationDate` DATE NOT NULL,
    PRIMARY KEY (`paymentID`),
    FOREIGN KEY (`customerID`) REFERENCES `customers`(`customerID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
    `orderID` INT AUTO_INCREMENT NOT NULL,
    `customerID` INT NOT NULL,
    `delivererID` INT,
    `dateOrdered` DATE NOT NULL,
    `deliveryStatus` VARCHAR(255) NOT NULL,
    `departureTime` TIME NOT NULL,
    `arrivalTime` TIME NOT NULL,
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`customerID`) REFERENCES customers(`customerID`),
    FOREIGN KEY (`delivererID`) REFERENCES deliverers(`delivererID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `products_orders` (
    `productID` INT NOT NULL,
    `orderID` INT NOT NULL,   
    FOREIGN KEY (`productID`) REFERENCES `products`(`productID`),
    FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Include the CASCADE where necessary

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


ALTER TABLE `payments` ADD UNIQUE (`customerID`);

ALTER TABLE `orders` MODIFY `departureTime` TIME null;

ALTER TABLE `orders` MODIFY `arrivalTime` TIME null;

ALTER TABLE `payments` MODIFY `cardNumber` BIGINT(19) NOT NULL;

ALTER TABLE `products_orders`
ADD CONSTRAINT `PK_products_orders` PRIMARY KEY (`productID`, `orderID`);

DELETE FROM `payments` WHERE `paymentID`=5;
DELETE FROM `payments` WHERE `paymentID`=11;
DELETE FROM `payments` WHERE `paymentID`=12;

DELETE FROM `products_orders` WHERE `orderID` = 2 AND `productID` = 5;
DELETE FROM `products_orders` WHERE `orderID` = 5 AND `productID` = 7;

ALTER TABLE `products_orders` DROP CONSTRAINT `products_orders_ibfk_1`;
ALTER TABLE `products_orders` DROP CONSTRAINT `products_orders_ibfk_2`;
ALTER TABLE `products_orders` DROP PRIMARY KEY;

ALTER TABLE `products_orders`
ADD CONSTRAINT `products_orders_ibfk_1`
FOREIGN KEY (`productID`) REFERENCES `products`(`productID`);

ALTER TABLE `products_orders`
ADD CONSTRAINT `products_orders_ibfk_2`
FOREIGN KEY (`orderID`) REFERENCES `orders`(`orderID`);

ALTER TABLE `products` MODIFY `price` decimal(10,2) null;