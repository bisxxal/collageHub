"use client";

import ForgotPasswordPage from "@/components/forgot";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";    
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuLoader } from "react-icons/lu";

const LoginPage = () => {
  const {   user } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata?.role;

    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center ]">
 
      { !user && <SignIn.Root>
        <SignIn.Step
          name="start"
          className="w-[30%] max-lg:w-[50%] space-y-6 rounded-2xl inshadow frame !text-white px-4 py-10 shadow-md ring-1 ring-black/5 max-md:w-96  sm:px-8"
        >
          <header className="text-center">
       
            <h1 className="mt-4 max-md:text-2xl text-3xl text-[#3352cc] font-medium tracking-tight ">
              Sign in to Collage-hub
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium ">Username</Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full rounded-md bg-transparent px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-500 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium ">Password</Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="w-full rounded-md bg-transparent px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-500 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit
            className="w-full !border-none rounded-md bg-zinc-950 px-3.5 py-1.5 text-center text-sm font-medium text-white shadow !outline-none  hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-500 active:text-white/70"
          >
            Sign In
          </SignIn.Action>
        
        </SignIn.Step>
      </SignIn.Root>}

      {
        user && <div className="text-white"> <h1 className=' animate-spin text-2xl mt-5 text-gray-400' >
        <LuLoader />
    </h1></div>
      }

      {/* <ForgotPasswordPage/> */}
    </div>
  );
};

export default LoginPage;