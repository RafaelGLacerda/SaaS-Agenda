import express from 'express'
import { routes } from './routes'
import { sessionRoutes } from './routes/session.routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use(sessionRoutes)

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333')
})