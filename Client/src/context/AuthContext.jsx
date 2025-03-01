import { createContext, useContext, useEffect, useState } from 'react'
import { loginRequest, registerRequest, verifyTokenRequest, updateProfileRequest } from '../api/auth'
import Cookie from 'js-cookie'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    const singup = async ( user ) => {
        try {
            const res = await registerRequest( user )
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const singin = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const logout = () => {
        Cookie.remove('token')
        setUser(null)
        setIsAuthenticated(false)
    }

    const update = async (user) => {
         try{
            const res = await updateProfileRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (err) {
            setErrors(err.response.data)
        }

    }

    useEffect(() => {
        async function checkLogin ()  {
            const token = Cookie.get('token')
            if (!token) {
                Cookie.remove('token')
                setIsAuthenticated(false)
                setUser(null)
                return
            }
            
            try {
                const res = await verifyTokenRequest(token)
                if (!res.data){
                    setIsAuthenticated(false)
                    return
                }

                setUser(res.data)
                setIsAuthenticated(true)
            }
            catch (err) {
                setIsAuthenticated(false)
                setUser(null)
                console.log(err)
            }
        
        }
        checkLogin()
    }, [])

    useEffect(() => {
        if ( errors.length > 0){
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    },[errors])

    return(
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated,
            errors, 
            singup,
            singin,
            logout,
            update
        }}>
            { children }
        </AuthContext.Provider>
    )
}