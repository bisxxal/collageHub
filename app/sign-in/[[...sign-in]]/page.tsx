"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";    
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LuLoader } from "react-icons/lu";

const LoginPage = () => {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen relative flex items-center justify-center  !overflow-hidden">
 
      { !user && 
      <SignIn.Root>
     <div className=" w-full h-full group flex flex-col items-center   justify-center">
       <div className=" -top-20 -right-40 blur-[150px] h-[500px] w-[500px] opacity-[.3] max-md:h-[300px] max-md:w-[300px]  rounded-full  bg-[#bd3ee09c] absolute"> </div>
        <div className=" absolute max-md:bottom-32 bottom-20 -left-40 max-md:-left-10 blur-[150px] max-md:blur-[100px] max-md:h-[300px] max-md:w-[300px] h-[500px] w-[500px] opacity-[.4] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-5   max-md:absolute "></div>
  
       <p className=" text-center  z-40 -mt-10 max-md:-mt-60 text-zinc-400 text-xl max-md:text-xs">
        A comprehensive college management platform
      </p>
      <Link href={'/'} className=" footertext cursor-pointer text-center   boxanimation  w-full text-[200px] max-lg:text-[100px] max-md:text-[60px]  slogo  font-bold ">College Hub</Link>

      <div className="w-[35%] h-[390px]  -mt-44 max-md:-mt-10  appear backdrop-blur-lg  max-md:h-[270px] max-lg:w-[60%] space-y-6 rounded-2xl sging !text-white px-4 py-10 shadow-md ring-1 ring-black/5 max-md:w-[90%]  sm:px-8 ">
        <SignIn.Step name="start">
          <header className="text-center">
       
            <h1 className="mt-4 max-md:text-2xl   text-5xl logo font-medium tracking-tight ">
              Sign in to your account
            </h1>
          </header>
          <Clerk.GlobalError className="block text-sm text-red-400" />
          <div className="  flex flex-col gap-5 mb-5  space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium ">Username</Clerk.Label>
              <Clerk.Input type="text" required
                className="w-full rounded-2xl bg-transparent px-3.5 inputbg py-2 max-md:py-1 max-md:h-10  h-12  outline-none ring-1 ring-inset ring-zinc-600 hover:ring-zinc-500 focus:ring-[1.5px] focus:ring-zinc-500 data-[invalid]:ring-red-400"/>
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm  font-medium ">Password</Clerk.Label>
              <Clerk.Input type="password" required
                className="w-full rounded-2xl bg-transparent px-3.5 inputbg py-2  max-md:py-1 max-md:h-10   h-12 outline-none ring-1 ring-inset ring-zinc-600 hover:ring-zinc-500 focus:ring-[1.5px] focus:ring-zinc-500 data-[invalid]:ring-red-400"/>
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
          </div>
          <SignIn.Action
            submit className="w-full !border-none rounded-2xl bg-zinc-9 buttonbg hover:scale-105 transition-all mt-5 h-12 max-md:text-base  max-md:py-1 max-md:h-10  text-xl px-3.5 py-2 text-center font-medium text-white shadow !outline-none  hover:bg-zinc-800 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-zinc-500 active:text-white/70">
            Sign In
          </SignIn.Action>
        
        </SignIn.Step>
        
      </div>
     </div>
      </SignIn.Root>
      }

      {
        user && <div className="text-white"> <h1 className=' animate-spin text-2xl mt-5 text-gray-400'> <LuLoader /></h1></div>
      }

    </div>
  );
};

export default LoginPage;