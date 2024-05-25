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
