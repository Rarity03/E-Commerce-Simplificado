import axios from './axios'

export const addToCarRequest = (productId, amount) => axios.post(`/car-add`, productId, amount)

export const removeFromCarRequest = (productId) => axios.post(`/car-remove`, { productId })

export const getCarRequest = user => axios.get(`/car`, user)

export const decreaseFromCarRequest = (productId) => axios.post(`/car-decrease`, { productId });

export const deleteCarRequest = () => axios.delete(`/car`)

export const totalCarCountRequest = () => axios.get(`/car-count`)