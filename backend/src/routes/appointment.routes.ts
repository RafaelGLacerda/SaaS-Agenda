import { Router } from 'express'
import { AppointmentController } from '../controllers/appointment.controller'
import { ensureAuth } from '../middlewares/ensureAuth'

const router = Router()
const controller = new AppointmentController()

router.use(ensureAuth)

router.post('/', controller.create)
router.get('/', controller.index)

export { router as appointmentRoutes }
