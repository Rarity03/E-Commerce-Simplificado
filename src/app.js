import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js'
import carRoutes from './routes/car.routes.js'
import orderRoutes from './routes/order.routes.js'
import compression from 'compression'
import dotenv from 'dotenv';

dotenv.config();

const app = express()
app.use(compression());

app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true
}));


app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use('/api', authRoutes)
app.use('/api', productRoutes)
app.use('/api', carRoutes)
app.use('/api', orderRoutes)



export default app