import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })

    const { handleLogin } = useAuth()
    const { user, loading, error } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && user) {
            navigate('/')
        }
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        await handleLogin(formData)
    }

    return (
        <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-[#167A85]/20 bg-[#10151a] p-8 shadow-[0_20px_50px_rgba(49,184,198,0.18)]">
                <div className="mb-8 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-[#167A85]/80">Welcome back</p>
                    <h1 className="mt-4 text-4xl font-semibold text-white">Sign in</h1>
                    <p className="mt-2 text-sm text-gray-400">Access your account using your email and password.</p>
                </div>

                <form onSubmit={submitForm} className="space-y-6">
                    {error && (
                        <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-[#167A85]/25 bg-[#111018] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#167A85] focus:ring-2 focus:ring-[#167A85]/20"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full rounded-2xl border border-[#167A85]/25 bg-[#111018] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#167A85] focus:ring-2 focus:ring-[#167A85]/20"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-2xl cursor-pointer bg-[#167A85] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#167A85]/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:bg-[#167A85]/50 disabled:shadow-none"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    New here?{' '}
                    <Link to="/register" className="font-semibold text-[#167A85] hover:text-[#6de1eb]">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
