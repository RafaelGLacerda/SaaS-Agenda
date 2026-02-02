import { Router } from 'express'
import { authenticate } from '../controllers/session.controller'

const router = Router()

router.post('/sessions', authenticate)

export { router as sessionRoutes }
