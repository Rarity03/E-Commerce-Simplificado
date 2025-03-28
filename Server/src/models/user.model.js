import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    direction: {
        type: String,
    },
    phone: {
        type: String,
    },
    rol:{
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user'
    }
})

export default mongoose.model('User', userSchema)