import z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(4, "Username is Required!"),
    password: z.string().min(6, "Password must be 6 Characters!")
})

export type LoginSchemaType = z.infer<typeof LoginSchema>