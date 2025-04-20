'use client';
import { getFin } from "@/server/payemt.actions";
import { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,} from "recharts";

interface FeeData {
  name: string;
  income: number;
}
 
const FinanceChart = () => {
  const currentYear = new Date().getFullYear();
  const [feeData, setFeeData] = useState<FeeData[]>([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    const fetchFeeData = async () => {
      try {
        const fees = await getFin();
        const formattedData: FeeData[] = Array.from({ length: 12 }, (_, i) => {
          const monthName = new Date(0, i).toLocaleString("default", {
            month: "short",
          });

          console.log('monthName', monthName)
          const monthFees = fees.filter((fee: { createdAt: Date }) =>
            new Date(fee.createdAt).getFullYear() === selectedYear &&
            new Date(fee.createdAt).getMonth() === i
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
  }, [selectedYear ]);

  return (
    <div className="bg-[#080312] inshadow frame2 rounded-xl w-full h-full p-3 max-md:px-1">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold">Finance</h1>
        <select
          name="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        className=" bg-transparent border-2 border-[#ffffff27] px-2 py-1 rounded-xl text-lg">
          {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
 
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={feeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3"  />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;