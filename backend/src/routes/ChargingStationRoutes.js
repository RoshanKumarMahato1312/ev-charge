// src/routes/ChargingStationRoutes.js
const express = require('express');
const router = express.Router();

console.log('Initializing charging station routes...');

const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
  searchStationsByLocation,
  updateAvailability
} = require('../controllers/chargingStationController');

// Debug: Check what was imported
console.log('Controllers loaded:', {
  getAllStations: typeof getAllStations,
  getStationById: typeof getStationById,
  createStation: typeof createStation,
  updateStation: typeof updateStation,
  deleteStation: typeof deleteStation,
  searchStationsByLocation: typeof searchStationsByLocation,
  updateAvailability: typeof updateAvailability
});

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Router is working!' });
});

// Main routes
router.route('/')
  .get(getAllStations)
  .post(createStation);

router.get('/search', searchStationsByLocation);

router.route('/:id')
  .get(getStationById)
  .put(updateStation)
  .delete(deleteStation);

router.patch('/:id/availability', updateAvailability);

console.log('All routes defined');

module.exports = router;
