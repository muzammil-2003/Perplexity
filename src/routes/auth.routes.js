import { Router } from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";

const authRouter = Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username, email, password}
 * */
authRouter.post('/register', register)

authRouter.get('/verify-email', verifyEmail)

export default authRouter