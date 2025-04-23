 
'use client';
import { formatAmount } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {ResponsiveContainer,PieChart as RechartsPieChart,Pie,Legend, PieChart, Tooltip,} from 'recharts';
 
interface FeeDataProps {
  CollageName: string;
  amount: number;
  createdAt: Date;
  id: number;
  semesterName: string;
  student: { batch: string };
  studentId: number;
}

const PieChartComponent = ({ feeData }: { feeData: FeeDataProps[] }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (feeData.length > 0) {
      // Filter by year
      const filtered = feeData.filter(
        (fee) => new Date(fee.createdAt).getFullYear() === selectedYear
      );

      // Aggregate amounts by student.batch
      const aggregatedData = filtered.reduce(
        (
          acc: { batch: string; amount: number }[],
          curr: { student?: { batch?: string }; amount: number }
        ) => {
          if (curr.student && curr.student.batch) {
            const batch = curr.student.batch;
            const existingBatch = acc.find((item) => item.batch === batch);

            if (existingBatch) {
              existingBatch.amount += curr.amount;
            } else {
              acc.push({ batch, amount: curr.amount });
            }
          }
          return acc;
        },
        []
      );

      setChartData(aggregatedData);
    }
  }, [feeData, selectedYear]);

  return (
    <div className="!text-xs mx-auto mt-3 w-[90%] h-[400px]">
      <div className="mb-2 flex items-center justify-between">
      <h1 className=' pt-2 pl-4 font-semibold text-lg'>Revenue pie</h1>
        <select
          name="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className=" bg-transparent border-2 border-[#ffffff27] px-2 py-1 rounded-xl text-lg"
        >
          {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

     { chartData.length !== 0 ? <ResponsiveContainer width="100%" height="96%">
        <PieChart>
          <Pie
            dataKey="amount"
              nameKey="batch"
            data={chartData}
            fill="#3352CC"
            label={(entry) => `${entry.batch} (₹ ${formatAmount(entry.amount)})`}
          />
          {/* <Legend /> */}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    : <p className='text-lg text-center text-gray-400 mt-20'>No data found </p>  
    }
    </div>
  );
};

export default PieChartComponent;
