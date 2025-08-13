import * as z from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(1, {message:"Email or Username is required"}).email({message:"Please enter a valid email"}),
    password: z.string().min(1, {message:"Password is required"}).min(4, {message:"Password must be minimum 4 characters"}),
});