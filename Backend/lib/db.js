const { LIMIT_WORKER_THREADS } = require('sqlite3');

// db.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db');


db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS cars`);
    db.run(`DROP TABLE IF EXISTS Customers`);
    db.run(`DROP TABLE IF EXISTS Dealerships`);
    db.run(`DROP TABLE IF EXISTS Salespersons`);
    db.run(`DROP TABLE IF EXISTS Vehicles`);
    db.run(`DROP TABLE IF EXISTS Sales`);
    db.run(`DROP TABLE IF EXISTS AfterSalesService`);
    db.run(`DROP TABLE IF EXISTS Inventory`);
    db.run(`CREATE TABLE Customers (
        customer_id  PRIMARY KEY ,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        phone_number VARCHAR(15),
        address VARCHAR(255),
        city VARCHAR(50),
        state VARCHAR(50),
        zip_code VARCHAR(10),
        registration_date DATE
)`);

    db.run(`CREATE TABLE Dealerships (
        dealership_id  PRIMARY KEY ,
        name VARCHAR(100),
        location VARCHAR(255),
        phone_number VARCHAR(15),
        email VARCHAR(100),
        manager_name VARCHAR(50)
)`);

    db.run(` CREATE TABLE Salespersons (
        salesperson_id  PRIMARY KEY ,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        email VARCHAR(100),
        phone_number VARCHAR(15),
        hire_date DATE,
        dealership_id INT REFERENCES Dealerships(dealership_id)
)`);

    db.run(`CREATE TABLE Vehicles (
        vehicle_id  PRIMARY KEY ,
        make VARCHAR(50),
        model VARCHAR(50),
        year INT,
        vin VARCHAR(17) UNIQUE,
        color VARCHAR(30),
        mileage INT,
        price DECIMAL(10, 2),
        status VARCHAR(20),
        dealership_id INT REFERENCES Dealerships(dealership_id)
)`);

    db.run(` CREATE TABLE Sales (
        sale_id  PRIMARY KEY ,
        customer_id INT REFERENCES Customers(customer_id),
        vehicle_id INT REFERENCES Vehicles(vehicle_id),
        salesperson_id INT REFERENCES Salespersons(salesperson_id),
        dealership_id INT REFERENCES Dealerships(dealership_id),
        sale_date DATE,
        sale_price DECIMAL(10, 2),
        payment_method VARCHAR(30),
        warranty_included BOOLEAN
)`);

    db.run(`CREATE TABLE AfterSalesService (
        service_id  PRIMARY KEY ,
        sale_id INT REFERENCES Sales(sale_id),
        service_date DATE,
        service_description TEXT,
        service_cost DECIMAL(10, 2),
        service_provider VARCHAR(100)
)`);
    db.run(`CREATE TABLE Inventory (
        inventory_id SERIAL PRIMARY KEY,
        vehicle_id INT NOT NULL,
        dealership_id INT NOT NULL,
        stock_quantity INT NOT NULL,
        date_added DATE NOT NULL,
        status VARCHAR(50) NOT NULL,
        FOREIGN KEY (vehicle_id) REFERENCES Vehicles(vehicle_id),
        FOREIGN KEY (dealership_id) REFERENCES Dealerships(dealership_id)
)`);

});
module.exports = db;
