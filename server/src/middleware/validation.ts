import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'

/**
 * Validasi MongoDB ObjectId
 */
export const validateObjectId = (paramName: string = 'id') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[paramName]
        
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: `Invalid ${paramName} format`
            })
        }
        next()
    }
}

/**
 * Sanitasi string - hapus HTML tags berbahaya
 */
export const sanitizeString = (str: string): string => {
    if (typeof str !== 'string') return str
    
    // Hapus script tags
    return str
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim()
}

/**
 * Middleware untuk sanitasi request body
 */
export const sanitizeBody = (req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body === 'object') {
        const sanitize = (obj: Record<string, any>): Record<string, any> => {
            const result: Record<string, any> = {}
            for (const key in obj) {
                if (typeof obj[key] === 'string') {
                    result[key] = sanitizeString(obj[key])
                } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = sanitize(obj[key])
                } else {
                    result[key] = obj[key]
                }
            }
            return result
        }
        req.body = sanitize(req.body)
    }
    next()
}

/**
 * Validasi pagination params
 */
export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string)
    const limit = parseInt(req.query.limit as string)
    
    if (req.query.page && (isNaN(page) || page < 1)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid page number'
        })
    }
    
    if (req.query.limit && (isNaN(limit) || limit < 1 || limit > 100)) {
        return res.status(400).json({
            success: false,
            message: 'Limit must be between 1 and 100'
        })
    }
    
    next()
}

/**
 * Validasi required fields
 */
export const validateRequired = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const missingFields: string[] = []
        
        for (const field of fields) {
            if (!req.body[field] || (typeof req.body[field] === 'string' && !req.body[field].trim())) {
                missingFields.push(field)
            }
        }
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`
            })
        }
        
        next()
    }
}
