// src/app.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import routes
const chargingStationRoutes = require('./routes/ChargingStationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

// Mount routes
app.use('/api/charging-stations', chargingStationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'EV Charger Backend API is running!' });
});

app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Cannot find ${req.method} ${req.url}` 
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
