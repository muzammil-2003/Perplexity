import { useDispatch } from 'react-redux'
import { register, login, getMe } from '../service/auth.api'
import { setUser, setLoading, setError } from '../auth.slice'

export const useAuth = () => {
    const dispatch = useDispatch()

    const handleRegister = async ({ email, username, password }) => {

        try {

            dispatch(setLoading(true))
            const data = await register({ email, username, password })

        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Registration failed'))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({ email, password }) => {

        try {
            dispatch(setLoading(true))
            const data = await login({ email, password })
            dispatch(setUser(data.user))
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || 'Login failed'))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    const fetchCurrentUser = async () => {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to fetch user'))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin, fetchCurrentUser }
}