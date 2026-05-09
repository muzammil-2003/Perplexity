import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Dashboard from './features/chat/Pages/Dashboard'
import Protected from './features/auth/components/Protected'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Protected><Dashboard /></Protected>
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
])