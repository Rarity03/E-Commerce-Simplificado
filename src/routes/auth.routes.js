import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema, updateSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema),AuthController.register)

router.post('/login', validateSchema(loginSchema),AuthController.login)

router.post('/logout', AuthController.logout)

router.get('/verify-token', AuthController.verifyToken)

router.get('/profile', authRequired, AuthController.profile)

router.put('/profile/:id', authRequired, validateSchema(updateSchema), AuthController.updateProfile)

export default router