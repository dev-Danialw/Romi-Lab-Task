import { useState, useEffect } from 'react'
import { Container, Grid, Paper, Typography, Box } from '@mui/material'
import AnomalyChart from './components/AnomalyChart'
import SensorList from './components/SensorList'
import PredictionsList from './components/PredictionsList'
import axios from 'axios'

function App() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/ml/predictions')
        setPredictions(response.data.data)
      } catch (error) {
        console.error('Error fetching predictions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Fetch new data every 10 seconds
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Anomaly Detection Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <AnomalyChart predictions={predictions} />
          </Paper>
        </Grid>

        {/* Sensor List */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <SensorList predictions={predictions} />
          </Paper>
        </Grid>

        {/* Recent Predictions */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <PredictionsList predictions={predictions} loading={loading} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
