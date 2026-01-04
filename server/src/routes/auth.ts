import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin'

const router = Router()

// Get JWT Secret with validation
const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET
    if (!secret || secret === 'your-secret-key-change-this-in-production') {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('JWT_SECRET must be set in production!')
        }
        console.warn('⚠️  WARNING: Using default JWT secret. Set JWT_SECRET in production!')
        return 'dev-secret-key-not-for-production'
    }
    return secret
}

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
      getJwtSecret(),
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

// Register (PROTECTED - disabled in production unless ADMIN_REGISTER_KEY is set)
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, role, registerKey } = req.body

    // Security: Block registration in production unless valid key provided
    if (process.env.NODE_ENV === 'production') {
        const adminRegisterKey = process.env.ADMIN_REGISTER_KEY
        if (!adminRegisterKey || registerKey !== adminRegisterKey) {
            return res.status(403).json({ 
                success: false, 
                message: 'Registration is disabled. Use seed script or contact administrator.' 
            })
        }
    }

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

    const decoded = jwt.verify(token, getJwtSecret()) as any
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
