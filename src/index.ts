import express from 'express'
import { PumpController } from './controllers/PumpController'

const app = express()
const PORT = 1234
app.use(express.json())

app.post('/checkPos', PumpController.checkPos)
app.listen(PORT, () => {
  console.log(`App escuchando en http://localhost:${PORT}`)
})
