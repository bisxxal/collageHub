 
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server';
import { Sem } from '@prisma/client';
import React from 'react'

async function FeeAdmin() {
    const { sessionClaims } = auth();
    const collage = (sessionClaims?.metadata as { collage?: string })?.collage;
    const fee = await prisma.fee.findMany({
        where:{
            CollageName: collage
        },
        select: {
            id: true,
            amount: true,
            semesterName: true,
            razorpay_payment_id: true,
            createdAt: true,
            student: {
                select: {
                    name: true,
                    surname: true,
                    batch: true
                }
            }
        },
        orderBy:{
            createdAt:'desc'
        }
    });

    const setSEM = (sem: Sem) => {
        switch (sem) {
          case "FIRST": return '1ST';
          case "SECOND": return '2nd';
          case "THIRD": return '3rd';
          case "FOURTH": return '4th';
          case "FIFTH": return '5th';
          case "SIXTH": return '6th'; 
          case "SEVENTH": return '7th';
          default: return '8th'; 
        }
      };   

    return (
        <div className='w-full min-h-screen p-3'>
            <h1 className=' text-2xl font-semibold mb-4'>List of Payment</h1>
            <div className='w-full h-full'>
                <div className=' grid max-md:grid-cols-4 grid-cols-5 mb-3  p-2 font-semibold'>
                    <h3>Student name</h3>
                    <h3>Amount</h3>
                    <h3 >Batch/Semester</h3>
                    <h3 className=' max-md:hidden '>Payment Id</h3>
                    <h3 className=' max-md: ml-8'>Date</h3>
                </div>

                <div>
                    {fee && fee.map((f) => {
                        return (
                            <div key={f.id} className=' h-12 grid tr  max-md:grid-cols-4 grid-cols-5  py-2 mb-2 rounded-xl sidebarbg border border-[#ffffff0b] max-md:text-sm px-2'>
                                <p className=' capitalize'>{f.student.name} {f.student.surname}</p>
                                <p>₹ {f.amount}</p>
                                <p> {f.student.batch}/{setSEM(f.semesterName)} Sem</p>
                                <p className=' max-md:hidden ' > {f.razorpay_payment_id ? <p>{f.razorpay_payment_id}</p>: '-----------------------' } </p>

                                <p>{new Date(f.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                            </div>
                        )
                    })}
                      {fee.length === 0 && <div className='text-center mt-10 text-lg'>No Payment Found</div>}
                </div>
            </div>
        </div>        
    )
}

export default FeeAdmin;
