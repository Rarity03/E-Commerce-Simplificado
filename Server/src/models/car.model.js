import mongoose from 'mongoose'

const carSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    products: [
        {
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product', 
            required: true 
        },
        amount: { 
            type: Number, 
            required: true, 
            min: 1,
            default: 1}
        }
    ]
})

export default mongoose.model('Car', carSchema)