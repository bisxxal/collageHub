import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import React from 'react'

async function Navbar() {
  const user = await currentUser(); 
  return (
    <div className='flex items-center bg-[#15141b] justify-between p-4'>
 
      <div className='hidden md:flex items-center gap-2 text-xs inshadow frame rounded-full px-2'>
        <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
      </div>
      <div className='flex items-center gap-6 justify-end w-full'>
      
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