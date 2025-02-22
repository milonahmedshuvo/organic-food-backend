import { z } from "zod";

// .min(11, "Phone number must be at least 11 characters long"),
const createUserSchema = z.object({
 body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    role: z.enum(["customer", "admin"]).default("customer"),
    wishlist: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID")).optional(),
 })
});



const loginUserSchema = z.object({
    body : z.object({
        email : z.string().email('Email is invalid format'),
        password: z.string().min(4, 'password must be at least 4 characters long')
    })
})

export const userValidations = {
    createUserSchema,
    loginUserSchema
}