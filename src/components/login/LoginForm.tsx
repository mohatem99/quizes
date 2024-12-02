"use client";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import SocialLinks from "./SocialLinks";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";

const loginUserSchema = z.object({
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
});
type LoginFormInputs = z.infer<typeof loginUserSchema>;
const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginUserSchema),
  });
  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs,
    event?: React.FormEvent
  ) => {
    event?.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: data.email,
        password: data.password,
      });

      if (result && result.ok) {
        toast.success("login scussfully");
        router.push("/");
      } else {
        toast.error("Please Try again");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error("Please Try again");
    }
  };
  return (
    <div>
      <div className="  mt-[80px] mr-[80px]">
        <NavMenu />
      </div>
      <div className="flex  flex-col justify-center items-center">
        <div className="w-[410px] h-[490px]">
          <h2 className="font-bold text-2xl">Sign in</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="space-y-[32px]"
          >
            <div>
              <input
                placeholder="Enter Email"
                type="email"
                id="email"
                {...register("email")}
                required
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2
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
                id="password"
                {...register("password")}
                required
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.password ? "border-red-500" : "border"
           }`}
              />{" "}
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Link
              href="/forget-password"
              className="block m-0 mt-[1px] text-[#4461F2] self-end text-right font-normal "
            >
              Recover Password ?
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full p-[8px] bg-[#4461F2]
         text-white rounded-md shadow
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
