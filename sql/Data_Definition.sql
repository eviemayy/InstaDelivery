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
    FOREIGN KEY (`customerID`) REFERENCES `customers`(`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orders` (
    `orderID` INT AUTO_INCREMENT NOT NULL,
    `customerID` INT NOT NULL,
    `delivererID` INT,
    `dateOrdered` DATE NOT NULL,
    `deliveryStatus` VARCHAR(255) NOT NULL,
    `departureTime` TIME,
    `arrivalTime` TIME,
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
