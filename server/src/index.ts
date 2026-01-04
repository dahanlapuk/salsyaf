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
import devRoutes from './routes/dev'


dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Routes
app.use('/api/news', newsRoutes)
app.use('/api/schedule', scheduleRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/dev', devRoutes)


// Endpoint sementara
import bcrypt from 'bcryptjs'

// ⚠️ ENDPOINT SEMENTARA — HAPUS SETELAH DIPAKAI
app.post('/api/dev/seed-admin', async (req, res) => {
  try {
    const Admin = mongoose.model('Admin')

    const existing = await Admin.findOne({ username: 'admin' })
    if (existing) {
      return res.json({
        ok: true,
        message: 'Admin already exists'
      })
    }

    const hashedPassword = await bcrypt.hash('admin123', 10)

    await Admin.create({
      username: 'admin',
      password: hashedPassword,
      role: 'superadmin'
    })

    return res.json({
      ok: true,
      username: 'admin',
      password: 'admin123'
    })
  } catch (error) {
    console.error('SEED ERROR:', error)
    return res.status(500).json({ ok: false, error })
  }
})

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
