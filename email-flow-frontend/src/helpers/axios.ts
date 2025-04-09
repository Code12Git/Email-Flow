import axios from 'axios'

const BASE_URL = 'https://email-flow-1-nrla.onrender.com/api'
const token = localStorage.getItem('token')?.replace(/"/g, '');

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
export const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
})