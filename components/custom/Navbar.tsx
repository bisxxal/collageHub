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
    <div className='flex items-center w-full fixed  backdrop-blur-md  top-0 left-0 z-30 bg-[#15141b93] justify-between p-4'>
 
       <Link href="/" className=" flex   logo max-md:text-2xl text-3xl items-center justify-center gap-2">
          <span className="  font-bold">Collage Hub </span>
        </Link>

        <div className=' flex gap-4 mr-10'>

        { collage  && <div className=' flex relative group items-center gap-3 text-lg mr-10'>
                <IoSchool size={23}/>
            <p> {clg?.fname} </p>

            <div className=' -bottom-20  w-[200px] min-h-[50px] z-[10] flex-col gap-3 -left-0 absolute hidden group-hover:flex bg-[#ffffff27]  backdrop-blur-md p-3 px-4 rounded-md'>
           { clg?.link && <Link className=' flex items-center gap-2 ' href={clg?.link} ><CgWebsite size={21}/> Visit site </Link> }
            {clg?.gmap && <Link className=' flex items-center gap-2 ' href={clg.gmap} ><FaLocationArrow size={21}/> Visit Map </Link>}
          </div>
        </div>}

        <div className="flex flex-col  ">
          <span className="text-sm leading-3 font-medium">{user?.firstName} {user?.lastName}</span>
          <span className="text-[12px] text-gray-500 text-right">
            {user?.publicMetadata?.role as string}
          </span>

         
        </div>
          <UserButton /> 
        </div>


      </div>
     
  )
}

export default Navbar