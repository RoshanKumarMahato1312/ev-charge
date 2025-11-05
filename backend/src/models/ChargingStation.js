// src/models/ChargingStation.js
const mongoose = require('mongoose');

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  chargerType: {
    type: String,
    enum: ['Slow', 'Fast', 'Ultra-Fast'],
    required: true
  },
  connectorTypes: [String], // e.g., ['Type2', 'CCS', 'CHAdeMO']
  costPerKWh: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ChargingStation', chargingStationSchema);
