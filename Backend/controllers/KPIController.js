const db = require('../lib/db');

exports.getSales = (req, res) => {
    const {to, from, make} = req.query;

  let query = `SELECT
  sale_date,        
  COUNT(*) AS total_sales
FROM
  Sales S join Vehicles V on S.vehicle_id = V.vehicle_id
  where sale_date between '${from}' and '${to}' ${make && make.length? `and make in ('${make.join("','")}')`:''}
GROUP BY
CAST(sale_date as date)
ORDER BY
CAST(sale_date as date)
`

    db.all(query, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};

exports.getRevenue = (req, res) => {
    const {to, from, make} = req.query;
  
    db.all(`SELECT
    sale_date,     
    SUM(sale_price) AS total_revenue
FROM
Sales S join Vehicles V on S.vehicle_id = V.vehicle_id
    where sale_date between '${from}' and '${to}' ${make && make.length? `and make in ('${make.join("','")}')`:''}
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
    const { make} = req.query;
    db.all(`SELECT
    v.make,
    v.model,
    COUNT(*) AS quantity
FROM
    Vehicles v
    JOIN Inventory i ON v.vehicle_id = i.vehicle_id
    ${make && make.length? ` where make in ('${make.join("','")}')`:''}
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
