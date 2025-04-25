'use client'
import Menu from "@/components/custom/Menu";
import Navbar from "@/components/custom/Navbar"; 
import Script from 'next/script';
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    if (mode !== null) {
      setDarkMode(mode === 'true');
    }
  }, []);
 
  return (
    <div className={` ${darkMode  ? ' bg-[#090a15] text-zinc-200' : ' bg-[#ffffff] text-zinc-800' } min-h-screen `}>
  <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className=" relative  w-full ">
      <Menu />
        <Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
        <div className=" max-lg:w-full  mt-[50px] ml-[200px] max-lg:ml-0 ">
        {children}
        </div>
      </div>
    </div>
  );
}