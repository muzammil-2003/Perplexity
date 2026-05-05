import { Router } from "express";
import { getMe, login, register, verifyEmail } from "../controllers/auth.controller.js";
import validate from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/user.schema.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 * */
authRouter.post('/register', validate(registerSchema), register)

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email, password}
 */
authRouter.post('/login', validate(loginSchema), login)

/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
 */
authRouter.get('/get-me', authUser, getMe)


/**
 * @route POST /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query {token}
 * */
authRouter.get('/verify-email', verifyEmail)

export default authRouter