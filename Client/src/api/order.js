import axios from './axios'

export const createOrderRequest = () => axios.post(`/order`)

export const getOrdersRequest = () => axios.get(`/user-orders`)

export const getOrderRequest = (orderId) => axios.get(`/user-order/${orderId}`)