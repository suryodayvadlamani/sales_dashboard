// seed.js
const fs = require('fs');
const path = require('path');
const db = require('./db');

const seedData = () => {
    const dataFilePaths = [
        'Customers',
        'Dealerships',
        'Salespersons',
        'Vehicles',
        'Sales',
        'AfterSalesService',
        'Inventory'
    ]
    dataFilePaths.forEach(fileLoc => {
        const filePath = path.resolve(__dirname, '..', 'data', `${fileLoc}.json`);
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let insertQuery = `INSERT INTO ${fileLoc} ( ${Object.keys(jsonData[0]).join(',')}) VALUES (${Object.keys(jsonData[0]).map(x=>'?').join(',')})`;
        jsonData.forEach(x => {
            db.run(insertQuery, Object.values(x) ,function(err) {
                if (err) {
                    return console.error(err.message);
                }
                
            });
        });
     
    })

};
module.exports = seedData;
