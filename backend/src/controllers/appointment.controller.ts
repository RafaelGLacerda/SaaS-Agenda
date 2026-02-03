import { Request, Response } from 'express'
import { prisma } from '../prisma'
import dayjs from 'dayjs'

export class AppointmentController {
  async index(req: Request, res: Response) {
    const { date } = req.query
    const userId = req.userId

    if (!date) {
      return res.status(400).json({ error: 'Date is required' })
    }

    const startOfDay = dayjs(String(date)).startOf('day').toDate()
    const endOfDay = dayjs(String(date)).endOf('day').toDate()

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        client: true,
        service: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return res.json(appointments)
  }

  async create(req: Request, res: Response) {
    const { date, clientId, serviceId } = req.body
    const userId = req.userId

    if (!date || !clientId || !serviceId) {
      return res.status(400).json({
        error: 'date, clientId and serviceId are required',
      })
    }

    const appointmentDate = new Date(date)

    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid date',
      })
    }

    // 🔒 verifica conflito de horário
    const conflict = await prisma.appointment.findFirst({
      where: {
        userId,
        date: appointmentDate,
      },
    })

    if (conflict) {
      return res.status(409).json({
        error: 'Time already booked',
      })
    }

    // 🔒 verifica se client existe e pertence ao user
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId,
      },
    })

    if (!client) {
      return res.status(404).json({
        error: 'Client not found',
      })
    }

    // 🔒 verifica se service existe e pertence ao user
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        userId,
      },
    })

    if (!service) {
      return res.status(404).json({
        error: 'Service not found',
      })
    }

    // ✅ agora sim, pode criar sem FK explodir
    const appointment = await prisma.appointment.create({
      data: {
        date: appointmentDate,
        user: {
          connect: { id: userId },
        },
        client: {
          connect: { id: clientId },
        },
        service: {
          connect: { id: serviceId },
        },
      },
      include: {
        client: true,
        service: true,
      },
    })

    return res.status(201).json(appointment)
  }
}
