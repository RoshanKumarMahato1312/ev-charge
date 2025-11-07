// src/controllers/chargingStationController.js
const ChargingStation = require('../models/ChargingStation');

console.log('Loading chargingStationController...');

// Get all charging stations
exports.getAllStations = async (req, res) => {
  console.log('getAllStations called');
  try {
    const stations = await ChargingStation.find();
    console.log(`Found ${stations.length} stations`);
    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    console.error('Error in getAllStations:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching charging stations',
      error: error.message
    });
  }
};

// Get a single charging station by ID
exports.getStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching charging station',
      error: error.message
    });
  }
};

// Create a new charging station
exports.createStation = async (req, res) => {
  console.log('createStation called');
  try {
    const station = await ChargingStation.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Charging station created successfully',
      data: station
    });
  } catch (error) {
    console.error('Error in createStation:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating charging station',
      error: error.message
    });
  }
};

// Update a charging station
exports.updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Charging station updated successfully',
      data: station
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating charging station',
      error: error.message
    });
  }
};

// Delete a charging station
exports.deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByIdAndDelete(req.params.id);
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Charging station deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting charging station',
      error: error.message
    });
  }
};

// Search stations by location
exports.searchStationsByLocation = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10 } = req.query;
    
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }
    
    const stations = await ChargingStation.find({
      available: true
    });
    
    res.status(200).json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching charging stations',
      error: error.message
    });
  }
};

// Update station availability
exports.updateAvailability = async (req, res) => {
  try {
    const { available } = req.body;
    
    const station = await ChargingStation.findByIdAndUpdate(
      req.params.id,
      { available },
      { new: true }
    );
    
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Station availability updated',
      data: station
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating availability',
      error: error.message
    });
  }
};

console.log('All controller functions exported');
