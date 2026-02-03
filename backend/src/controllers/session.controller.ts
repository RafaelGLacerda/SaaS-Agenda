import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma'

export async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { sub: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' }
  )

  return res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}
