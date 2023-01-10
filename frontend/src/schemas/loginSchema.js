import * as z from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email is too long" }),
  password: z
    .string()
    .min(1, "Password is required")
    .max(255, "Password is too long"),
});

export default loginSchema;
