import { Router, Request, Response } from 'express'
import Schedule from '../models/Schedule'
import { authMiddleware, adminOnly, AuthRequest } from '../middleware/auth'
import { validateObjectId, sanitizeBody, validateRequired } from '../middleware/validation'

const router = Router()

// Get all schedules
router.get('/', async (req: Request, res: Response) => {
  try {
    const type = req.query.type as string
    const validTypes = ['harian', 'mingguan', 'bulanan', 'tahunan']
    
    // Validasi type jika diberikan
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: `Invalid type. Must be one of: ${validTypes.join(', ')}`
      })
    }
    
    const filter = type ? { type } : {}
    const schedules = await Schedule.find(filter).sort({ time: 1 })

    res.json({
      success: true,
      data: schedules
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get single schedule by ID
router.get('/:id', validateObjectId('id'), async (req: Request, res: Response) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' })
    }
    res.json({ success: true, data: schedule })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create schedule (admin only)
router.post('/', 
  authMiddleware, 
  adminOnly, 
  sanitizeBody,
  validateRequired(['title', 'time', 'type']),
  async (req: AuthRequest, res: Response) => {
    try {
      const schedule = new Schedule(req.body)
      await schedule.save()
      res.status(201).json({ success: true, data: schedule })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Update schedule (admin only)
router.put('/:id', 
  authMiddleware, 
  adminOnly, 
  validateObjectId('id'),
  sanitizeBody,
  async (req: AuthRequest, res: Response) => {
    try {
      const schedule = await Schedule.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!schedule) {
        return res.status(404).json({ success: false, message: 'Schedule not found' })
      }
      res.json({ success: true, data: schedule })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Delete schedule (admin only)
router.delete('/:id', authMiddleware, adminOnly, validateObjectId('id'), async (req: AuthRequest, res: Response) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id)
    if (!schedule) {
      return res.status(404).json({ success: false, message: 'Schedule not found' })
    }
    res.json({ success: true, message: 'Schedule deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
