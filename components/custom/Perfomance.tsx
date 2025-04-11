 
// @ts-nocheck
"use client";
import { resultPie } from "@/server/server.actions";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell ,Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
 

const data1 =[
  { subject: "Math", A: 90, fullMark: 100 },
  { subject: "Dsa", A: 88, fullMark: 100 },
   { subject: "English", A: 85, fullMark: 100 },
]

const data = [
  {
    subject: 'Math',
    A: 90,
    B: 100,
    fullMark: 100,
  },
  {
    subject: 'Chinese',
    A: 80,
    B: 100,
    fullMark: 100,
  },
  {
    subject: 'English',
    A: 90,
    B: 100,
    fullMark: 100,
  },
  
];
const Performance = ({id}:{id:string}) => {
  const [cgpa, setCgpa] = useState(0);
  const width = 500;
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

      const calculatedCgpa = Number(((totalScore / totalFullMark) * 10).toFixed(2));
      setCgpa(calculatedCgpa);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const segments = 10;
 
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
  

  const activeSectorIndex = Math.min(Math.floor(cgpa), segments - 1);

  const pieProps = {
    startAngle: 180,
    endAngle: 0,
    cx: width / 2,
    cy: width / 2,
  };

  const pieRadius = {
    innerRadius: "80%",
    outerRadius: (width / 2) * 0.4,
  };
 
  
  const Arrow: React.FC<PieSectorDataItem> = ({ cx, cy, midAngle, outerRadius }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle!);
    const cos = Math.cos(-RADIAN * midAngle!);
    const mx = cx! + (outerRadius! + width * 0.03) * cos;
    const my = cy! + (outerRadius! + width * 0.03) * sin;

    return (
      <g>
        <g className=" !text-white mt-10" transform={`translate(255, 255) rotate(${360 - midAngle!})`}>
          <path
            d="M5.60469 9.37139C2.82684 9.54267 0.429368 7.66264 0.276978 5.19354C0.124588 2.72445 2.27269 0.564139 5.05054 0.392861L63.1551 1.279L5.60469 9.37139Z"
            fill="#ffffff"
          />
        </g>
        <text x={cx} y={cy! + 10} textAnchor="middle" dominantBaseline="middle"  fill="#ffffff"  fontSize={10}>
          CGPA: {cgpa}
        </text>
        <p> CGPA: {cgpa}</p>
      </g>
    );
  };

  const arrowData = [
    { value: cgpa },
    { value: 0 },
    { value: 11 - cgpa }
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
    <PieChart width={500} height={300} >
      <text x={500 - 150} y={265}fill="#ffffff"textAnchor="middle" dominantBaseline="middle">
        10
      </text>
      <text x={150} y={265} fill="#ffffff" textAnchor="middle" dominantBaseline="middle">
        0
      </text>

      {/* Main Colored Segments */}
      
      <Pie
        activeIndex={activeSectorIndex}
        innerRadius="55%"
        data={colorData}
        dataKey="value"
        blendStroke
        fill="#8884d8"
        {...pieProps}
      >
        {colorData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>

      {/* Arrow */}
     {  <Pie
        stroke="none"
        activeIndex={1}
        activeShape={Arrow}
        data={arrowData}
        outerRadius={pieRadius.innerRadius}
        fill="none"
        {...pieProps}
      />}
    </PieChart>


     
    </div>
  );
};

export default Performance;