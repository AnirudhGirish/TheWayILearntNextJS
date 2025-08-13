import {z} from "zod";

export const adminSignInSchema = z.object({
    username:z.string().min(5).max(15).regex(/[a-zA-Z0-9_]+$/,"Username must not have special characters"),
    password:z.string().min(4).max(12)
})