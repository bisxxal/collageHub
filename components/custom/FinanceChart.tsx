'use client';
import { getFin } from "@/server/payemt.actions";
import { useEffect, useState } from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend,} from "recharts";

interface FeeData {
  name: string;
  income: number;
  expense: number;
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

          const monthFees = fees.fee.filter((fee: { createdAt: Date }) =>
            new Date(fee.createdAt).getFullYear() === selectedYear &&
            new Date(fee.createdAt).getMonth() === i
          );
          const monthExpenses = fees.expense.filter((fee: { createdAt: Date }) =>
            new Date(fee.createdAt).getFullYear() === selectedYear &&
            new Date(fee.createdAt).getMonth() === i
          );

          const totalExpense = monthExpenses.reduce(
            (acc: number, curr: { amount: number }) => acc + curr.amount,
            0
          );

          const totalIncome = monthFees.reduce(
            (acc: number, curr: { amount: number }) => acc + curr.amount,
            0   
          );
          return {
            name: monthName,
            income: totalIncome,
            expense: totalExpense,
          };
        });
        setFeeData(formattedData);
      } catch (error) {
      }
    };
    fetchFeeData();
  }, [selectedYear ]);

  console.log(feeData);

  return (
    <div className="bg-[#080312]   frame2 rounded-xl w-full h-full p-3 max-md:px-1 pb-6">
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
 
        <ResponsiveContainer width="100%" height="96%">
        <AreaChart
          data={feeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E11D47" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#D44D66" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#23D824" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#23D824" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name"  stroke="#ffffff28"/>
          <YAxis  />
          <Legend align="center"verticalAlign="top"wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}/>
          <CartesianGrid strokeDasharray="1 1"   stroke="#ffffff28"/>
          <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff20', 
                color: 'white', 
                borderRadius: '5px', 
                backdropFilter: 'blur(10px)',
                border: '1px solid transparent',  
              }}
            itemStyle={{
              color: '#E11D47',  
              fontWeight: 'bold',
              fontSize: '15px',
            }}  />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#23D824"
fillOpacity={0.2}
fill="url(#colorPv)"
             stackId="2"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#E11D47"
            fillOpacity={0.5}
            fill="url(#colorUv)"
            stackId="1"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;

// stroke="#23D824"
// fillOpacity={0.1}
// fill="#23D824"