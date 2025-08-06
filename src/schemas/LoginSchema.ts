import z from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be 6 Characters!")
})

export type LoginSchemaType = z.infer<typeof LoginSchema>