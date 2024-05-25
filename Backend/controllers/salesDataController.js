const db = require('../lib/db');

exports.salesData = (req, res) => {
    
    db.all(`
    SELECT
        sale_date,        
        COUNT(*) AS total_sales,
        SUM(sale_price) AS total_revenue
    FROM
        Sales
    GROUP BY
    CAST(sale_date as date)
    ORDER BY
    CAST(sale_date as date);
    `, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};
exports.salesBreakdown = (req, res) => {
    
    db.all(`
    SELECT
    make,
    COUNT(*) AS total_sales
FROM
    Sales
    JOIN Vehicles ON Sales.vehicle_id = Vehicles.vehicle_id
GROUP BY
    make
ORDER BY
    make;
    `, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};
