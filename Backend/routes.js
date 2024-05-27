// routes.js
const express = require('express');
const router = express.Router();
const salesController = require('./controllers/salesDataController');
const kpiController = require('./controllers/KPIController');
const dealerController = require('./controllers/dealerController');
const filterController = require('./controllers/filterController');

// Define routes

router.get('/sales-data', salesController.salesData);
router.get('/sales-breakdown', salesController.salesBreakdown);
router.get('/salesMakeModel', salesController.salesMakeModel);
router.get('/sales', kpiController.getSales);
router.get('/revenue', kpiController.getRevenue);
router.get('/inventory', kpiController.getInventory);
router.get('/topSalesPerson', dealerController.topSalesPerson);
router.get('/getDealers', dealerController.getDealers);
router.get('/topMakeSales', dealerController.topMakeSales);
router.get('/getMakes', filterController.getMakes);

module.exports = router;
