import * as z from 'zod'

export const registerSchema = z.object({
    username: z.string({ required_error: "Username is required", })
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

    email: z.string({ required_error: "Email is required", })
        .email('Invalid Email Format')
        .toLowerCase()
        .trim(),

    password: z.string({ required_error: "Password is required", })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
})


export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required", }).email('Invalid Email Format.'),

    password: z.string({ required_error: "Password is required", })
        .min(1, "Password cannot be empty"),
});