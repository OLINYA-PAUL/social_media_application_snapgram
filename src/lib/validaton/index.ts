import { z } from "zod";

export const SignUpValidation = z.object({
  name: z.string().max(20).min(15, { message: "name is required pls!" }),
  username: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  email: z.string().email().max(30, { message: "email is required" }),
  password: z
    .string()
    .min(8, { message: "password must be aleast 4-6 characters" }),
});

export const SignInValidation = z.object({
  email: z.string().email().max(30, { message: "email is required" }),
  password: z
    .string()
    .min(8, { message: "password must be aleast 4-6 characters" }),
});

export const postFormSchema = z.object({
  caption: z
    .string()
    .min(5, { message: "Minimum 5 characters." })
    .max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(1, { message: "This field is required" })
    .max(1000, { message: "Maximum 1000 characters." }),
  tags: z.string(),
});
