import React from 'react'
import { BiMaleFemale } from "react-icons/bi";
import CountChart from './CountChart';
import prisma from '@/lib/prisma';

async function CountchatServer() {
   const data = await prisma.student.groupBy({
        by: ["gender"],
        _count:true
   })

const  boys = data?.find((item: { gender: string; _count: number }) => item.gender === "MALE")?._count || 0;   
const  girls = data?.find((item: { gender: string; _count: number }) => item.gender === "FEMALE")?._count || 0;   

   
    return (
   <div className="bg-[#090a15]  inshadow frame rounded-xl w-full h-full p-4">
        <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
     <BiMaleFemale className=" text-3xl" />
      </div>

        <CountChart boys={boys} girls={girls} />
 
      <div className="flex justify-center gap-14 px-5">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">     Boys ({Math.round((boys / (boys + girls)) * 100)}%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">     Girls ({Math.round((girls / (boys + girls)) * 100)}%) </h2>
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#ef7cca] rounded-full" />
          <h1 className="font-bold">{girls+boys}</h1>
          <h2 className="text-xs text-gray-300">Total</h2>
        </div>
      </div>


    </div>

    
  )
}

export default CountchatServer