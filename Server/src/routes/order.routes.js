import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import OrderController from '../controllers/order.controller.js'

const router = new Router()

router.get('/user-orders', authRequired, OrderController.getOrders)

router.get('/user-order/:id', authRequired, OrderController.getOrder)

router.post('/order', authRequired, OrderController.createOrder)

export default router