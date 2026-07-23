const express = require('express');
const router = express.Router();
const scorecardController = require('../controllers/scorecardController');
const aiController = require('../controllers/aiController');

// Scorecard & Dashboard Routes
router.get('/dashboard', scorecardController.getDashboard);
router.get('/categories', scorecardController.getCategories);
router.get('/category/:id', scorecardController.getCategoryById);
router.get('/countries', scorecardController.getCountries);
router.get('/country/:name', scorecardController.getCountryByName);
router.get('/compare', scorecardController.compareCountry);
router.get('/search', scorecardController.search);

// AI Insight Route
router.post('/ai-summary', aiController.generateSummary);

module.exports = router;
