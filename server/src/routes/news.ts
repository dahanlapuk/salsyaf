import { Router, Request, Response } from 'express'
import News from '../models/News'

const router = Router()

// Get all news (with pagination)
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const news = await News.find({ published: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await News.countDocuments({ published: true })

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
router.get('/:id', async (req: Request, res: Response) => {
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

// Create news (admin only - add auth middleware later)
router.post('/', async (req: Request, res: Response) => {
  try {
    const news = new News(req.body)
    await news.save()
    res.status(201).json({ success: true, data: news })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// Update news (admin only)
router.put('/:id', async (req: Request, res: Response) => {
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
})

// Delete news (admin only)
router.delete('/:id', async (req: Request, res: Response) => {
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
