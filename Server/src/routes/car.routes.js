import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import CarController from '../controllers/car.controller.js'

const router = new Router()

router.get('/car', authRequired, CarController.getCar)
router.post('/car-add', authRequired, CarController.addToCar)
router.post('/car-remove', authRequired, CarController.removeFromCar)
router.post('/car-decrease', authRequired, CarController.decreaseToCar)
router.delete('/car', authRequired, CarController.deleteCar)
router.get('/car-count', authRequired, CarController.totalCarCount)


export default router