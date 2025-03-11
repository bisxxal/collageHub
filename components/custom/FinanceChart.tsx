 
'use client';

import { getFin } from "@/actions/payemt.actions"; 
import { useEffect, useState } from "react"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts"; 

interface FeeData {
  name: string;  
  income: number; 
  
}

const FinanceChart = () => {
  const [feeData, setFeeData] = useState<FeeData[]>([]);

  useEffect(() => { 
    const fetchFeeData = async () => {
      try {
        const fees = await getFin();
 
        const formattedData: FeeData[] = Array.from({ length: 12 }, (_, i) => {
          const monthName = new Date(0, i).toLocaleString("default", {
            month: "short",
          });

          const monthFees = fees.filter(
            (fee:any) => new Date(fee.createdAt).getMonth() === i
          );

          const totalIncome = monthFees.reduce(
            (acc: number, curr: { amount: number }) => acc + curr.amount,
            0
          );

          return {
            name: monthName,
            income: totalIncome, 
          };
        });

        setFeeData(formattedData);
      } catch (error) { 
      }
    };

    fetchFeeData();
  }, []);

  
  return (
    <div className="bg-[#080312]  inshadow frame rounded-xl w-full h-full p-3 max-md:px-1">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={feeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
        
          <Line type="monotone" dataKey="income" stroke="#3352cc" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;
