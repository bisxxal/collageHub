 
import prisma from '@/lib/prisma'
import { Sem } from '@prisma/client';
import React from 'react'

async function FeeAdmin() {
    const fee = await prisma.fee.findMany({
        select: {
            amount: true,
            semesterName: true,
            razorpay_payment_id: true,
            razorpay_order_id: true,
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
                <div className=' grid max-md:grid-cols-4 grid-cols-6 mb-3  p-2 font-semibold'>
                    <h3>Student name</h3>
                    <h3>Amount</h3>
                    <h3 >Batch/Semester</h3>
                    <h3 className=' max-md:hidden '>Payment Id</h3>
                    <h3 className=' max-md:hidden '>Order Id</h3>
                    <h3 className=' max-md: ml-8'>Date</h3>
                </div>

                <div>
                    {fee && fee.map((f) => {
                        return (
                            <div key={f.razorpay_order_id} className='  grid  max-md:grid-cols-4 grid-cols-6 inshadow py-2 mb-2 rounded-lg border-2 border-[#ffffff14] max-md:text-sm px-2'>
                                <p className=' capitalize'>{f.student.name} {f.student.surname}</p>
                                <p>₹ {f.amount}</p>
                                <p> {f.student.batch}/{setSEM(f.semesterName)} Sem</p>
                                <p className=' max-md:hidden ' > {f.razorpay_payment_id ? <p>{f.razorpay_payment_id}</p>: '-----------------------' } </p>
                                <p className=' max-md:hidden '>{f.razorpay_order_id ? <p className=' max-md:hidden'>{f.razorpay_order_id}</p> :'-----------------------'} </p>
                                <p>{new Date(f.createdAt).toLocaleString()}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>        
    )
}

export default FeeAdmin;
