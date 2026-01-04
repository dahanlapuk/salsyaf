import { Router, Request, Response } from 'express'
import News from '../models/News'
import { authMiddleware, adminOnly, AuthRequest } from '../middleware/auth'
import { validateObjectId, sanitizeBody, validatePagination, validateRequired } from '../middleware/validation'

const router = Router()

// Get all news (with pagination)
router.get('/', validatePagination, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100)
    const skip = (page - 1) * limit
    const admin = req.query.admin === 'true'

    const filter = admin ? {} : { published: true }
    const news = await News.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await News.countDocuments(filter)

    res.json({
      success: true,
      data: news,
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

// Get single news by ID
router.get('/:id', validateObjectId('id'), async (req: Request, res: Response) => {
  try {
    const news = await News.findById(req.params.id)
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' })
    }
    res.json({ success: true, data: news })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// Create news (admin only)
router.post('/', 
  authMiddleware, 
  adminOnly, 
  sanitizeBody,
  validateRequired(['title', 'content', 'excerpt']),
  async (req: AuthRequest, res: Response) => {
    try {
      const news = new News(req.body)
      await news.save()
      res.status(201).json({ success: true, data: news })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Update news (admin only)
router.put('/:id', 
  authMiddleware, 
  adminOnly, 
  validateObjectId('id'),
  sanitizeBody,
  async (req: AuthRequest, res: Response) => {
    try {
      const news = await News.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      )
      if (!news) {
        return res.status(404).json({ success: false, message: 'News not found' })
      }
      res.json({ success: true, data: news })
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message })
    }
  }
)

// Delete news (admin only)
router.delete('/:id', authMiddleware, adminOnly, validateObjectId('id'), async (req: AuthRequest, res: Response) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id)
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' })
    }
    res.json({ success: true, message: 'News deleted successfully' })
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
})

export default router
