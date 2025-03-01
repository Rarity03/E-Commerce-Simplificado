import { createContext, useContext, useState } from "react";
import { addToCarRequest, decreaseFromCarRequest, deleteCarRequest, getCarRequest, removeFromCarRequest } from "../api/car";

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
            setCar(res.data.products)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const addCar = async (productId, amount) => {
        try {
            const res = await addToCarRequest({ productId, amount })
            setCar(res.data.products);
            await getCar()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const decreaseCar = async (productId) => {
        try {
            const res = await decreaseFromCarRequest(productId)
            setCar(res.data.products);
            await getCar()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const removeCar = async (user) => {
        try{
            const res = await removeFromCarRequest(user)
            setCar(res.data.products);
            await getCar()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const deleteCar = async () => {
        try{
            const res = await deleteCarRequest()
            setCar(res.data.products);
            await getCar()
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
            removeCar,
            decreaseCar,
            deleteCar
        }}>
            {children}
        </CarContext.Provider>
    )

}