import { Router } from 'express'
import { AppointmentController } from '../controllers/appointment.controller'
import { auth } from '../middlewares/auth'

const appointmentRoutes = Router()
const controller = new AppointmentController()

appointmentRoutes.use(auth)

appointmentRoutes.post('/appointments', controller.create)

export { appointmentRoutes }
