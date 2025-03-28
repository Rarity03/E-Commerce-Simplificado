import { createContext, useContext, useState } from "react";
import { addToCarRequest, decreaseFromCarRequest, deleteCarRequest, getCarRequest, removeFromCarRequest, totalCarCountRequest } from "../api/car";

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
    const [total, setTotal] = useState(0)

    const getCar = async (user) => {
        try {
            const res = await getCarRequest(user);
            setCar(res.data.products)
            await getCarCount()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const addCar = async (productId, amount) => {
        try {
            const res = await addToCarRequest({ productId, amount })
            setCar(res.data.products);
            await getCar()
            await getCarCount()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const decreaseCar = async (productId) => {
        try {
            const res = await decreaseFromCarRequest(productId)
            setCar(res.data.products);
            await getCar()
            await getCarCount()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const removeCar = async (user) => {
        try{
            const res = await removeFromCarRequest(user)
            setCar(res.data.products);
            await getCar()
            await getCarCount()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const deleteCar = async () => {
        try{
            const res = await deleteCarRequest()
            setCar(res.data.products);
            await getCar()
            await getCarCount()
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const getCarCount = async () => {
        try {
            const res = await totalCarCountRequest()
            setTotal(res.data.total)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    return (
        <CarContext.Provider value={{
            car,
            error,
            total,
            getCar,
            addCar,
            removeCar,
            decreaseCar,
            deleteCar,
            getCarCount 
        }}>
            {children}
        </CarContext.Provider>
    )

}