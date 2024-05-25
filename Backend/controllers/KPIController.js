const db = require('../lib/db');

exports.getSales = (req, res) => {
    db.all(`SELECT
    sale_date,        
    COUNT(*) AS total_sales
FROM
    Sales
GROUP BY
CAST(sale_date as date)
ORDER BY
CAST(sale_date as date)`, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};

exports.getRevenue = (req, res) => {
    db.all(`SELECT
    sale_date,     
    SUM(sale_price) AS total_revenue
FROM
    Sales
GROUP BY
CAST(sale_date as date)
ORDER BY
CAST(sale_date as date);`, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};

exports.getInventory = (req, res) => {
    db.all(`SELECT
    v.make,
    v.model,
    COUNT(*) AS quantity
FROM
    Vehicles v
    JOIN Inventory i ON v.vehicle_id = i.vehicle_id
GROUP BY
    v.make, v.model
ORDER BY
    v.make, v.model`, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};
