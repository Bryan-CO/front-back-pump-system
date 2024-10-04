import express from 'express'
import { PumpController } from './controllers/PumpController'
import cors from 'cors'

const app = express()
const PORT = 64150
app.use(cors())
app.use(express.json())

app.post('/checkPos', PumpController.checkPos)
app.post('/getPump', PumpController.getPump)
app.listen(PORT, () => {
  console.log(`App escuchando en http://localhost:${PORT}`)
})
