import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().max(20).min(15, { message: "name is required pls!" }),
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  email: z.string().email().max(30, { message: "email is required" }),
  password: z
    .string()
    .max(6)
    .min(4, { message: "password must be aleast 4-6 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email().max(30, { message: "email is required" }),
  password: z
    .string()
    .max(6)
    .min(4, { message: "password must be aleast 4-6 characters" }),
});
