
-- Utilizar la base de datos creativoDB
USE creativoDB;

-- Crear la tabla PREGUNTAS
CREATE TABLE Question (
    IdQuestion INT IDENTITY(1,1) PRIMARY KEY,
    Question VARCHAR(255),
    Answer VARCHAR(255)
);


-- Create the table ENTREPRENEURSHIP ***************************
CREATE TABLE Entrepreneurship (
	IdEntrepreneurship INT PRIMARY KEY,
	Username VARCHAR(50),
	Type VARCHAR(50),
	Name VARCHAR(100),
	Email VARCHAR(100),
	Sinpe VARCHAR(20),
	Phone VARCHAR(20),
	Province VARCHAR(50),
	Canton VARCHAR(50),
	District VARCHAR(50),
	State VARCHAR(50), 
	IdType VARCHAR(50), 
	Description VARCHAR(500), 
	Reason VARCHAR(255)
);

CREATE TABLE Entrepreneurship_Type (
    type VARCHAR(50) PRIMARY KEY
);

CREATE TABLE Temp_Pass (
    Username VARCHAR(50) PRIMARY KEY, 
	Email VARCHAR(100),
	Pin INT, 
	State VARCHAR(50), 
	NewPass VARCHAR(50)
);

DELETE FROM Temp_Pass;

-- Create the table Client
CREATE TABLE Client (
	IdClient INT PRIMARY KEY,
	Username VARCHAR(50),
	Password VARCHAR(50),
	Email VARCHAR(100),
	FirstName VARCHAR(100),
	LastName VARCHAR(100),
	Phone VARCHAR(20),
	Province VARCHAR(50),
	Canton VARCHAR(50),
	District VARCHAR(50)
);



-- Create the table ENTREPRENEURSHIP ADMINS
CREATE TABLE Entrepreneurship_Admins (
	IdEntrepreneurship VARCHAR(50), 
	IdClient VARCHAR(50), 
	state VARCHAR(50),
	PRIMARY KEY (IdEntrepreneurship, IdClient)
	);



-- Create the table WORKSHOP
CREATE TABLE Workshop (
	IdEntrepreneurship VARCHAR(50),
	IdWorkshop INT IDENTITY(1,1) PRIMARY KEY,
	Name VARCHAR(100),
	Price DECIMAL(10, 2),
	Description VARCHAR(255),
	Link VARCHAR(255),
	Type VARCHAR(50)
);




-- Create the table WORKSHOP_PHOTOS
CREATE TABLE Workshop_Photos (
	IdWorkshop INT,
	Photo VARCHAR(255),
	PRIMARY KEY (IdWorkshop, Photo),
	FOREIGN KEY (IdWorkshop) REFERENCES Workshop(IdWorkshop)
);


-- Create the table WORKSHOP_CLIENT
CREATE TABLE Workshop_Client (
	IdWorkshop INT,
	IdClient VARCHAR(50),
	PRIMARY KEY (IdWorkshop, IdClient)
);


-- Create the table ADMIN
CREATE TABLE Admins (
	IdAdmin INT PRIMARY KEY,
	Username VARCHAR(50),
	Password VARCHAR(50),
	FirstName VARCHAR(100),
	LastName VARCHAR(100)
);

-- Create the table DELIVERY_PERSON
CREATE TABLE Delivery_Person (
	IdDeliveryPerson INT PRIMARY KEY,
	Username VARCHAR(50),
	Password VARCHAR(50),
	Firstname VARCHAR(100),
	Lastname VARCHAR(100),
	State VARCHAR(50),
	Province VARCHAR(50),
	Canton VARCHAR(50),
	District VARCHAR(50),
	Phone VARCHAR(20), 
	Email VARCHAR(100)
);


-- Create the table ORDER
CREATE TABLE Orders (
	IdOrder INT IDENTITY(1,1) PRIMARY KEY,
	Address VARCHAR(255),
	State VARCHAR(50),
	IdDeliveryPerson VARCHAR(50),
	IdClient VARCHAR(50)
);


CREATE TABLE Social_Type (
    type VARCHAR(50) PRIMARY KEY
);

-- Crear la tabla Social con clave primaria compuesta
CREATE TABLE Social (
    Username VARCHAR(50),
    Type VARCHAR(50),
    Link VARCHAR(500),
    PRIMARY KEY (Username, Type)
);










-- Create the table ROLE
CREATE TABLE Role (
	Username VARCHAR(50) PRIMARY KEY,
	Type VARCHAR(50)
);

CREATE TABLE Province (
	Name VARCHAR(50) PRIMARY KEY,
);

CREATE TABLE Canton (
	Name VARCHAR(50),
	Province VARCHAR(50),
	PRIMARY KEY (Name, Province)
);

CREATE TABLE Distric (
	Name VARCHAR(50),
	Canton VARCHAR(50),
	PRIMARY KEY (Name, Canton)
);


CREATE TRIGGER add_admin_rol ON Admins FOR INSERT AS 
BEGIN 
    INSERT INTO Role(Username, Type) SELECT Username, 'ADMIN' FROM inserted;
END

CREATE TRIGGER add_client_rol ON Client FOR INSERT AS 
BEGIN 
    INSERT INTO Role(Username, Type) SELECT Username, 'CLIENTE' FROM inserted;
END


CREATE TRIGGER add_repartidor_rol ON Delivery_Person FOR INSERT AS 
BEGIN 
    INSERT INTO Role(Username, Type) SELECT Username, 'REPARTIDOR' FROM inserted;
END


