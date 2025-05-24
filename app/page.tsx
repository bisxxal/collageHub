"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import { TbBrandCashapp } from "react-icons/tb";
import { LuDatabase } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdManageHistory } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
 import { MdOutlineWebStories } from "react-icons/md";

const MainHeroPage = () => {
  const user = useUser();
  const role = user.user?.publicMetadata?.role as string;
  const firstName = user.user?.firstName as string;
  const lastName = user.user?.lastName as string;
  const router = useRouter();
  useEffect(() => {
    if (role) {
      router.push(`/${role}`);
    }
  }, [role, router]);

  return (
    <div className=" w-full relative overflow-hidden">
      <nav className=" navbaranimation fixed top-0 z-30 bg-[#a09fa515] h-[60px] flex items-center  w-full  backdrop-blur-[10px] justify-between p-4 ">
      {user.isSignedIn ?  <Link href={`/${role}`} className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold"> College Hub </span>
        </Link> : <Link href="/" className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold">College Hub </span>
        </Link>}


        {user.isSignedIn ? (
          <div className=" flex gap-2">
            <div className="flex flex-col  ">
              <span className="text-sm max-md:text-[10px] leading-3 font-medium">
                {firstName} {lastName}
              </span>
              <span className="text-[12px] max-md:text-[10px] text-gray-500 text-right">
                {role}
              </span>
            </div>
            <UserButton />
          </div>
        ) : (
          <Link href="/sign-in">
            <button className="buttonbg text-white px-4 py-2 rounded-full">Sign In</button>
          </Link>
        )}
      </nav>

      <div className="w-full relative mt-[62px]  min-h-screen inset-0  ">
        <div className=" relative flex flex-col items-center justify-center gap-0 max-md:gap-20 mt-20">

        <div>
          <Image src="/bgl.svg" alt="logo" width={400} height={400} className="siedepng absolute left-0 top-0 h-full w-[500px] max-md:w-[190px] " />
          <Image src="/bgr.svg" alt="logo" width={400} height={400} className="siedepng2 absolute right-0 top-0 h-full w-[500px] max-md:w-[190px] max-md:-top-20 " />
        </div>
          <p className="text-center text-lg max-md:text-xs text-gray-400 mt-20 max-md:mt-[180px] z-30 hover -mb-14">
            Your one-stop solution for all collage-related information.
          </p>
          <h1 className="text-[150px] appear cursor-default max-md:text-[60px] hover:text-[155px] footertext max-md:hover:text-[62px]  transition-all font-bold text-center logo2 max-md:-mb-28 -mb-16">
          College Hub
          </h1>
         

          <video autoPlay muted loop controls={false} className=" z-[30] heroimgshadow hover:scale-[1.02] duration-500 transition-all rounded-2xl border-x  border-[#ffffff29] max-md:w-[85%] max-md:h-[185px] w-[1200px] object-cover object-bottom h-[670px] saturate-150 " src="https://res.cloudinary.com/ddexkiaja/video/upload/v1747245246/video_ceqh98.mp4"></video>

        </div>

        
      </div>

         <div className=" -top-20 -right-40 blur-[150px] h-[500px] w-[500px] opacity-[.3] max-md:h-[300px] max-md:w-[300px]  rounded-full  bg-[#bd3ee09c] absolute"> </div>
      <div className="  relative ">
         <div className=" absolute max-md:bottom-32 bottom-20 -left-40 max-md:-left-10 blur-[150px] max-md:blur-[100px] max-md:h-[300px] max-md:w-[300px] h-[500px] w-[500px] opacity-[.4] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-5   max-md:absolute "></div>
      </div>

      <p className=" text-center  z-40 -mt-10 max-md:-mt-60 text-zinc-200 text-xl max-md:text-xs">
        A comprehensive college management platform
      </p>

      <div className="min-h-screen mt-10 flex flex-col items-center justify-evenly">
        <h1 className="text-center text-7xl max-md:text-5xl font-extrabold my-16">Why College Hub ? </h1>

        <div className="relative  flex w-[90%] mx-auto flex-col gap-4"> 

            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><FaUniversity />Manage multiple collages </p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><MdOutlineAdminPanelSettings  className=" text-green-500"/>            Secure & Role-Based Access</p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><LuDatabase className=" text-yellow-600" />Centralized Data Management</p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><TbBrandCashapp className=" text-red-500" />Online Fee Payment</p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><FcSalesPerformance /> Real-time Attendance & Performance Tracking</p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><MdManageHistory className=" text-indigo-500" />Examination Management & Finance magement</p>
            <p className="flex h-[120px] max-md:h-[80px] max-md:hover:h-[100px] footertext heroimgshadow hover:scale-105 hover:h-[150px] hover:font-bold items-center justify-center gap-3 text-center border border-[#5c38c9cd] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><MdOutlineWebStories className=" text-cyan-500"/>Modern & interactive ui</p>
        </div>

  </div>
        <footer className="w-full relative overflow-hidden ">
        <p className=" absolute text-gray-400 font-mono block max-md:left-5 max-md:bottom-5 left-10 bottom-10">copyright @2025</p>
        <h1 className="flex max-md:text-[50px] max-md:-mb-6 text-[200px] -mb-28 font-semibold  w-full justify-center cursor-default text-center slogo ">
          <span className="  footertext ">C</span>
          <span className="  footertext ">o</span>
          <span className="  footertext ">l</span>
          <span className="  footertext ">l</span>                
          <span className="  footertext ">e</span>
          <span className="  footertext ">g</span>
          <span className="  footertext ">e</span>
          <span className="  footertext ">{"  - "}</span>
          <span className="  footertext ">H</span>
          <span className="  footertext ">u</span>
          <span className="  footertext ">b</span>
          </h1>

        </footer>
    
    </div>
  );
};

export default MainHeroPage;
