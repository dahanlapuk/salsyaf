import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// Get JWT Secret with validation
const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET
    if (!secret || secret === 'your-secret-key-change-this-in-production') {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('JWT_SECRET must be set in production!')
        }
        return 'dev-secret-key-not-for-production'
    }
    return secret
}

export interface AuthRequest extends Request {
    user?: {
        id: string
        username: string
        role: string
    }
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, getJwtSecret()) as {
            id: string
            username: string
            role: string
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' })
    }

    if (req.user.role !== 'admin' && req.user.role !== 'superadmin') {
        return res.status(403).json({ success: false, message: 'Access denied' })
    }

    next()
}

export const superAdminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authenticated' })
    }

    if (req.user.role !== 'superadmin') {
        return res.status(403).json({ success: false, message: 'Superadmin access only' })
    }

    next()
}
