import express from 'express'
import cors from 'cors'
import { userRoutes } from './routes/user.routes'
import { sessionRoutes } from './routes/session.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use(userRoutes)
app.use(sessionRoutes)


app.get('/health', (req, res) => {
  return res.json({ status: 'ok' })
})

export default app
