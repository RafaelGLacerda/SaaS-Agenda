import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class AppointmentController {
  async create(req: Request, res: Response) {
    const userId = req.userId
    const { date, clientId, serviceId } = req.body

    if (!date || !clientId || !serviceId) {
      return res.status(400).json({
        error: 'Missing required fields',
      })
    }

    const appointment = await prisma.appointment.create({
      data: {
        date: new Date(date),
        userId,
        clientId,
        serviceId,
      },
      include: {
        client: true,
        service: true,
      },
    })

    return res.status(201).json(appointment)
  }
}
