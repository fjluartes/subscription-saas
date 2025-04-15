import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import subscriptionRoutes from './routes/subscription.routes'
import userRoutes from './routes/user.routes'

export const app = express()

// Middleware
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes)
app.use('/api/subscriptions', subscriptionRoutes)

// MongoDB Connection
export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined')
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}