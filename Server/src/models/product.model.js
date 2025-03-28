import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount:{
        type: Number,
        default: 0
    },
    finalPrice: {
        type: Number,
        required: true,
        default: function () {
            return this.price - (this.price * this.discount) / 100;
        }
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    state:{
        type: String,
        enum: ['available', 'not available'], 
        default: 'available'
    }

})

export default mongoose.model('Product', productSchema)