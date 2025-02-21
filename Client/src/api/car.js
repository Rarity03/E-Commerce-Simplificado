import axios from './axios'

export const addToCarRequest = (productId, amount) => axios.post(`/car-add`, productId, amount)

export const removeFromCarRequest = user => axios.post(`/car-remove`, user)

export const getCarRequest = user => axios.get(`/car`, user)