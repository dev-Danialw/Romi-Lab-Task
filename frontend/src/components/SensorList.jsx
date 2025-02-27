import { List, ListItem, ListItemText, Typography, Chip } from '@mui/material'

const SensorList = ({ predictions }) => {
  // Get unique sensors and their latest predictions
  const sensors = predictions.reduce((acc, prediction) => {
    if (!acc[prediction.sensorId]) {
      acc[prediction.sensorId] = {
        lastSeen: new Date(prediction.timestamp),
        anomalyCount: prediction.predictions.length
      }
    } else {
      const currentDate = new Date(prediction.timestamp)
      if (currentDate > acc[prediction.sensorId].lastSeen) {
        acc[prediction.sensorId].lastSeen = currentDate
        acc[prediction.sensorId].anomalyCount += prediction.predictions.length
      }
    }
    return acc
  }, {})

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Active Sensors
      </Typography>
      <List>
        {Object.entries(sensors).map(([sensorId, data]) => (
          <ListItem key={sensorId} divider>
            <ListItemText
              primary={sensorId}
              secondary={`Last seen: ${data.lastSeen.toLocaleTimeString()}`}
            />
            <Chip
              label={`${data.anomalyCount} anomalies`}
              color="primary"
              size="small"
            />
          </ListItem>
        ))}
      </List>
      {Object.keys(sensors).length === 0 && (
        <Typography color="textSecondary">No active sensors</Typography>
      )}
    </>
  )
}

export default SensorList 