"use client";
import Link from "next/link";
import NavMenu from "./NavMenu";
import SocialLinks from "./SocialLinks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const verifySchema = z.object({
  resetCode: z.string().regex(/^\d{6}$/, "Reset code must be exactly 6 digits"),
});
type verfiyInputs = z.infer<typeof verifySchema>;
export default function VerfiyForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<verfiyInputs>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("forgottenEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      toast.error("No email found. Please restart the process.");
      router.push("/forget-password");
    }
  }, []);
  const onSubmit: SubmitHandler<verfiyInputs> = async (
    data: verfiyInputs,
    event?: React.FormEvent
  ) => {
    event?.preventDefault();

    try {
      const response = await axios.post(
        "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
        data
      );

      if (response && response.status === 200) {
        toast.success("Reset Code verified successfully");
        router.push("/reset-password");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to process request."
      );
      // toast.error("Failed to verify Reset Code");
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post(
        `https://exam.elevateegy.com/api/v1/auth/forgotPassword`,
        {
          email,
        }
      );
      if (response && response.status === 200) {
        toast.success(response.data.info);
      }
    } catch (err) {
      toast.error(err.response.data.message);
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
          <form
            method="POST"
            className="space-y-[32px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                {...register("resetCode")}
                placeholder="Enter Code"
                type="text"
                required
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.resetCode ? "border-red-500" : "border"
           } `}
              />{" "}
              {errors.resetCode && (
                <p className="text-red-500">{errors.resetCode.message}</p>
              )}
            </div>
            <p className="block m-0 mt-[1px] self-end text-right font-normal ">
              Didn’t receive a code?
              <button className="text-[#4461F2] " onClick={handleResend}>
                Resend
              </button>
            </p>
            <button
              type="submit"
              className="w-full p-[8px] bg-[#4461F2]
         text-white rounded-md shadow
          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verify
            </button>
          </form>
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
