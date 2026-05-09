import React from 'react'
import { useAuth } from './features/auth/hook/useAuth'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {

  const { user, loading, fetchCurrentUser } = useAuth()
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <>
      <Outlet />
    </>
  )
}

export default App