import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'

const router = Router()

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    // Find admin
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Check password
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Register (protected - only for initial setup or superadmin)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Username already exists' })
    }

    // Create new admin
    const admin = new Admin({ username, password, role })
    await admin.save()

    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Verify token
router.get('/verify', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any
    const admin = await Admin.findById(decoded.id).select('-password')

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' })
    }

    res.json({ success: true, admin })
  } catch (error: any) {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
})

export default router
