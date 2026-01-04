import { Router, Request, Response } from 'express'
import { upload } from '../middleware/upload'
import { authMiddleware, adminOnly, AuthRequest } from '../middleware/auth'
import path from 'path'
import fs from 'fs'

const router = Router()

// Upload single image (protected)
router.post(
    '/image',
    authMiddleware,
    adminOnly,
    upload.single('image'),
    (req: AuthRequest, res: Response) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' })
            }

            const fileUrl = `/uploads/${req.query.type || 'misc'}/${req.file.filename}`
            
            res.json({
                success: true,
                data: {
                    filename: req.file.filename,
                    originalName: req.file.originalname,
                    size: req.file.size,
                    mimetype: req.file.mimetype,
                    url: fileUrl
                }
            })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
)

// Upload multiple images (protected)
router.post(
    '/images',
    authMiddleware,
    adminOnly,
    upload.array('images', 10),
    (req: AuthRequest, res: Response) => {
        try {
            if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
                return res.status(400).json({ success: false, message: 'No files uploaded' })
            }

            const files = (req.files as Express.Multer.File[]).map(file => ({
                filename: file.filename,
                originalName: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                url: `/uploads/${req.query.type || 'misc'}/${file.filename}`
            }))

            res.json({ success: true, data: files })
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
)

// Delete file (protected)
router.delete('/:type/:filename', authMiddleware, adminOnly, (req: AuthRequest, res: Response) => {
    try {
        const { type, filename } = req.params
        const filePath = path.join('uploads', type, filename)

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, message: 'File not found' })
        }

        fs.unlinkSync(filePath)
        res.json({ success: true, message: 'File deleted successfully' })
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message })
    }
})

export default router
