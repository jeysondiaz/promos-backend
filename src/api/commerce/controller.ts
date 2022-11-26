// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express'

// Models
import Commerce from '@models/commerce'

// Error handling functions
import HttpException from '@errors/httpException'

export const getAllCommerces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerces = await Commerce.find()
        res.status(200).json({
            error: false,
            data: commerces 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const commerceById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerce = await Commerce.findById(req.params.id)
        res.status(200).json({
            error: false,
            data: commerce
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const createCommerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerce = await Commerce.create(req.body)
        res.status(200).json({
            error: false,
            data: commerce 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const updateCommerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerce = await Commerce.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            error: false,
            data: commerce
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const deleteCommerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commerce = await Commerce.findByIdAndUpdate(req.params.id, { status: false })
        res.status(200).json({
            error: false,
            data: commerce
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}