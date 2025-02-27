const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a JWT token for authentication
const generateToken = () => {
  return jwt.sign({ id: 'simulator', role: 'system' }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

// Generate mock sensor data
const generateSensorData = () => {
  return {
    temperature: Math.random() * 100,
    pressure: Math.random() * 50,
    humidity: Math.random() * 100,
    timestamp: new Date().toISOString()
  };
};

// Function to simulate ML predictions
const simulatePrediction = async () => {
  try {
    const token = generateToken();
    const sensorId = `SENSOR_${Math.floor(Math.random() * 5) + 1}`; // Random sensor 1-5
    const data = generateSensorData();

    const response = await axios.post('http://localhost:5000/ml/predict', {
      sensorId,
      data
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Prediction saved successfully:', response.data);
  } catch (error) {
    console.error('Error simulating prediction:', error.response?.data || error.message);
  }
};

// Run simulation every 5 seconds
console.log('Starting ML prediction simulation...');
setInterval(simulatePrediction, 5000);

// Run once immediately
simulatePrediction(); 