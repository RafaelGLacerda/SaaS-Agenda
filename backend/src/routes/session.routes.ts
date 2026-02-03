import { Router } from 'express'
import { authenticate } from '../controllers/session.controller'

const sessionRoutes = Router()

sessionRoutes.post('/sessions', authenticate)

export { sessionRoutes }
