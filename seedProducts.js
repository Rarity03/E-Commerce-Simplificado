import mongoose from 'mongoose';
import {connectDB} from './src/db.js'; // Ruta a tu función connectDB
import Product from './src/models/product.model.js'; // Ruta a tu modelo
import products from './data.js'; // Ruta al archivo con los productos

const seedProducts = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB');
        await Product.deleteMany();
        console.log('Existing products removed.');
        await Product.insertMany(products);
        console.log('Products added successfully.');
        mongoose.connection.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error while seeding products:', error);
        mongoose.connection.close();
    }
};

seedProducts();
