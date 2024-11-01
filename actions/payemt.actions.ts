'use server';
import prisma from "@/lib/prisma";
import { razorpayInstance } from "@/utils/razorpay";
import { Sem } from "@prisma/client"; 
import Razorpay from "razorpay"; 
import crypto from "crypto"; 


export async function Createpaymet({ amount, currency }:any) { 
    try {
      const options = {
        amount: amount * 100,  
        currency: currency || 'INR',
        receipt: `receipt_order_${new Date().getTime()}`,
      };
  
      const order = await razorpayInstance.orders.create(options);
   
      return JSON.parse(JSON.stringify(order)); 

    } catch (error) { 
      return JSON.parse(JSON.stringify({ error: 'Failed to create order' , status:500 } )); 
    }
  }
 
export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , studentId , semesterName , amount}:any) {

try {
   const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });
  
   const body = razorpay_order_id + "|" + razorpay_payment_id; 
 const expectedSignature = crypto
   .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY!)
   .update(body.toString())
   .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;
 
 if (isAuthentic) {
  await prisma.fee.create({
    data: {
      amount,
      semesterName,
      studentId,
      razorpay_order_id,
      razorpay_payment_id,
    },
  }); 
   
  return JSON.parse(JSON.stringify({ message: 'success' }));   
  
} else {
  return JSON.parse(JSON.stringify({ message: 'unsuccess' }));   
}
} catch (error) { 
}
 
}

export async function Capturepaymet(studentId: string, semesterName: Sem , amount: number) {
  try {
    await prisma.fee.create({
      data: {
        amount,
        semesterName,
        studentId,
      },
    });
  } catch (error) {
    // console.log('Error in capturing payment:', error);
    
  }
}
export async function UPdatePayment(userId: string) {
  try {
    const updatedFees = await prisma.fee.findMany({
      where: { studentId: userId },
    });
    return JSON.parse(JSON.stringify(updatedFees)); 
    // return updatedFees;
  } catch (error) { 
    
  }
}

export async function getFin() {
  try {
    const fees = await prisma.fee.findMany({});
    return JSON.parse(JSON.stringify(fees));

  } catch (error) { 
    return JSON.parse(JSON.stringify([]));

  }
}

export async function getFinById(userId: string) {
  try {
    const fees = await prisma.fee.findMany({
      where: { studentId: userId },
    }); 
    
    return JSON.parse(JSON.stringify(fees));
    // return fees;
  } catch (error) {
    return JSON.parse(JSON.stringify([]));

    // return [];
  }
}

export async function getFince() {
  try {
    const fees = await prisma.fee.findMany({
      include: { 
        student: {
          select: {
            batch: true,
          },
        }
       },
    });
    // return fees;
    return JSON.parse(JSON.stringify(fees));

  } catch (error) { 
    return JSON.parse(JSON.stringify([]));
  }
}