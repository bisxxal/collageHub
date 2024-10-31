
'use client'; 
import { useUser } from "@clerk/nextjs";  
import { Capturepaymet, Createpaymet, getFinById, UPdatePayment, verifyPayment } from "@/actions/payemt.actions";
import { Batch, Sem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FeePage = ({ userId, batch, phone }: { userId: string; batch: Batch; phone?: string | null }) => {
  const { user } = useUser();
  const [paidSemesters, setPaidSemesters] = useState<Sem[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<Sem | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const fees = await getFinById(userId); 
          setPaidSemesters(fees.map((fee) => fee.semesterName));
        } catch (error) {
          console.error('Error fetching student data:', error);
        } 
      }
    };
    fetchUserData();
  }, [userId, user]);

  const handlePayment = async (amount: number) => {
    const data = await Createpaymet({ amount, currency: 'INR' });
    if (data?.id) {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: 'TACT',
        description: 'Semester Fee',
        order_id: data.id,

        handler: async (response: any) => { 

          if (userId && selectedSemester) {
           const razorpay_payment_id =  response.razorpay_payment_id;
           const razorpay_order_id  =   response.razorpay_order_id;
           const razorpay_signature =   response.razorpay_signature;
          const res =  await createFee(userId, selectedSemester ,  razorpay_order_id, razorpay_payment_id, razorpay_signature );
            const updatedFees = await UPdatePayment(userId);

            if (updatedFees) {
              setPaidSemesters(updatedFees.map((fee) => fee.semesterName));
            }
          }
        },
        prefill: {
          name: user?.firstName,
          email: user?.primaryEmailAddress?.emailAddress,
          contact: phone || '9999999999',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } else {
      console.error('Order creation failed');
    }
  };

  const setFeeAmount = (batch: Batch): number => {
    switch (batch) {
      case "BCA": return 100000;
      case "BTECH": return 180000;
      case "MTECH": return 190000;
      case "MCA": return 180000;
      case "BBA": return 90000;
      case "BSC": return 90000; 
      case "MSC": return 170000;
      default: return 0; 
    }
  };  
  
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

  const createFee = async (studentId: string, semesterName: Sem , razorpay_order_id:string, razorpay_payment_id:string, razorpay_signature:string  ) => {
    const amount = setFeeAmount(batch);
    
   const res =  await verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature , studentId , semesterName , amount});

    if(res?.message =="success"){
        router.push("/list/fee?payment=success")
      }
      else{
        router.push("/list/fee?payment=unsuccess")
      }
  };
  
  const getSemestersForBatch = (batch: Batch): Sem[] => {
    if (batch === "BCA" || batch === "BBA" || batch === "BSC") {
      return ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH"];
    }
    if (batch === "MSC" ) {
      return ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH"];
    }
    if (batch === "MTECH" || batch === "MCA") {
      return ["FIRST", "SECOND", "THIRD", "FOURTH"];
    }

    return ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "SIXTH", "SEVENTH", "EIGHTH"];
  };

  const semesters = getSemestersForBatch(batch);

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col p-4 h-full">
        <h1 className="text-4xl text-[#a277ff] font-bold">Fee Payment</h1>
        <select
          className="mt-5 w-fit px-3 py-2 inshadow frame !rounded-xl border-2 border-[#ffffff70] !bg-transparent"
          name="semester"
          id="semester"
          value={selectedSemester || ""}
          onChange={(e) => setSelectedSemester(e.target.value as Sem)}
        >
          {semesters.map((sem) => (
            <option
              key={sem}
              value={sem}
              disabled={paidSemesters.includes(sem)}
              className="bg-[#000000d7] inshadow"
            >
              {setSEM(sem)} Semester
            </option>
          ))}
        </select>
        <button
          className="p-1 mt-5 px-5 bg-blue-500 rounded-lg w-fit disabled:opacity-15 disabled:cursor-not-allowed"
          onClick={() => handlePayment(setFeeAmount(batch))}
          disabled={!selectedSemester || paidSemesters.includes(selectedSemester)}
        >
          Pay ₹{setFeeAmount(batch)}
        </button>
      </div>
    </div>
  );
};

export default FeePage;
