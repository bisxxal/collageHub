 
// @ts-nocheck
"use client";
import { resultPie } from "@/server/server.actions";
import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { PieChart, Pie, Cell ,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
 
 
const Performance = ({id}:{id:string}) => {
  const [cgpa, setCgpa] = useState(0);
  const [score, setScore] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const res = await resultPie(id);
 
      const transformedData2 = res.map((item:{score:string ,exam:any}) => ({
        subject: item.exam?.lesson?.name, 
        A: item.score,      
        fullMark: 100,  
        B: item.assignment,  
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

    if(id){
      fetchData();
    }
  }, [id]);
 
const colorData = [
    { value: 1, color: "#ff0000" },
    { value: 1, color: "#ff4d00" },
    { value: 1, color: "#ff9900" },
    { value: 1, color: "#ffcc00" },
    { value: 1, color: "#ffee00" },
    { value: 1, color: "#ccff00" },
    { value: 1, color: "#99ff00" },
    { value: 1, color: "#33cc33" },
    { value: 1, color: "#009966" },
    { value: 1, color: "#0066cc" },
  ];
   
  
  return (
    <div className=" w-full pb-5 frame2 rounded-2xl overflow-hidden">

      <div className=' h-[450px] w-full '>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={score}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30}  />
              <Radar name="Student" dataKey="A" stroke="#009966" fill="#99FE01" fillOpacity={0.6} />
              <Radar name="assignment" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>     
        </div>
    
    <div>
      <h1 className=" text-center mb-5 font-semibold">Total percentage {cgpa} % </h1>
        <GaugeChart id="gauge-chart3" 
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

export default Performance;