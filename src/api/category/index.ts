import { Router } from 'express'
import { getAllCategories, createCategory, categoryById, updateCategory, deleteCategory } from './controller'
import { authMiddleware } from '@middlewares/authMiddleware'
import { adminMiddleware } from '@middlewares/adminMiddleware'

const router = Router()


router.get('/', authMiddleware, getAllCategories)
router.post('/', authMiddleware, adminMiddleware, createCategory)
router.get('/:id', authMiddleware, categoryById)
router.patch('/:id', authMiddleware, adminMiddleware, updateCategory)
router.delete('/:id', authMiddleware, adminMiddleware, deleteCategory)

export default router