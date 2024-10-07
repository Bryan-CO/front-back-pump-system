import express from 'express'
import { PumpController } from './controllers/PumpController'
import cors from 'cors'

const app = express()
const PORT = 64150

// TODO: Colocar array de origins como en el curso de NodeJS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.json())

app.post('/checkPos', PumpController.checkPos)
app.listen(PORT, () => {
  console.log(`App escuchando en http://localhost:${PORT}`)
})
