import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'

const router = Router()

router.get('/products', ProductController.getProducts)
router.get('/products/:id', ProductController.getProduct)

export default router