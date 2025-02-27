const express = require('express');
const router = express.Router();
const sql = require('mssql');
const mongoose = require('mongoose');

// Mock data generator function
const generateMockAnomalies = (startDate, endDate) => {
  const anomalies = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
    if (Math.random() > 0.7) { // 30% chance of anomaly
      anomalies.push({
        date: new Date(date),
        type: Math.random() > 0.5 ? 'Temperature' : 'Pressure',
        severity: Math.floor(Math.random() * 5) + 1,
        description: `Anomaly detected in ${Math.random() > 0.5 ? 'Temperature' : 'Pressure'} readings`,
        value: Math.random() * 100
      });
    }
  }
  
  return anomalies;
};

// GET /api/anomalies endpoint
router.get('/anomalies', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate date parameters
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    // Generate mock anomaly data
    const anomalies = generateMockAnomalies(startDate, endDate);

    // In a real application, you would query both MongoDB and SQL Server here
    // For now, we'll just return the mock data
    res.json({
      success: true,
      data: anomalies
    });

  } catch (error) {
    console.error('Error fetching anomalies:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router; 