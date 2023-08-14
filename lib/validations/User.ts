import * as z from 'zod'

export const UserValidation = z.object({
    profile_photo : z.string().url().nonempty(),
    username: z.string().min(3).max(30),
    emailAddresses: z.string().nonempty(),
    phone_number : z.string().min(1).max(10).transform((v)=> Number(v)|| 0),
    bio:z.string().min(3).max(1000)
})

export const UserBio = z.object({
    bio: z.string().min(3).max(1000)
})