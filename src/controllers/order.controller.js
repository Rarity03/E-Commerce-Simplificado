import Order from '../models/order.model.js'
import Car from '../models/car.model.js'
import User from '../models/user.model.js'

class OrderController {
    async createOrder (req, res) {
        try {
            const userId = req.user.id
            const userCar = await Car.findOne({ userId }).populate('products.productId');
            if (!userCar) return res.status(404).json({ message: 'Car not found' });
            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });
            const addressShipping = user.direction;
            const finalPrices = userCar.products.map(product => product.productId.finalPrice * product.amount)
            const total = finalPrices.reduce((acc, price) => acc + price, 0).toFixed(2)
            const newOrder = new Order({
                userId,
                products: userCar.products.map(product => ({
                    productId: product.productId._id,
                    amount: product.amount,
                    price: product.productId.finalPrice
                })),
                total,
                addressShipping
            })
            await newOrder.save()
            userCar.products = []
            await userCar.save()
            return res.status(200).json(newOrder)
        } catch (err) {
            return res.status(404).json({ message: err })
        }
    }

    async getOrders (req, res) {
        try {
            const userId = req.user.id
            const orders = await Order.find({ userId }).populate('products.productId')
            return res.status(200).json(orders)
        } catch (err) {
            return res.status(404).json({ message: err })
        }
    }

    async getOrder (req, res) {
        try{
            const order = await Order.findById(req.params.id);
            if (!order) return res.status(404).json(['Order not found'])
            res.json(order)
        } catch (err) {
            return res.status(404).json({ message: 'Order not found' })
        }
    }
}

export default new OrderController()