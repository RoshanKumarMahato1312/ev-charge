// src/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,  // ← Changed from ObjectId to String
    required: true
  },
  stationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChargingStation',
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,  // Duration in minutes
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);

