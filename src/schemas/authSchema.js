import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .max(50, "Username must not exceed 50 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .max(50, "Username must not exceed 50 characters"),
    firstname: z
      .string()
      .trim()
      .min(1, "Firstname is required")
      .max(50, "Firstname must not exceed 50 characters"),

    lastname: z
      .string()
      .trim()
      .min(1, "Lastname is required")
      .max(50, "Lastname must not exceed 50 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters long"),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
