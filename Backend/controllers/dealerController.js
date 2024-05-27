const db = require('../lib/db');

exports.topSalesPerson = (req, res) => {
    
    db.all(`
    SELECT
        sale_date,        
        COUNT(*) AS total_sales,
        SUM(sale_price) AS total_revenue
    FROM
        Sales S JOIN Salespersons SP on S.salesperson_id = SP.salesperson_id
    GROUP BY
    salesperson_id
    ORDER BY
    total_sales
    `, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};
exports.getDealers = (req, res) => {
    const {make} = req.query
    let query = `SELECT name, location, make, lat, long FROM 'Dealerships' D join Vehicles V on D.dealership_id=V.dealership_id`
    if(make && make.length)
        query = `${query} where make in ('${make.join("','")}')`
    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};

exports.topMakeSales = (req, res) => {
    const { make } = req.query;
    db.all(`
    SELECT
        make,        
        COUNT(*) AS total_sales,
        SUM(sale_price) AS total_revenue
        FROM Sales join vehicles on Sales.vehicle_id = vehicles.vehicle_id
        ${make && make.length ? ` where make in ('${make.join("','")}')` : ''}
    GROUP BY
    make
    ORDER BY
    total_sales
    `, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};
