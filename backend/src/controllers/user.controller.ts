import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
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

    // 🔐 criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    // ⚠️ nunca retornar senha
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    })
  }
}
