import { Router } from 'express'
import { SessionController } from '../controllers/session.controller'

const router = Router()

const sessionController = new SessionController()

router.post('/sessions', sessionController.authenticate)

export { router as sessionRoutes }
