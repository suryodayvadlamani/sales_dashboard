const db = require('../lib/db');

exports.getMakes = (req, res) => {
    
    db.all(`SELECT distinct make FROM Vehicles`, (err, rows) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows);
        }
    });
};