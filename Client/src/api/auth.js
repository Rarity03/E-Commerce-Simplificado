import axios from './axios'

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const logoutRequest = user => axios.post(`/logout`, user)

export const verifyTokenRequest = user => axios.get(`/verify-token`, user)

export const updateProfileRequest = user => axios.put(`/profile/${user.id}`, user)
