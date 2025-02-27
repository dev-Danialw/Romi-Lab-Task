const mongoose = require('mongoose');
const Prediction = require('../models/Prediction');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to generate random predictions
const generatePrediction = (timestamp) => {
  const types = ['Temperature', 'Pressure'];
  const numPredictions = Math.floor(Math.random() * 3) + 1;
  const predictions = [];

  for (let i = 0; i < numPredictions; i++) {
    predictions.push({
      type: types[Math.floor(Math.random() * types.length)],
      probability: parseFloat(Math.random().toFixed(3)),
      severity: Math.floor(Math.random() * 5) + 1,
      value: parseFloat((Math.random() * 100).toFixed(2))
    });
  }

  return {
    sensorId: `SENSOR_${Math.floor(Math.random() * 5) + 1}`,
    predictions,
    metadata: {
      modelVersion: '1.0.0',
      confidenceScore: parseFloat((Math.random() * 0.5 + 0.5).toFixed(3))
    },
    timestamp
  };
};

// Generate test data for the last hour with 5-minute intervals
async function generateTestData() {
  try {
    // Clear existing data
    await Prediction.deleteMany({});

    const now = new Date();
    const predictions = [];

    // Generate data for the last hour
    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(now - i * 5 * 60000); // 5 minutes intervals
      predictions.push(generatePrediction(timestamp));
    }

    // Insert all predictions
    await Prediction.insertMany(predictions);
    console.log(`Successfully generated ${predictions.length} predictions`);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error generating test data:', error);
    mongoose.connection.close();
  }
}

generateTestData(); 