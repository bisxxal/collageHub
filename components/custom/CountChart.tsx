"use client"; 
import { BiMaleFemale } from "react-icons/bi";
import {
  RadialBarChart,
  RadialBar, 
  ResponsiveContainer,
} from "recharts";
  

const CountChart = ({boys , girls}:{boys:number , girls:number}) => {

  const data = [
    {
      name: "Total",
      count: boys+girls,
      fill: "#ef7cca",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#C3EBFA",
    },
  ];
  return (
    <div className="relative w-full h-[75%]">
      <div  className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BiMaleFemale />
        </div>
     
      
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
       
        {/* <div  className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BiMaleFemale />
        </div>
      </div> */}
      {/* BOTTOM */}
      {/* <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">1,234</h1>
          <h2 className="text-xs text-gray-300">Girls (45%)</h2>
        </div>
      </div> */}
    </div>
  );
};

export default CountChart;