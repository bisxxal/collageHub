'use client'
import { resultPie } from '@/actions/server.actions';
import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
 
const StudentMarks = () => {
  const [score, setScore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await resultPie();
      const transformedData = res.map((item:{score:string ,exam:any}) => ({
        subject: item.exam?.lesson?.name, 
        A: item.score,      
        fullMark: 100,    
      }));
      setScore(transformedData);  
    };

    fetchData();
  }, []);

  return (
    <div className='w-full h-[400px] '>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={score}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar name="Student" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>     
    </div>
  );
}

export default StudentMarks;
