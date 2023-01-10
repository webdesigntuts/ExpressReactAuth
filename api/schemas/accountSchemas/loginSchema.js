import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(1, {
      message: "Password Field Is Required",
    })
    .max(255, {
      message: "Password Field Is Too Long",
    }),
});

export default loginSchema;
