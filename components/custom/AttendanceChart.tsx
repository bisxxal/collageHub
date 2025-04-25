"use client"; 
import { BarChart, Bar,  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
const AttendanceChart = ({data}:{data:{name:string , present:number  , absent:number}[]}) => {

  return ( 
     <div className=" w-full h-full !bg-[#ffffff20"> 
     
       <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="#ffffff28" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
         
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
              fontWeight: 'semibold',
            }}/>
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#3352CC"
            legendType="circle"
            radius={[10, 10, 10,10]}
            barSize={15}
          />
          <Bar
            dataKey="absent"
            fill="#E11D47"
            legendType="circle"
            radius={[10, 10, 10, 10]}
            barSize={15}
          />
        </BarChart>
      </ResponsiveContainer>
     </div> 
  );
};

export default AttendanceChart;