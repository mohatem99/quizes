"use server";

import { z } from "zod";

const registerUserSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .nonempty("Firstname is required"),
  lastname: z
    .string()
    .min(2, "Lastname must be at least 2 characters.")
    .nonempty("Lastname is required."),
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required."),
  confirmPassword: z
    .string()
    .nonempty({ message: "Confirm password is required." })
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Passwords must match.",
    }),
});

export async function register(formData: FormData) {
  let fields = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstname: formData.get("firstname"),
    lastname: formData.get("lastname"),
  };
  // Validate data
  const validatedData = registerUserSchema.parse(fields);
}
