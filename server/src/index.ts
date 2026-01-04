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

// CORS Configuration - Safe function-based origin
const allowedOrigins: string[] = [
    'http://localhost:3000',
    'http://localhost:3001',
    // Production URLs
    'https://salsyaf.vercel.app',
    'https://pptq-salsyaf.vercel.app',
]

// Add env-based origins if defined
if (process.env.FRONTEND_URL) allowedOrigins.push(process.env.FRONTEND_URL)
if (process.env.CORS_ORIGIN) allowedOrigins.push(process.env.CORS_ORIGIN)

// CORS middleware
app.use(cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Allow requests with no origin (curl, mobile apps, server-to-server)
        if (!origin) {
            return callback(null, true)
        }
        
        // Allow if origin is in whitelist
        if (allowedOrigins.includes(origin)) {
            return callback(null, true)
        }
        
        // Allow all in development
        if (process.env.NODE_ENV !== 'production') {
            return callback(null, true)
        }
        
        // Block with false (not error) - this returns proper CORS headers
        // Browser will show CORS error, server won't crash
        return callback(null, false)
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

// Handle preflight requests explicitly
app.options('*', cors())

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
