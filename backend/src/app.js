// src/app.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('EV Charger Backend API is running!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
