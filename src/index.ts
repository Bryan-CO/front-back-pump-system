import express from 'express'
import { PumpController } from './controllers/PumpController'
import cors from 'cors'

const app = express()
const PORT = 64150

// TODO: Colocar array de origins como en el curso de NodeJS
app.use(cors())
app.use(express.json())

app.get('/checkPos', PumpController.checkPos)
app.get('/closeNavigator', PumpController.closeNavigator)
app.listen(PORT, () => {
  console.log(`App escuchando en http://localhost:${PORT}`)
})
