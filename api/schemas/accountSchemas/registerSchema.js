import { z } from "zod";
import { UserRole } from "@prisma/client";

const registerSchema = z.object({
  email: z.string().email().min(1, { message: "Email Is Missing" }),
  firstName: z
    .string()
    .min(1, { message: "First Name Is Missing" })
    .min(2, { message: "First Name Must Be At Least 2 Characters Long" })
    .max(50, {
      message: "First Name Must Be At The Very Maximum 50 Characters Long",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last Name Is Missing" })
    .min(2, { message: "Last Name Must Be At Least 2 Characters Long" })
    .max(50, {
      message: "Last Name Must Be At The Very Maximum 50 Characters Long",
    }),
  password: z
    .string()
    .min(5, {
      message: "Password Must Be At Least 5 Characters Long",
    })
    .max(50, {
      message: "Password Must Be At The Very Maximum 50 Characters Long",
    }),
  role: z.nativeEnum([UserRole.DOCTOR, UserRole.PATIENT], {
    errorMap: (issue, ctx) => {
      return { message: "Role Is Missing Or Invalid" };
    },
  }),
});

export default registerSchema;
