// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const authenticateToken = require('./middleware/authenticateToken');
const app = express();
const port = 3030; // You can change the port number if needed

// Database connection
const dbConnectionString = process.env.DB_CONNECTION_STRING;
mongoose.connect(dbConnectionString);

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api', authRoutes);
app.use('/api', storeRoutes);
app.use('/api', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
