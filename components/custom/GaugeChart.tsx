// @ts-nocheck
"use client";
import { resultPie } from "@/server/server.actions";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell ,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import GaugeChart from 'react-gauge-chart'

const GaugeChart2 = () => {
  const [cgpa, setCgpa] = useState(0);
  const [score, setScore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await resultPie();
 
      const transformedData2 = res.map((item:{score:string ,exam:any}) => ({
        subject: item.exam?.lesson?.name, 
        A: item.score,      
        fullMark: 100,    
      }));
      setScore(transformedData2);  
  
      const transformedData = res.map((item: { score: string; exam: any }) => ({
        A: Number(item.score),
        fullMark: 100,
      }));

      const totalScore = transformedData.reduce((sum:number, cur:{A:number}) => sum + cur.A, 0);
      const totalFullMark = transformedData.reduce((sum:number, cur:{fullMark:number}) => sum + cur.fullMark, 0);

      const calculatedCgpa = Number(((totalScore / totalFullMark) * 100).toFixed(2));
      setCgpa(calculatedCgpa);
    };

    fetchData();
  }, []);
  
  return (
    <div className=" w-full pb-5 overflow-hidden ">

      <div className=' h-[450px]  '>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={score}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar name="Student" dataKey="A" stroke="#009966" fill="#99FE01" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>     
        </div>

 
      <div>

      <h1 className=" text-center mb-5 font-semibold">Total percentage {cgpa} % </h1>
        <GaugeChart id="gauge-chart2" 
          nrOfLevels={30} 
          percent={cgpa/100} 
          cornerRadius={3} 
          colors={['#5BE12C', '#F5CD19', '#EA4228']}
          arcWidth={0.3}
        />
      </div>
     
    </div>
  );
};

export default GaugeChart2;
 