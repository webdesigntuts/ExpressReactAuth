import * as z from "zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .email()
      .min(1, { message: "Email is required" })
      .max(255, { message: "Email is too long" }),
    firstName: z
      .string()
      .min(1, { message: "First Name is required" })
      .max(255, { message: "First Name is too long" }),
    lastName: z
      .string()
      .min(1, { message: "Last Name is required" })
      .max(255, { message: "Last Name is too long" }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" })
      .max(255, { message: "Password is too long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" })
      .min(5, { message: "Confirm Password must be at least 5 characters" })
      .max(255, { message: "Confirm Password is too long" }),
    role: z
      .string()
      .min(1, { message: "Role is required" })
      .max(255, { message: "Role is too long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default registerSchema;
