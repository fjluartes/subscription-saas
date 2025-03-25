import dotenv from 'dotenv'
import { app, connectDB } from './app'

dotenv.config()

const PORT = process.env.PORT || 5000

// Start server
const startServer = async () => {
  await connectDB()
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})