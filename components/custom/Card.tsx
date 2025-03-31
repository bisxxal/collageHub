 import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server';
import React from 'react'

async function Card({ type  , bg , text }: { type: 'admin' | 'student' | 'teacher' , bg?: string , text?: string }) {

   const { sessionClaims } = auth();
      const collage = (sessionClaims?.metadata as { collage?: string })?.collage;
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher,
  }

  const data = await modelMap[type]?.count({
    where: {
      CollageName: collage, 
    }
  })

  return (
    <div className={`min-w-[130px] flex-1 ${text} max-w-full h-56 max-md:wfull max-md:h-52 buttonhover inputbg relative rounded-3xl border-2 border-[#ffffff2c] flex flex-col items-center justify-center "`}>
          <div className={` h-[85%] w-[75%] ${bg } blur-[25px] rounded-full absolute `}></div>

            <div className="flex justify-between items-center absolute left-4 top-4">
     <span className="text-[10px] bg-[#ffffff32] px-2 py-1 rounded-full text-green-600 ">
           2024/25
         </span>
       </div>
           
          <p className=" font-medium">{type}s</p>
          <p className="  text-6xl font-bold">{data}</p>
        </div>
  )
}

export default Card