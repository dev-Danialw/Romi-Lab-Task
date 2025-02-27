import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Typography } from '@mui/material'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const AnomalyChart = ({ predictions }) => {
  // Process data for the chart
  const processedData = predictions.reduce((acc, prediction) => {
    prediction.predictions.forEach(p => {
      if (!acc[p.type]) {
        acc[p.type] = []
      }
      acc[p.type].push({
        value: p.value,
        timestamp: new Date(prediction.timestamp)
      })
    })
    return acc
  }, {})

  const colors = {
    Temperature: 'rgb(255, 99, 132)',
    Pressure: 'rgb(53, 162, 235)'
  }

  const data = {
    labels: predictions.map(p => new Date(p.timestamp).toLocaleTimeString()),
    datasets: Object.keys(processedData).map(type => ({
      label: type,
      data: processedData[type].map(d => d.value),
      borderColor: colors[type],
      backgroundColor: colors[type],
      tension: 0.1
    }))
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Anomaly Values Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  if (predictions.length === 0) {
    return <Typography>No data available</Typography>
  }

  return <Line data={data} options={options} />
}

export default AnomalyChart 