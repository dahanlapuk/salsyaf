import { Router } from 'express'
import Admin from '../models/Admin'

const router = Router()

router.post('/seed-admin', async (_req, res) => {
  const existing = await Admin.findOne({ username: 'admin' })
  if (existing) {
    return res.json({ success: true, message: 'Admin already exists' })
  }

  const admin = new Admin({
    username: 'admin',
    password: 'admin123', // ⬅️ PLAIN TEXT
    role: 'superadmin'
  })

  await admin.save() // pre('save') akan hash otomatis

  res.json({
    success: true,
    username: 'admin',
    password: 'admin123'
  })
})

export default router
