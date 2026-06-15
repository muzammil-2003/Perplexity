import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { register, login, getMe } from '../service/auth.api'
import { setUser, setLoading, setError } from '../auth.slice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const error = useSelector(state => state.auth.error)

    const handleRegister = async ({ email, username, password }) => {
        try {
            dispatch(setLoading(true))
            await register({ email, username, password })
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

    const fetchCurrentUser = useCallback(async () => {
        try {
            dispatch(setLoading(true))
            const data = await getMe()
            if (data) {
                dispatch(setUser(data.user))
            }
        }
        catch (error) {
            dispatch(setUser(null))
        }
        finally {
            dispatch(setLoading(false))
        }
    }, [dispatch])

    return { user, loading, error, handleRegister, handleLogin, fetchCurrentUser }
}