'use client'
import { fullname } from '@/lib/utils';
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React from 'react'
import { CgWebsite } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { LiaUniversitySolid } from "react-icons/lia";

 function Navbar({setDarkMode , darkMode}: any) {
  const user =  useUser()
  const collage =  user.user?.publicMetadata?.collage as string;
  const role =  user.user?.publicMetadata?.role as string;
  const clg = fullname.find((item) => item.collage === collage);
  const firstName = user.user?.firstName as string;
  const lastName = user.user?.lastName as string;
  const changeMode = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('mode', !darkMode ? 'true' : 'false')
  }
   
  return (
    <div className={` ${darkMode ? ' bg-[#15141b93] ' :' bg-[#ffffff95] '} navbaranimation  flex items-center  w-full fixed  backdrop-blur-md  top-0 left-0 z-30 bg-[#15141b93] justify-between p-4 `}>
 
      { user.isSignedIn ?  <Link href={`/${role}`} className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold">College Hub </span>
        </Link> : <Link href="/" className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold">College Hub </span>
        </Link>}

       
        <div className='max-md:gap-2 flex gap-4 mr-10 max-md:mr-6 '>

        { collage  && <div className={` flex relative group transition-all cursor-pointer  ${darkMode ? ' text-zinc-300 ' :' text-zinc-500 '}  max-md:text-xs  txt-ellipsis items-center gap-3 max-md:gap-1 text-lg mr-10 max-md:mr-3 `}>
                <LiaUniversitySolid className="text-2xl max-md:text-lg  " />
            <p className=' text-base max-md:hidden block truncate  border-b border-[#ffffff22] caption-bottom'> {clg?.fname} </p>
            <p className=' text-sm max-md:block  font-semibold font-mono hidden truncate underline capitalize'> {clg?.collage} </p>

            <div className=' -bottom-20  w-[200px] transition-all  max-md:w-[140px] max-md:text-xs min-h-[50px] z-[1] flex-col gap-3 -left-0 absolute hidden group-hover:flex bg-[#ffffff35]  backdrop-blur-md p-3 px-4 rounded-2xl'>
           { clg?.link && <Link className=' flex items-center gap-2 ' href={clg?.link} ><CgWebsite  className=" text-lg max-md:text-sm " /> Visit site </Link> }
            {clg?.gmap && <Link className=' flex items-center gap-2 ' href={clg.gmap} ><FaLocationArrow  className=" text-lg max-md:text-sm " /> Visit Map </Link>}
          </div>
        </div>}
        <button onClick={changeMode} className="flex items-center text-xl gap-2 px-3 py-2 rounded-full bg-[#ffffff22] hover:bg-[#ffffff33] transition-all duration-200 ease-in-out">
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
        <div className="flex flex-col  w-[70px]  ">
          <span className="text-sm max-md:text-[10px] text-clip leading-3 font-medium">{firstName} <span className=' max-md:text-wrap'>  {lastName}</span></span>
          <span className="text-[12px] max-md:text-[10px] text-gray-500 text-right">
            {role}
          </span>

        </div>
          <UserButton /> 
        </div>
      </div>
     
  )
}

export default Navbar