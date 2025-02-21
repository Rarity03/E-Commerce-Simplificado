import { createContext, useContext, useState } from "react";
import { addToCarRequest, getCarRequest, removeFromCarRequest } from "../api/car";

export const CarContext = createContext()

export const useCar = () => {
    const context = useContext(CarContext)
    if(!context) {
        throw new Error('useCar must be used within a CarProvider')
    }
    return context
}


// eslint-disable-next-line react/prop-types
export const CarProvider = ({ children }) => {
    const [car, setCar] = useState(null)
    const [error, setErrors] = useState([])

    const getCar = async (user) => {
        try {
            const res = await getCarRequest(user);
            setCar(res.data.car)
            console.log('Este es el carrito',res.data.car)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const addCar = async (productId, amount) => {
        try {
            const res = await addToCarRequest({ productId, amount })
            setCar(res.data);
            console.log(res)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const removeCar = async (user) => {
        try{
            const res = await removeFromCarRequest(user)
            console.log(res)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    return (
        <CarContext.Provider value={{
            car,
            error,
            getCar,
            addCar,
            removeCar
        }}>
            {children}
        </CarContext.Provider>
    )

}