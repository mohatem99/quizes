"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NavMenu from "./NavMenu";
import SocialLinks from "./SocialLinks";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .nonempty("Email is required."),
});

type forgetTypes = z.infer<typeof forgetPasswordSchema>;
const ForgetForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<forgetTypes>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  const onSubmit: SubmitHandler<forgetTypes> = async (
    data: forgetTypes,
    event?: React.FormEvent
  ) => {
    event?.preventDefault();
    try {
      const response = await axios.post(
        `https://exam.elevateegy.com/api/v1/auth/forgotPassword`,
        data
      );
      if (response && response.status === 200) {
        localStorage.setItem("forgottenEmail", data.email);
        toast.success(response.data.info);
        router.push("/verify-code");
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
          <h2 className="font-bold text-2xl">Forgot your password?</h2>
          <form
            method="POST"
            className="space-y-[32px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                placeholder="Enter Email"
                type="text"
                required
                {...register("email")}
                className={`bg-[#F9F9F9] mt-[32px] block w-full p-2 border 
                  rounded-md shadow-sm focus:outline-none
           focus:ring-blue-500 focus:border-blue-500 ${
             errors.email ? "border-red-500" : "border"
           } `}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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

export default ForgetForm;
