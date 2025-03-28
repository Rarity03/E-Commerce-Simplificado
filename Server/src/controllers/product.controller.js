import Product from '../models/product.model.js';

class ProductController{

    async getProducts (req, res) {
        try {
            const { minPrice, maxPrice, category, name, state } = req.query;
            const query = {}

            if (minPrice) query.finalPrice = { ...query.finalPrice, $gte: Number(minPrice) }
            if (maxPrice) query.finalPrice = { ...query.finalPrice, $lte: Number(maxPrice) }
            if (category) query.category = category
            if (name) query.name = { $regex: name, $options: 'i' }
            if (state) query.state = state
            console.log(query)
            const products = await Product.find(query);
            res.status(200).json(products);
        } catch (error) {
            return res.status(404).json({ message: 'Product not found' })
        }
    }

    async getProduct (req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json(['Product not found'])
            res.json(product)
        } catch (err) {
            return res.status(404).json({ message: 'Product not found' })
        }
    }

}

export default new ProductController()