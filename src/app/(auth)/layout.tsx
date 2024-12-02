import React from "react";
import Image from "next/image";
const AuthLAyout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-screen flex flex-row">
        <div
          className="flex basis-3/6 flex-col bg-[#F0F4FC]
         p-10 border rounded-r-[100px] shadow-[0_5px_100px_0_rgba(0,0,0,0.1)]"
        >
          <div className="p-[80px] w-[482px]">
            <h1 className="text-3xl font-bold leading-[75px]">
              Welcome to{" "}
              <span className="text-[#122D9C] block text-4xl">Elevate</span>
            </h1>
            <p className="leading-10 text-lg font-normal">
              Quidem autem voluptatibus qui quaerat aspernatur architecto natus
            </p>
            <Image
              width={408}
              height={434.59}
              src={"/bro.png"}
              alt="background auth"
            />
          </div>
        </div>
        <div className=" basis-3/6">{children}</div>
      </div>
    </>
  );
};

export default AuthLAyout;
