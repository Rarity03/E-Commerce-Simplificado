import mongoose from 'mongoose'

const uri = 'mongodb+srv://Gerdan:avfnyYqr7OkAbtme@general.s5gcz.mongodb.net/?retryWrites=true&w=majority&appName=General'

export const connectDB = async () => {
    try {
      await mongoose.connect(uri)
      console.log('Conexión exitosa a MongoDB usando Mongoose')
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error)
      process.exit(1) // Salir con error si la conexión falla
    }
  }