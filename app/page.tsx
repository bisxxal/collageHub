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

      <div className="w-full relative mt-[62px]  min-h-screen inset-0 bg-[linear-gradient(to_right,#0f172a61_1px,transparent_1px),linear-gradient(to_bottom,#0f172a61_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(277%_81%_at_77%_-3%,#000_70%,transparent_110%)]">
        <div className=" flex flex-col items-center justify-center gap-0 max-md:gap-20 mt-20">
          <p className="text-center text-lg max-md:text-xs text-gray-400 mt-20 max-md:mt-[180px] hover -mb-14">
            Your one-stop solution for all collage-related information.
          </p>
          <h1 className="text-[150px] appear cursor-default max-md:text-[60px] hover:text-[155px] footertext max-md:hover:text-[62px]  transition-all font-bold text-center logo2 max-md:-mb-28 -mb-16">
          College Hub
          </h1>
         

          <video autoPlay muted loop controls={false} className=" z-[30] heroimgshadow hover:scale-[1.02] duration-500 transition-all rounded-2xl border-x  border-[#ffffff29] max-md:w-[85%] max-md:h-[185px] w-[1200px] object-cover object-bottom h-[670px] saturate-150 " src="https://res.cloudinary.com/ddexkiaja/video/upload/v1747245246/video_ceqh98.mp4"></video>

        </div>

        
      </div>

         {/* <div className=" - top-20 -right-40 blur-[50px] h-[500px] w-[500px] opacity-[.8]  rounded-full   fixed"> </div> */}
      <div className="  relative ">
         <div className=" max-md:bottom-32 bottom-20 -left-40 max-md:-left-10 blur-[200px] max-md:blur-[100px] max-md:h-[300px] max-md:w-[300px] h-[500px] w-[500px] opacity-[.8] rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-5   max-md:absolute fixed"></div>
      </div>

      <p className=" text-center -mt-32 max-md:-mt-60 text-zinc-400 text-lg max-md:text-xs">
        A comprehensive college management platform
      </p>

      <div className="min-h-screen mt-10 flex flex-col items-center justify-evenly">
        <h1 className="text-center text-7xl max-md:text-5xl font-extrabold">Why us ? </h1>

        <div className="relative  flex w-[80%] mx-auto flex-col gap-4"> 
          <div className=" absolute rounded-3xl top-0 left-0 w-full h-full bg-[#090a1500] bg-[radial-gradient(circle,_rgba(9,_10,_21,_0)_0%,_#090A15_100%)] "></div>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><FaUniversity />Manage multiple collages </p>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><MdOutlineAdminPanelSettings  className=" text-green-500"/>            Secure & Role-Based Access</p>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><LuDatabase className=" text-yellow-600" />Centralized Data Management</p>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><TbBrandCashapp className=" text-red-500" />Online Fee Payment</p>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><FcSalesPerformance /> Real-time Attendance & Performance Tracking</p>
            <p className="flex items-center justify-center gap-3 text-center border border-[#ffffff0f] buttonbg2  transition-all p-7 rounded-3xl w-full max-md:text-base  text-3xl"><MdManageHistory className=" text-indigo-500" />Examination Management & Finance magement</p>
        </div>

  </div>
        <footer className="w-full relative overflow-hidden ">
        <p className=" absolute font-mono block max-md:left-5 max-md:bottom-5 left-10 bottom-10">copyright @2025</p>
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
