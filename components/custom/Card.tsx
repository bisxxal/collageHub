import prisma from '@/lib/prisma'
import React from 'react'

async function Card({type}:{type:'admin'|'student'|'teacher'}) {
  
  const modelMap : Record<typeof type , any>= {
    admin: prisma.admin,
    student: prisma.student,
    teacher: prisma.teacher
  }
  const data = await modelMap[type].count()
 
  return (
    <div className="rounded-2xl  inshadow frame2  p-4 flex-1 min-w-[130px]">
    <div className="flex justify-between items-center">
      <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
        2024/25
      </span> 
    </div>
    <h1 className="text-2xl font-semibold my-4">{data}</h1>
    <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
  </div>
  )
}

export default Card