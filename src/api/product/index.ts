import { Router } from 'express'
import { createProduct, getProduct, deleteProduct, getProducts, updateProduct, getProductsByCategory, getProductsByCommerce } from './controller'
import { uploadFile } from '@utils/multerConfig'
import { authMiddleware } from '@middlewares/authMiddleware'

const router = Router()

// Main endpoint
router.get('/', authMiddleware, getProducts)
router.post('/', authMiddleware, createProduct)
router.get('/:id', authMiddleware, getProduct)
router.patch('/:id', uploadFile.single('image'), updateProduct)
router.delete('/:id', authMiddleware, deleteProduct)
router.get('/category/:id', authMiddleware, getProductsByCategory)
router.get('/commerce/:id', authMiddleware, getProductsByCommerce)

export default router