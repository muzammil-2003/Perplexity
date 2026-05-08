import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log('Register submitted', formData)
    // Add register request logic here
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#167A85]/20 bg-[#10151a] p-8 shadow-[0_20px_60px_rgba(49,184,198,0.18)]">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#167A85]/80">Create account</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Register</h1>
          <p className="mt-2 text-sm text-gray-400">Start your journey with a secure account.</p>
        </div>

        <form onSubmit={submitForm} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-[#167A85]/25 bg-[#111018] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-[#167A85] focus:ring-2 focus:ring-[#167A85]/20"
              placeholder="Choose a username"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl cursor-pointer bg-[#167A85] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#167A85]/20 transition hover:brightness-110"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#167A85] hover:text-[#6de1eb]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
