import { Router, Request, Response } from 'express'
import Gallery from '../models/Gallery'
import { authMiddleware, adminOnly, AuthRequest } from '../middleware/auth'
import { validateObjectId, sanitizeBody, validatePagination, validateRequired } from '../middleware/validation'

const router = Router()

// Get all gallery items (with pagination)
router.get('/', validatePagination, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100)
    const category = req.query.category as string
    const skip = (page - 1) * limit

    const filter = category ? { category } : {}

    const gallery = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Gallery.countDocuments(filter)
    
    res.json({
      success: true,
      data: gallery,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Get single gallery item by ID
router.get('/:id', validateObjectId('id'), async (req: Request, res: Response) => {
  try {
    const item = await Gallery.findById(req.params.id)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' })
    }
    res.json({ success: true, data: item })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create gallery item (admin only)
router.post('/', 
  authMiddleware, 
  adminOnly, 
  sanitizeBody,
  validateRequired(['title', 'image']),
  async (req: AuthRequest, res: Response) => {
    try {
      const item = new Gallery(req.body)
      await item.save()
      res.status(201).json({ success: true, data: item })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Update gallery item (admin only)
router.put('/:id', 
  authMiddleware, 
  adminOnly, 
  validateObjectId('id'),
  sanitizeBody,
  async (req: AuthRequest, res: Response) => {
    try {
      const item = await Gallery.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!item) {
        return res.status(404).json({ success: false, message: 'Gallery item not found' })
      }
      res.json({ success: true, data: item })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Delete gallery item (admin only)
router.delete('/:id', authMiddleware, adminOnly, validateObjectId('id'), async (req: AuthRequest, res: Response) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id)
    if (!item) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' })
    }
    res.json({ success: true, message: 'Gallery item deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
