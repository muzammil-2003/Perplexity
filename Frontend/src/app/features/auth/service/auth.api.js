import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})

export const register = async ({email, username, password}) => {
    const response = await api.post('/api/auth/register', {email, username, password})
    return response.data
}

export const login = async ({email, password}) => {
    const response = await api.post('/api/auth/login', {email, password})
    return response.data
}

export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/get-me')
        return response.data
    } catch (error) {
        // Silently return null on 401 (not logged in)
        if (error.response?.status === 401) {
            return null
        }
        throw error
    }
}