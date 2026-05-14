import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import chatRouter from './routes/chat.routes.js'
import errorHandler from './middleware/error.middleware.js'
import morgan from 'morgan'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))
app.use(morgan('dev'))

app.use('/api/auth', authRouter)
app.use('/api/chats', chatRouter)


app.use(errorHandler)

export default app