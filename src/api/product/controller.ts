// Import 3rd-party packages
import { NextFunction, Request, Response } from 'express'

// Models
import Product from '@models/product'
import User    from '@models/user'

// Error handling functions
import HttpException from '@errors/httpException'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the user from the request
        const { id } = req.body.user
        const { user, ...productData } = req.body
        // Create the product
        const product = await Product.create({ ...productData, user: id })
        // Send the response
        res.status(201).json({ 
            error:false,
            data:product 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the products
        const products = await Product.find()
        .populate('commerce')
        .populate('category')
        .populate('user')
        // Send the response
        res.status(200).json({ 
            error:false,
            data:products 
        })

    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the product
        const product = await Product.findById(req.params.id)
        // Send the response
        res.status(200).json({ 
            error:false,
            data:product 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
            // Get the product
            const product = await Product.findById(req.params.id)
            // Check if the product exists
            if (!product) next(new HttpException('El producto no existe', 404))
            // Update the product
            if (req.file) {
               await product?.updateOne({ ...req.body, image: `http://localhost:3000/uploads/${req.file?.filename}` })
            } else {
                await product?.updateOne(req.body)
            }
            // Send the response
            res.status(200).json({
                error:false,
                data:product
            })
            
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the product
        const product = await Product.findById(req.params.id)
        // Check if the product exists
        if (!product) next(new HttpException('El producto no existe', 404))
        // Delete the product
        product?.deleteOne()
        // Send the response
        res.status(200).json({ 
            error:false,
            message: 'Producto eliminado' 
        })
    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const getProductsByCommerce = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the products
        const products = await Product.find({ commerce: req.params.id })
        .populate('commerce')
        .populate('category')
        .populate('user')
        // Send the response
        res.status(200).json({ 
            error:false,
            data:products 
        })

    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}

export const getProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the products
        const products = await Product.find({ category: req.params.id })
        .populate('commerce')
        .populate('category')
        .populate('user')
        // Send the response
        res.status(200).json({ 
            error:false,
            data:products 
        })

    } catch (error:any) {
        next(new HttpException(error.message, 500))
    }
}