import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import errorHandler from './middleware/error.middleware.js'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))


app.use('/api/auth', authRouter)
app.use(errorHandler)

export default app