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
    const { make } = req.query;

    const query = `
    SELECT
    make,
    COUNT(*) AS total_sales
FROM
    Sales
    JOIN Vehicles ON Sales.vehicle_id = Vehicles.vehicle_id ${make && make.length ? ` where make in ('${make.join("','")}')` : ''}
GROUP BY
    make
ORDER BY
    make;
    `

    db.all(query, (err, rows) => {
        if (err) {

            res.status(500).send('Internal Server Error');
        } else {

            res.json(rows);
        }
    });
};
exports.salesMakeModel = (req, res) => {
    const { to, from } = req.query;
    db.all(`
    SELECT
     sale_date, make, model,sale_price
    FROM Sales join vehicles on Sales.vehicle_id = vehicles.vehicle_id
    where sale_date between '${from}' and '${to}'
    ORDER BY sale_date desc
    `, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {

            res.json(rows);
        }
    });
};
