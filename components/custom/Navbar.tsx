import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

async function Navbar() {
  const user = await currentUser(); 
  return (
    <div className='flex items-center w-full fixed  backdrop-blur-md  top-0 left-0 z-30 bg-[#15141b93] justify-between p-4'>
 
       <Link
          href="/"
          className=" flex text-[#a277ff logo max-md:text-2xl text-3xl items-center justify-center gap-2"
        >
        
          <span className="  font-bold">Collage Hub </span>
        </Link>

        <div className=' flex gap-4 mr-10'>
        <div className="flex flex-col">
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