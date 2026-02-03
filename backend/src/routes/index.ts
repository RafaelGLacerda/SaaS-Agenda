import { Router } from 'express'
import { userRoutes } from './user.routes'
import { sessionRoutes } from './session.routes'
import { appointmentRoutes } from './appointment.routes'

const routes = Router()

routes.use(userRoutes)
routes.use(sessionRoutes)
routes.use(appointmentRoutes)

export { routes }
