 
'use client';
import { formatAmount } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
} from 'recharts';

interface Fee {
  CollageName: string;
  amount: number;
  createdAt: Date;
  id: number;
  semesterName: string;
  student: { batch: string };
  studentId: number;
}

interface Expense {
  name: string;
  amount: number;
  date: Date;
}

interface FeeDataProps {
  fees: Fee[];
  expenses: Expense[];
}

const PieChartComponent = ({ feeData }: { feeData: FeeDataProps }) => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);

  useEffect(() => {
    // Filter fees by selected year
    const filteredFees = feeData.fees.filter(
      (fee) => new Date(fee.createdAt).getFullYear() === selectedYear
    );

    // Filter expenses by selected year
    const filteredExpenses = feeData.expenses.filter(
      (exp) => new Date(exp.date).getFullYear() === selectedYear
    );

    // Group revenue by student batch
    const revData = filteredFees.reduce((acc: any[], curr) => {
      const batch = curr?.student?.batch || 'Unknown';
      const existing = acc.find((item) => item.name === batch);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({ name: batch, amount: curr.amount });
      }
      return acc;
    }, []);
    setRevenueData(revData);

    // Group expenses by name
    const expData = filteredExpenses.reduce((acc: any[], curr) => {
      const name = curr?.name || 'Misc';
      const existing = acc.find((item) => item.name === name);
      if (existing) {
        existing.amount += curr.amount;
      } else {
        acc.push({ name, amount: curr.amount });
      }
      return acc;
    }, []);
    setExpenseData(expData);
  }, [feeData, selectedYear]);


 
  return (
    <div className="!text-xs mx-auto mt-3 w-[100%] h-[450px]">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="pt-2 pl-4 font-semibold text-lg">Revenue vs Expense</h1>
        <select name="year"
          value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} className="bg-transparent border-2 border-[#ffffff27] px-2 py-1 rounded-xl text-lg">
          {[2025, 2024, 2023, 2022, 2021, 2020].map((year) => (
            <option value={year} key={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

    {revenueData.length > 0 ? (
      <ResponsiveContainer  width="100%" height="100%">

        
        <PieChart> 
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E11D47" stopOpacity={1} />
              <stop offset="95%" stopColor="#D44D66" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#23D824" stopOpacity={1} />
              <stop offset="95%" stopColor="#23D824" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Pie
            dataKey="amount"
            nameKey="name"
            data={revenueData}
            fill="#3352CC" 
            innerRadius={97} outerRadius={140} 
            // label={(entry) => `${entry.name} (₹${formatAmount(entry.amount)})`}
            label={(entry) => `${entry.name} (${(entry.percent * 100).toFixed(2)}%)`}   
          />

          <Pie
            dataKey="amount"
            nameKey="name"
            data={expenseData}
            outerRadius={80} 
            fill='#E11D47' 
          />
          
          <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff20', 
                color: 'white', 
                borderRadius: '5px', 
                backdropFilter: 'blur(10px)',
                border: '1px solid transparent',  
              }}
            itemStyle={{
              color: 'white',  
              fontWeight: 'bold',
            }}/>
        </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-400 mt-10">No data found</p>
          )}        
      </div>
  );
};

export default PieChartComponent;
