import { Request, Response } from 'express'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
  user?: any;
}

// Helper function to generate JWT
const generateTokenAndSetCookie = (res: Response, id: string) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  return token;
}

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })
    const token = generateTokenAndSetCookie(res, user._id.toString())

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    
    if (user && (await user.comparePassword(password))) {
      const token = generateTokenAndSetCookie(res, user._id.toString())

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: token,
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      const token = generateTokenAndSetCookie(res, user._id.toString())
      
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: token
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete user
// @route   DELETE /api/users/profile
// @access  Private
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      await user.deleteOne()
      res.json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
export const logoutUser = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).json({ message: 'Logged out successfully' })
}
