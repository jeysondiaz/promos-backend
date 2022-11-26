import { Router } from 'express'
import { register, login } from './controller'
const router = Router()

// Main endpoint
router.post('/register', register)
router.post('/login', login)

export default router