import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box
} from '@mui/material'

const PredictionsList = ({ predictions, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Recent Predictions
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Sensor</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Probability</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.slice(0, 10).map((prediction) =>
              prediction.predictions.map((p, index) => (
                <TableRow key={`${prediction._id}-${index}`}>
                  <TableCell>
                    {new Date(prediction.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{prediction.sensorId}</TableCell>
                  <TableCell>{p.type}</TableCell>
                  <TableCell>{p.value.toFixed(2)}</TableCell>
                  <TableCell>{p.severity}</TableCell>
                  <TableCell>{(p.probability * 100).toFixed(1)}%</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {predictions.length === 0 && (
        <Typography color="textSecondary" align="center" sx={{ mt: 2 }}>
          No predictions available
        </Typography>
      )}
    </>
  )
}

export default PredictionsList 