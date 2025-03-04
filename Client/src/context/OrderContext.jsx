import { createContext, useContext, useState } from "react";
import { createOrderRequest, getOrderRequest, getOrdersRequest } from "../api/order";


export const OrderContext = createContext()

export const useOrder = () => {
    const context = useContext(OrderContext)
    if(!context) {
        throw new Error('useOrder must be used within a OrderProvider')
    }
    return context
}

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(null)
    const [order, setOrder] = useState(null)
    const [error, setErrors] = useState([])

    const createOrder = async () =>{
        try{
            const res = await createOrderRequest()
            setOrders(res.data)
        } catch(err){
            setErrors(err.response.data)
        }
    }

    const getOrders = async () => {
        try {
            const res = await getOrdersRequest()
            setOrders(res.data)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    const getOrder = async (orderId) => {
        try{
            const res = await getOrderRequest(orderId)
            setOrder(res.data)
        } catch (err) {
            setErrors(err.response.data)
        }
    }

    return(
        <OrderContext.Provider value = {{
                orders,
                order,
                error,
                getOrders,
                getOrder,
                createOrder
        }}>
            {children}
        </OrderContext.Provider>
    )
}