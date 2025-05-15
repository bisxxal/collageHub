"use client";
import { resultPie } from "@/server/server.actions";
import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { LuLoader } from "react-icons/lu";
import Skeleton from "../Skeleton";

const Performance = ({id}:{id:string}) => {
  const [cgpa, setCgpa] = useState(0);
  const [score, setScore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await resultPie(id);
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
      setLoading(false);
    };

    if(id){
      fetchData();
    }
  }, [id]);
 

   if(loading){
    return <Skeleton boxes={1} width="h-[450px] w-full" />
   }
 
  return (
  <div className=" w-full pb-5 frame2 rounded-2xl overflow-hidden">
    {/* {loading &&   <div className=' text-center  h-[450px] mt-10 w-full flex items-center justify-center text-xl  text-gray-500' > <LuLoader className=" animate-spin" size={24}/></div>} */}
   {  score.length !== 0  && !loading && <>
      <div className=' h-[450px] w-full '>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={score}>
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
                }}/>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis    />
              <Radar name="Score" dataKey="A" stroke="#E11D47" fill="#E11D47" fillOpacity={0.6}/>
            </RadarChart>
          </ResponsiveContainer>     
        </div>
    
    <div>
      <h1 className=" text-center mb-5 font-semibold">Total percentage {cgpa} % </h1>
        <GaugeChart id="gauge-chart3" 
          nrOfLevels={30} 
          percent={cgpa/100} 
          cornerRadius={3} 
          colors={['#5BE12C', '#F5CD19', '#E11D47']}
          arcWidth={0.3}
          />
      </div>
          </>
          }

          {
          score.length === 0  && !loading && <div className="flex justify-center items-center h-[450px] w-full"> 
          <h1 className=" text-center mb-5 font-semibold">No result  available</h1>
          </div>
          }

    </div>
  );
};

export default Performance;