import { fullname } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'
import { IoSchool } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { FaLocationArrow } from "react-icons/fa";

async function Navbar() {
  const user = await currentUser(); 
  const collage =  user?.publicMetadata?.collage as string;
  const clg = fullname.find((item) => item.collage === collage);
  return (
    <div className='flex items-center  w-full fixed  backdrop-blur-md  top-0 left-0 z-30 bg-[#15141b93] justify-between p-4'>
 
       <Link href="/" className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold">Collage Hub </span>
        </Link>

        <div className='max-md:gap-2 flex gap-4 mr-10 max-md:mr-6 '>

        { collage  && <div className=' flex relative group   max-md:text-xs  txt-ellipsis items-center gap-3 max-md:gap-1 text-lg mr-10 max-md:mr-5'>
                <IoSchool className="text-2xl max-md:text-lg text-zinc-300" />
            <p className=' text-base max-md:hidden block truncate text-zinc-300 border-b border-[#ffffff22] caption-bottom'> {clg?.fname} </p>
            <p className=' text-base max-md:block hidden truncate underline  text-zinc-400 capitalize'> {clg?.collage} </p>

            <div className=' -bottom-20  w-[200px] max-md:w-[140px] max-md:text-xs min-h-[50px] z-[1] flex-col gap-3 -left-0 absolute hidden group-hover:flex bg-[#ffffff35]  backdrop-blur-md p-3 px-4 rounded-md'>
           { clg?.link && <Link className=' flex items-center gap-2 ' href={clg?.link} ><CgWebsite  className=" text-lg max-md:text-sm " /> Visit site </Link> }
            {clg?.gmap && <Link className=' flex items-center gap-2 ' href={clg.gmap} ><FaLocationArrow  className=" text-lg max-md:text-sm " /> Visit Map </Link>}
          </div>
        </div>}

        <div className="flex flex-col  ">
          <span className="text-sm max-md:text-[10px] leading-3 font-medium">{user?.firstName} {user?.lastName}</span>
          <span className="text-[12px] max-md:text-[10px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>

         
        </div>
          <UserButton /> 
        </div>
      </div>
     
  )
}

export default Navbar