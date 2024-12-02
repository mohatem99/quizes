"use client";

import Link from "next/link";
import SocialLinks from "./SocialLinks";
import NavMenu from "./NavMenu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const resetPAsswordSchema = z
  .object({
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    rePassword: z.string(),
  })
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords must match.",
    path: ["rePassword"], // This points to the rePassword field for the error.
  });
type resetInputs = z.infer<typeof resetPAsswordSchema>;
function ResetForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetInputs>({
    resolver: zodResolver(resetPAsswordSchema),
  });
  const onSubmit: SubmitHandler<resetInputs> = async (
    data: resetInputs,
    event?: React.FormEvent
  ) => {
    event?.preventDefault();
    try {
      console.log(email, data);
      const response = await axios.put(
        `https://exam.elevateegy.com/api/v1/auth/resetPassword`,
        {
          email,
          newPassword: data.newPassword,
        }
      );
      console.log(response);
      toast.success("Password reset successful. You can now login.");
      router.push("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to process request."
      );
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("forgottenEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      toast.error("No email found. Please restart the process.");
      router.push("/forget-password");
    }
  }, []);
  return (
    <div>
      <div className="  mt-[80px] mr-[80px]">
        <NavMenu />
      </div>
      <div className="flex  flex-col justify-center items-center">
        <div className="w-[410px] h-[490px]">
          <h2 className="font-bold text-2xl">Set a Password</h2>
          <form
            method="POST"
            className="space-y-[32px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                placeholder="Create Password"
                type="password"
                required
                {...register("newPassword")}
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.newPassword ? "border-red-500" : "border"
           }`}
              />{" "}
              {errors.newPassword && (
                <p className="text-red-500">{errors.newPassword.message}</p>
              )}
            </div>
            <div>
              <input
                placeholder="Re-enter Password"
                type="password"
                {...register("rePassword")}
                required
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.rePassword ? "border-red-500" : "border"
           }   `}
              />{" "}
              {errors.rePassword && (
                <p className="text-red-500">{errors.rePassword.message}</p>
              )}
            </div>

            <button
              type="submit"
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
}

export default ResetForm;
