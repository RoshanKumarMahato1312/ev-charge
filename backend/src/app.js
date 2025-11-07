const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Import routes
console.log('Loading charging station routes...');
const chargingStationRoutes = require('./routes/ChargingStationRoutes');
console.log('Routes loaded successfully');

// Mount routes
app.use('/api/charging-stations', chargingStationRoutes);
console.log('Routes mounted at /api/charging-stations');

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'EV Charger Backend API is running!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: `Cannot find ${req.method} ${req.url}` 
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Try: http://localhost:${port}/api/charging-stations`);
});
