const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  sensorId: {
    type: String,
    required: true
  },
  predictions: [{
    type: {
      type: String,
      enum: ['Temperature', 'Pressure'],
      required: true
    },
    probability: {
      type: Number,
      required: true
    },
    severity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  }],
  metadata: {
    modelVersion: String,
    confidenceScore: Number
  }
});

const Prediction = mongoose.model('Prediction', predictionSchema);
module.exports = Prediction; 