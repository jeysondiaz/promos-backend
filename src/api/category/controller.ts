// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express'

// Models
import Category from '@models/category'

// Error handling functions
import HttpException from '@errors/httpException'

export const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await Category.find()
        res.status(200).json({
            error: false,
            data: categories 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const categoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json({
            error: false,
            data: category
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}
    

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json({
            error: false,
            data: category 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body)
        console.log('pase')
        res.status(200).json({
            error: false,
            data: category
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            status:false
        })
        res.status(200).json({
            error: false,
            data: category
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}