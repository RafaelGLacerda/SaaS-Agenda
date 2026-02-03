import { Router } from 'express'
import { userRoutes } from './user.routes'
import { sessionRoutes } from './session.routes'
import { appointmentRoutes } from './appointment.routes'
import { ensureAuth } from '../middlewares/ensureAuth'

const routes = Router()

// rotas públicas
routes.use('/users', userRoutes)
routes.use('/sessions', sessionRoutes)

// middleware de auth só daqui pra baixo
routes.use(ensureAuth)

// rotas protegidas
routes.use('/appointments', appointmentRoutes)

export { routes }
