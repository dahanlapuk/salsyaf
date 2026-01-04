import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const router = Router()

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  role: String
})

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema)

router.post('/seed-admin', async (_req: Request, res: Response) => {
  try {
    const existing = await Admin.findOne({ username: 'admin' })
    if (existing) {
      return res.json({ success: true, message: 'Admin already exists' })
    }

    const hashed = await bcrypt.hash('admin123', 10)
    await Admin.create({
      username: 'admin',
      password: hashed,
      role: 'superadmin'
    })

    res.json({
      success: true,
      message: 'Admin created',
      username: 'admin',
      password: 'admin123'
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
})

export default router
