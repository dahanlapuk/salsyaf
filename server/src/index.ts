import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import newsRoutes from './routes/news'
import scheduleRoutes from './routes/schedule'
import galleryRoutes from './routes/gallery'
import authRoutes from './routes/auth'
import uploadRoutes from './routes/upload'
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// CORS Configuration
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001', 
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN
].filter(Boolean) as string[]

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, etc)
        if (!origin) return callback(null, true)
        
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/news', newsRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pptq-db'

// 🔴 INI YANG WAJIB
console.log('DEBUG MONGODB_URI =', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  })

export default app
