'use client'
import { sendEmailNode } from '@/lib/email';
import React from 'react'

const Test = () => {

    const func = async() => {
        await sendEmailNode({email:'bishalkandi859494@gmail.com' ,message:` Fee for ${'1 st sem'} sem has been paid Payment Id : ${'res.res.razorpay_payment_id'}  ` , subject:'Fee Payment Successfull'});  
    }
  return (
    <div className=' bg-red-500'>
        <button className=' buttonbg' onClick={func}>
            click
        </button>
    </div>
  )
}

export default Test