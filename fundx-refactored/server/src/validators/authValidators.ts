import { z } from "zod";

const publicRegistrationRoleSchema = z.enum(["CUSTOMER", "DSA"]).default("CUSTOMER");

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: publicRegistrationRoleSchema,
    phone: z.string().optional(),
  }),
});

export const loginSchema = z.object({ body: z.object({ email: z.string().email(), password: z.string().min(6) }) });
export const forgotPasswordSchema = z.object({ body: z.object({ email: z.string().email() }) });
export const resetPasswordSchema = z.object({ body: z.object({ token: z.string().min(16), password: z.string().min(8) }) });
