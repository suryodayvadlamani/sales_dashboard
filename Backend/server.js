// server.js
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const seedData = require('./lib/seed');

const app = express();
const port = 8000;
app.use(cors());
// Use routes defined in routes.js
app.use('/', routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    seedData()
});
