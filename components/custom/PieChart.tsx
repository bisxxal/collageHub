 
'use client'; 
import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Legend } from 'recharts';

const formatAmount = (amount:number) => {
    if (amount >= 1000000) {
        return `${(amount / 1000000)}M`;  
    } else if (amount >= 1000) {
        return `${(amount / 1000)}k`; 
    }
    return amount.toString();  
};
 

const PieChartComponent = ({feeData}:any) => { 
    const [chartData, setChartData] = useState<any[]>([]); 
    useEffect(() => {
        if (feeData.length > 0) {
            const aggregatedData = feeData.reduce((acc: { batch: string; amount: number }[], curr: { student?: { batch?: string }; amount: number }) => {
                   
                if (curr.student && curr.student.batch) {
                    const batch = curr.student.batch;  
                    const existingBatch = acc.find((item: { batch: string; amount: number }) => item.batch === batch);
    
                 
                    if (existingBatch) {
                        existingBatch.amount += curr.amount;  
                    } else {
                        acc.push({ batch, amount: curr.amount });
                    }
                }  
                return acc;
            }, []);
            setChartData(aggregatedData);
        }
    }, [feeData]);
 
    
    return (
        <>
        <div className=' !text-xs mx-auto mt-3 w-[90%] h-[400px]' > 
            <ResponsiveContainer>
                <RechartsPieChart> 
                     <Pie 
                        dataKey="amount" 
                        data={chartData} 
                        fill="#a277ff" 
                        label={(entry) => `${entry.batch}(₹ ${formatAmount(entry.amount)})`}  
                        />
                </RechartsPieChart>
            </ResponsiveContainer>
        </div>
        </>
    );
};

export default PieChartComponent;
