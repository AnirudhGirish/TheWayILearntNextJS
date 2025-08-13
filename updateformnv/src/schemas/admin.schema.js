import {z} from 'zod';

export const adminSchema = z.object({
    username:z.string().min(5).max(15).regex(/[a-zA-Z0-9_]+$/,"Username must not have special characters"),
    email:z.string().email(),
    password:z.string().min(4).max(12)
});