import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'

class AuthController{

    async register(req, res) {
        const { name, email, password, direction, phone } = req.body
        try {
            const useFound = await User.findOne({ email })
            if(useFound) return res.status(400).json(['User already exists'])
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new User({
                name,
                email,
                password: passwordHash,
                direction,
                phone
            })
            const userSaved = await newUser.save()
            const token = await createAccessToken({ id: userSaved._id })
    
            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'None'
            })
            res.json({
                id: userSaved._id,
                name: userSaved.name,
                email: userSaved.email,
                direction: userSaved.direction,
                phone: userSaved.phone
            })
        } catch (err) {
            return res.status(400).json(e)
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        try{
            const  userFound = await User.findOne({ email })
            if(!userFound) return res.status(400).json(['User not found'])

            const matchPassword = await bcrypt.compare(password, userFound.password)
            if(!matchPassword) return res.status(401).json(['Incorrect password'])
            
            const token = await createAccessToken({ id: userFound._id })
            res.cookie('token', token, {
                httpOnly: true, 
                secure: true, 
                sameSite: 'None'
            })
            res.json({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                direction: userFound.direction,
                phone: userFound.phone

            })
        } catch (err) {
            return res.status(400).json(e)    
        }
    }

    logout(req, res) {
        res.cookie('token', '', {
            expires: new Date(0)
          })
        return res.send(200)
    }

    async verifyToken (req, res) {
        const { token } = req.cookies
        if(!token) return res.status(401).json(['Unauthorized'])
        
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if(err) return res.status(401).json({ message: 'Unauthorized' })
            const userFound = await User.findById(user.id)
            if (!userFound) return res.status(403).json({ message: 'Forbidden' })
            return res.json({
                id: userFound._id,
                name: userFound.name,
                email: userFound.email,
                direction: userFound.direction,
                phone: userFound.phone
            })
        })
    }

    async profile (req, res) {
        const userFound = await User.findById(req.user.id)
        if (!userFound) return res.status(401).json(['User not found'])
        return res.json({
            id: userFound._id,
            name: userFound.username,
            email: userFound.email,
            direction: userFound.direction,
            phone: userFound.phone
        })
    }

    async updateProfile(req, res) {
        try {
            const user = await User.findById(req.params.id)
            console.log(user)
            const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!userUpdated) return res.status(404).json({ message: 'User not found' })
            res.json(userUpdated)
        } catch (err) {
            return res.status(404).json({ message: 'User not found' })
        }
    }
}

export default new AuthController()