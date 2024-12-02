"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SocialLinks from "./SocialLinks";
import NavMenu from "./NavMenu";
import Link from "next/link";

// Zod schema for client-side validation
const registerUserSchema = z
  .object({
    phone: z
      .string()
      .min(11, "phone must be at least 11 characters.")
      .nonempty("phone is required."),
    firstName: z
      .string()
      .min(1, "First name must be at least 1 character.")
      .nonempty("Firstname is required."),
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long.")
      .max(25, "Username must be at most 25 characters long.")
      .nonempty("Username is required."),
    lastName: z
      .string()
      .min(1, "Last name must be at least 1 character.")
      .nonempty("Lastname is required."),
    email: z
      .string()
      .email("Invalid email address.")
      .nonempty("Email is required."),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    rePassword: z.string().nonempty("Confirm password is required."),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match.",
    path: ["rePassword"], // This points to the confirmPassword field for the error.
  });
type RegisterFormInputs = z.infer<typeof registerUserSchema>;
const RgisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerUserSchema),
    mode: "onBlur", // Validate fields on blur
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data, event) => {
    event?.preventDefault();

    try {
      const response = await axios.post(
        `https://exam.elevateegy.com/api/v1/auth/signup`,
        data
      );

      if (response.status == 200) {
        toast.success("Registration successful. You can now login.");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="  mt-[80px] mr-[80px]">
        <NavMenu />
      </div>
      <div className="flex  flex-col justify-center items-center">
        <div className="w-[410px] h-[490px]">
          <h2 className="font-bold text-2xl">Verify code</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-[10px]">
            <div>
              <input
                placeholder="First Name"
                type="text"
                {...register("firstName")}
                required
                className={`bg-[#F9F9F9] mt-[15px] block w-full p-2
                   border rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.firstName ? "border-red-500" : "border"
           }`}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Last Name"
                type="text"
                id="email"
                {...register("lastName")}
                required
                className={`bg-[#F9F9F9]  block w-full p-2
                   border rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.email ? "border-red-500" : "border"
           }`}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Phone"
                type="text"
                {...register("phone")}
                required
                className={`bg-[#F9F9F9] block w-full p-2
                   border rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.email ? "border-red-500" : "border"
           }`}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Username"
                type="text"
                id="email"
                {...register("username")}
                required
                className={`bg-[#F9F9F9] block w-full p-2
                   border rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.username ? "border-red-500" : "border"
           }`}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Enter Email"
                type="email"
                id="email"
                {...register("email")}
                required
                className={`bg-[#F9F9F9]  block w-full p-2
                   border rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.email ? "border-red-500" : "border"
           }`}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Password"
                type="password"
                {...register("password")}
                required
                className={`bg-[#F9F9F9] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.password ? "border-red-500" : "border"
           }`}
              />{" "}
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Confirm Password"
                type="password"
                {...register("rePassword")}
                required
                className={`bg-[#F9F9F9] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.rePassword ? "border-red-500" : "border"
           }`}
              />{" "}
              {errors.rePassword && (
                <p className="text-red-500">{errors.rePassword.message}</p>
              )}
            </div>
            <p className="block m-0 mt-[1px] self-end text-right font-normal ">
              Already have an account?{" "}
              <Link href="/login" className="text-[#4461F2] ">
                Login
              </Link>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default RgisterForm;
