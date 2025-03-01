import Car from '../models/car.model.js'

class CarController {

    async addToCar(req, res) {
        try{
            const userId = req.user.id
            let userCar = await Car.findOne({ userId });
            const { productId, amount } = req.body

            if (!userCar) {
                userCar = new Car({
                    userId,
                    products: [{ productId, amount }]
                });
            } else {
                const productIndex = userCar.products.findIndex(product => product.productId.toString() === productId);
                if (productIndex !== -1) {
                    userCar.products[productIndex].amount += 1;
                } else {
                    userCar.products.push({ productId, amount });
                }
            }

            const savedCar = await userCar.save();
            res.status(201).json(savedCar);

        } catch(err){
            return res.status(400).json(err)
        }
    }
    
    async removeFromCar(req, res) {
        try{
            const userId = req.user.id
            const userCar = await Car.findOne({ userId });
            const { productId } = req.body
            if (!userCar) return res.status(404).json({ message: 'Car not found' });
            userCar.products = userCar.products.filter(product => product.productId.toString() !== productId);

            const savedCar = await userCar.save();
            return res.status(200).json(savedCar)
        } catch(err){
            return res.status(400).json(err)
        }
    }

    async decreaseToCar(req, res) {
        try{
            const userId = req.user.id
            let userCar = await Car.findOne({ userId });
            const { productId } = req.body
            if (!userCar) return res.status(404).json({ message: 'Car not found' });
            const productIndex = userCar.products.findIndex(product => product.productId.toString() === productId);
            if (productIndex !== -1) {
                userCar.products[productIndex].amount -= 1;
                if (userCar.products[productIndex].amount === 0) {
                    userCar.products = userCar.products.filter(product => product.productId.toString() !== productId);
                }
            }
            const savedCar = await userCar.save();
            return res.status(200).json(savedCar)
        } catch (err) {
            return res.status(400).json(err)
        }
    }
    
    async getCar(req, res) {
        try{
            const userId = req.user.id
            
            const userCar = await Car.findOne({ userId }).populate('products.productId');
            if (!userCar) return res.status(200).json(['The Car is Empty' ]);
            return res.status(200).json(userCar)
        } catch(err){
            return res.status(404).json({message: err})
        }
    }
    
    async deleteCar(req, res) {
        try{
            const userId = req.user.id
            const userCar = await Car.findOne({ userId });
            if (!userCar) return res.status(404).json({ message: 'Car not found' });
            userCar.products = [];
            const savedCar = await userCar.save();
            return res.status(200).json(savedCar)
        } catch (err) {
            return res.status(400).json(err)
        }
    }


}

export default new CarController()