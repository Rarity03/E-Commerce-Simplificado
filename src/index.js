import app from './app.js'
import { connectDB } from './db.js'

connectDB()

app.listen(process.env.PORT, function() {
    console.log('Servidor escuchando en http://localhost:3000')
})
