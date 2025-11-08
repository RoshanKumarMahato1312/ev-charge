// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const ChargingStation = require('../models/ChargingStation');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, stationId, bookingDate, duration } = req.body;
    
    // Validate required fields
    if (!userId || !stationId || !bookingDate || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, stationId, bookingDate, duration'
      });
    }
    
    // Get station to calculate total amount
    const station = await ChargingStation.findById(stationId);
    if (!station) {
      return res.status(404).json({
        success: false,
        message: 'Charging station not found'
      });
    }
    
    // Calculate total amount (duration in minutes, convert to hours)
    const durationInHours = duration / 60;
    const totalAmount = station.costPerKWh * durationInHours * 1; // Assuming 1 kWh per hour
    
    // Create booking
    const booking = new Booking({
      userId,
      stationId,
      bookingDate,
      duration,
      totalAmount,
      status: 'pending'
    });
    
    await booking.save();
    
    // Populate the response
    await booking.populate('userId stationId');
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating booking',
      error: error.message
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId stationId');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching booking',
      error: error.message
    });
  }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('userId stationId')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings',
      error: error.message
    });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    ).populate('userId stationId');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error cancelling booking',
      error: error.message
    });
  }
};
