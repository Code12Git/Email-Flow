import {z} from 'zod'

const userSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string()
        .min(4, { message: 'Name should contain at least 4 characters' })
        .max(25, { message: 'Name should not be more than 25 characters' })
        .optional(),
    username: z.string().optional(),
    email: z.string().email(),
    role: z.enum(['admin', 'user']).optional(),
    emailQuota: z.number()
        .min(0, { message: 'Quota should be minimum 0' })
        .max(8000, { message: 'Quota should be maximum 8000' })
        .default(400),
    isVerified: z.boolean().optional(),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
});

export default userSchema;
