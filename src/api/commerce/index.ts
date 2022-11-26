import { Router } from 'express'
import { getAllCommerces, commerceById, createCommerce, updateCommerce, deleteCommerce } from './controller'
import { authMiddleware } from '@middlewares/authMiddleware'

const router = Router()

// Main endpoint
router.get('/', authMiddleware, getAllCommerces)
router.post('/', authMiddleware,  createCommerce)
router.get('/:id', authMiddleware, commerceById)
router.patch('/:id', authMiddleware, updateCommerce)
router.delete('/:id', authMiddleware,  deleteCommerce)

export default router