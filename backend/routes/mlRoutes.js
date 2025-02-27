const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');

// Mock ML model function
const mockMlModel = (sensorData) => {
  const predictions = [];
  const types = ['Temperature', 'Pressure'];
  
  // Generate 1-3 anomaly predictions
  const numPredictions = Math.floor(Math.random() * 3) + 1;
  
  for (let i = 0; i < numPredictions; i++) {
    predictions.push({
      type: types[Math.floor(Math.random() * types.length)],
      probability: parseFloat(Math.random().toFixed(3)),
      severity: Math.floor(Math.random() * 5) + 1,
      value: parseFloat((Math.random() * 100).toFixed(2))
    });
  }
  
  return {
    predictions,
    metadata: {
      modelVersion: '1.0.0',
      confidenceScore: parseFloat((Math.random() * 0.5 + 0.5).toFixed(3))
    }
  };
};

// POST /ml/predict endpoint
router.post('/predict', async (req, res) => {
  try {
    console.log('Received prediction request:', req.body);
    const { sensorId, data } = req.body;

    if (!sensorId || !data) {
      return res.status(400).json({ message: 'sensorId and data are required' });
    }

    // Get predictions from mock ML model
    const mlResponse = mockMlModel(data);
    console.log('ML model response:', mlResponse);

    // Create new prediction document
    const prediction = new Prediction({
      sensorId,
      predictions: mlResponse.predictions,
      metadata: mlResponse.metadata
    });

    // Save to MongoDB
    const savedPrediction = await prediction.save();
    console.log('Saved prediction:', savedPrediction);

    res.json({
      success: true,
      data: savedPrediction
    });

  } catch (error) {
    console.error('Error in ML prediction:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// GET /ml/predictions endpoint to fetch stored predictions
router.get('/predictions', async (req, res) => {
  try {
    const { sensorId, limit = 10 } = req.query;
    
    const query = sensorId ? { sensorId } : {};
    const predictions = await Prediction.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: predictions
    });

  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

module.exports = router; 