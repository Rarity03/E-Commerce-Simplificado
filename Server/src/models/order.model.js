import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
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
            required: true 
        },
          price: { 
            type: Number, 
            required: true 
        }
        }
      ],
    total: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        enum: ['pending', 'canceled', 'completed'],
        default: 'pending'
    },
    addressShipping: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Order', orderSchema)