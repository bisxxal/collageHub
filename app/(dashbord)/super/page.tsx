import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import React from 'react'

const SupperAdmin = async() => {
    const collages = await prisma.admin.findMany({
    select: {
      CollageName: true,
    },
    distinct: ['CollageName'],
    })
  return (
    <div className=' w-full min-h-screen p-6 '>
       <div className="flex gap-4 max-md:gap-2 mt-2 justify-between flex-wrap">
          <SuperCard type="admin"  text='text-[#fcf2626]' bg='bg-[#ff00003e]' />
          <SuperCard type="student" text='text-[#f3fd29]' bg='bg-[#fff2003e]'/>
          <SuperCard type="teacher" text='text-[#26fc26]' bg='bg-[#0dff003e]' />
        </div>
        <div className="  max-md:w-[95%]  w-1/2 mt-10 text-xl h-[500px] mx-auto textbase  buttonhover inputbg relative rounded-3xl border-2 border-[#005eff] flex flex-col items-center justify-center ">
          <p className=" font-medium">Total Collages</p>
          <p className="  text-6xl font-bold">   {collages.length }</p>
 
        </div>
    </div>
  )
}

async function SuperCard({ type  , bg , text }: { type: 'admin' | 'student' | 'teacher' , bg?: string , text?: string }) {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
  }
  const data = await modelMap[type].count({})
  return (
    
    <div className={`min-w-[130px]  flex-1 ${text} h-44 buttonhover inputbg relative rounded-3xl border-2 border-[#ffffff2c] flex flex-col items-center justify-center "`}>
          <div className={` h-[70%] w-[60%] ${bg } blur-[25px] rounded-full absolute `}></div>

            <div className="flex justify-between items-center absolute left-4 top-4">
     <span className="text-[10px] bg-[#ffffff32] px-2 py-1 rounded-full text-green-600 ">
           2024/25
         </span>
       </div>
           
          <p className=" capitalize font-medium">Total {type}s</p>
          <p className="  text-6xl font-bold"> {type === 'admin' ?  <Link  href={'/super/admins'}> {data} </Link> : data }</p>
        </div>
  )
}

export default SupperAdmin