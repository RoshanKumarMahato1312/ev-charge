// src/routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingsByUser,
  getUserBookings,
  cancelBooking,
  getBookingById
} = require('../controllers/bookingController');

// Create a new booking
router.post('/', createBooking);

// Get booking by ID
router.get('/:id', getBookingById);

// Get all bookings for a user
router.get('/user/:userId', getUserBookings);

// Cancel a booking
router.delete('/:id', cancelBooking);

module.exports = router;
