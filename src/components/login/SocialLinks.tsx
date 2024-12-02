import Image from "next/image";
import { signIn } from "next-auth/react";
const SocialLinks = () => {
  return (
    <div>
      <div className="flex items-center my-4">
        <hr className="flex-grow border-[#E7E7E7]" />
        <span className="px-4 text-[#6C737F]">Or Continue with</span>
        <hr className="flex-grow border-[#E7E7E7]" />
      </div>

      <div
        className="flex justify-evenly mt-10
    "
      >
        <div
          className="flex justify-center items-center w-[65px] h-[65px] 
      border  border-1 border-[#E0E0E9] rounded-2xl shadow-[0px_18.45px_30.75px_0px_#4461F21C]"
        >
          <Image
            src={"/google-auth.png"}
            width={25}
            height={25}
            alt="google auth image"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          />
        </div>
        <div
          className="flex justify-center items-center w-[65px] h-[65px] 
      border  border-1 border-[#E0E0E9] rounded-2xl shadow-[0px_18.45px_30.75px_0px_#4461F21C]"
        >
          <Image
            src={"/facebook-auth.png"}
            width={25}
            height={25}
            alt="google auth image"
          />
        </div>
        <div
          className="flex justify-center items-center w-[65px] h-[65px] 
      border  border-1 border-[#E0E0E9] rounded-2xl shadow-[0px_18.45px_30.75px_0px_#4461F21C]"
        >
          {" "}
          <Image
            src={"/x-auth.png"}
            width={25}
            height={25}
            alt="google auth image"
          />
        </div>
        <div
          className="flex justify-center items-center w-[65px] h-[65px] 
      border  border-1 border-[#E0E0E9] rounded-2xl shadow-[0px_18.45px_30.75px_0px_#4461F21C]"
        >
          {" "}
          <Image
            src={"/apple-auth.png"}
            width={25}
            height={25}
            alt="google auth image"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
