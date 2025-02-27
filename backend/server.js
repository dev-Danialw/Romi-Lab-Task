const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const anomalyRoutes = require('./routes/anomalyRoutes');
const mlRoutes = require('./routes/mlRoutes');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connections
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authMiddleware, anomalyRoutes);
app.use('/ml', mlRoutes); // Removed authMiddleware for testing purposes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 