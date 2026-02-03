import express from 'express'
import cors from 'cors'

import { userRoutes } from './routes/user.routes'
import { sessionRoutes } from './routes/session.routes'
import { appointmentRoutes } from './routes/appointment.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', userRoutes)
app.use('/sessions', sessionRoutes)
app.use('/appointments', appointmentRoutes)

app.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})

export { app }
