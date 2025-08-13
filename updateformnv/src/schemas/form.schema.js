import {z} from 'zod';

export const formSchema = z.object({
    name: z.string().regex(/[a-zA-Z ]+$/,"Name must not have special characters"), 
    number: z.number().refine((val) => val.toString().length === 10, {message: "Phone number must be 10 digits"}),
    email: z.string().email({message:"Invalid email address"}).optional().or(z.literal('')), 
    address: z.string(), 
    // aadhar: z.number().refine((val) => val.toString().length === 12, {message: "Aadhar number must be 12 digits"}).optional().or(z.literal('')), 
    aadhar: z.string().length(12,{message:"Aadhar number must be 12 letters long"}).optional().or(z.literal('')),
    pass: z.enum(["SSLC", "PUC", "Degree", "Others"]).optional().or(z.literal('')),
    year: z.string().optional().or(z.literal('')),
})