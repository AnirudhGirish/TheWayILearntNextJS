import * as z from "zod";

export const signUpSchema = z.object({
    email: z
        .string()
        .min(1,{message:"Email is required"})
        .email({message:"Email is not vaild"}),
    password: z
        .string()
        .min(1,{message:"Passord is required"})
        .min(4, {message: "Password should be atleast of 4 letters"})
        .max(12, {message:"Password can be utmost 12 letters"}),
    passwordConfirmation: z
        .string()
        .min(1,{message:"Please confirm your password"}),
}).refine((data)=> data.password === data.passwordConfirmation, {
    message:"Password does not match",
    path:["passwordConfirmation"]
});