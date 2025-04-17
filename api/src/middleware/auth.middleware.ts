import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'

interface AuthenticatedRequest extends Request {
  user?: any
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token

  // Check for token in:
  // 1. Cookies (for traditional web apps)
  // 2. Authorization header (for mobile/SPAs)
  if (req.cookies.jwt) {
    token = req.cookies.jwt
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' })
  }
}