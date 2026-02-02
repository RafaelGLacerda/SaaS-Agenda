import { Request, Response } from 'express'
import { prisma } from '../prisma'

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
      })
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return res.status(409).json({
        error: 'User already exists',
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // depois a gente criptografa
      },
    })

    return res.status(201).json(user)
  }
}
