import { IoIosMore } from "react-icons/io";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

async function AttendanceServer() {
  const { sessionClaims } = auth();
  const collage = (sessionClaims?.metadata as { collage?: string })?.collage;
  
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  let resData;
  try {
    resData = await prisma.attendance.findMany({
      where: {
        CollageName: collage,
        date: {
          gte: lastMonday,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        date: true,
        present: true,
      },
    });
  } catch (error) {
    return <div>Error loading attendance data</div>;
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
      Sat: { present: 0, absent: 0 },
    };

  resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 6) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-[#090a15] inshadow frame2 rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <IoIosMore className="text-2xl cursor-pointer" />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
}

export default AttendanceServer;
 
// "use client";

// import AttendanceChart from "./AttendanceChart";
// import {   useEffect, useState } from "react";
// import { fetchAttendanceWeekly } from "@/server/server.actions";
// import { formatDate, getMonday, getSaturday } from "@/lib/utils";
 
// type AttendanceData = {
//   date: string;
//   present: boolean;
// };

// type ChartData = {
//   name: string;
//   present: number;
//   absent: number;
// };

// const AttendanceServer = () => {
//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const [weekOffset, setWeekOffset] = useState(0);
//   const [weekRanges, setWeekRanges] = useState<string[]>([]);
//   const [chartData, setChartData] = useState<ChartData[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Generate last 4 week ranges for dropdown
//   useEffect(() => {
//     const ranges: string[] = [];
//     for (let offset = 0; offset >= -3; offset--) {
//       const monday = getMonday(offset);
//       const saturday = getSaturday(monday);
//       ranges.push(`${formatDate(monday)} - ${formatDate(saturday)}`);
//     }
//     setWeekRanges(ranges);
//   }, []);
 
//   // Fetch chart data based on weekOffset
//   useEffect(() => {
//     const monday = getMonday(weekOffset);
//     const saturday = getSaturday(monday);

//     setLoading(true);
     
//     const fetchAttendanceData = async (startDate: Date, endDate: Date) => {
//       const res = await fetchAttendanceWeekly(startDate.toISOString(), endDate.toISOString());
//       return res
//     }

//      fetchAttendanceData(monday, saturday).then((resData: AttendanceData[]) => {
//       const attendanceMap: { [key: string]: { present: number; absent: number } } = {
//         Mon: { present: 0, absent: 0 },
//         Tue: { present: 0, absent: 0 },
//         Wed: { present: 0, absent: 0 },
//         Thu: { present: 0, absent: 0 },
//         Fri: { present: 0, absent: 0 },
//         Sat: { present: 0, absent: 0 },
//       };

//       console.log(resData ,"resData.length")
//       resData.forEach((item) => {
//         const itemDate = new Date(item.date);
//         const day = itemDate.getDay(); 

//         if (day >= 1 && day <= 6) {
//           const dayName = daysOfWeek[day - 1];
//           if (item.present) {
//             attendanceMap[dayName].present += 1;
//           } else {
//             attendanceMap[dayName].absent += 1;
//           }
//         }
//       });

//       const chart = daysOfWeek.map((day) => ({
//         name: day,
//         present: attendanceMap[day].present,
//         absent: attendanceMap[day].absent,
//       }));

//       setChartData(chart);
//       setLoading(false);
//     });
//   }, [weekOffset]);
 

//   return (
//     <div className="bg-[#090a15] inshadow frame2 rounded-lg p-4 h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-lg font-semibold">Attendance</h1>
//         <div className="flex gap-2 items-center">
//           <select
//             className=" bg-transparent border-2 border-[#ffffff27] px-2 py-1 rounded-xl text-lg"
//             value={weekOffset}
//             onChange={(e) => setWeekOffset(Number(e.target.value))}
//           >
//             {weekRanges.map((label, idx) => (
//               <option key={idx} value={-idx}>
//                 {label}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       {loading ? (
//         <p className="text-center text-sm text-gray-300">Loading...</p>
//       ) : (
//         <AttendanceChart data={chartData} />
//       )}
//     </div>
//   );
// };

// export default AttendanceServer;


// "use client";

// import { useEffect, useState, useMemo, useCallback } from "react";
// import AttendanceChart from "./AttendanceChart";
// import { fetchAttendanceWeekly } from "@/server/server.actions";
// import { formatDate, getMonday, getSaturday } from "@/lib/utils";

// type AttendanceData = {
//   date: string;
//   present: boolean;
// };

// type ChartData = {
//   name: string;
//   present: number;
//   absent: number;
// };

// const AttendanceServer = () => {
//   const daysOfWeek = useMemo(() => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], []);

//   const [weekOffset, setWeekOffset] = useState(0);
//   const [weekRanges, setWeekRanges] = useState<string[]>([]);
//   const [chartData, setChartData] = useState<ChartData[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Set up week ranges once
//   useEffect(() => {
//     const ranges = Array.from({ length: 4 }, (_, idx) => {
//       const offset = -idx;
//       const monday = getMonday(offset);
//       const saturday = getSaturday(monday);
//       return `${formatDate(monday)} - ${formatDate(saturday)}`;
//     });

//     setWeekRanges(ranges);
//   }, []);

//   const fetchAttendanceData = useCallback(async (startDate: Date, endDate: Date) => {
//     try {
//       setLoading(true);
//       const resData = await fetchAttendanceWeekly(startDate.toISOString(), endDate.toISOString());

//       console.log(resData, "resData.length");
//       const attendanceMap = daysOfWeek.reduce((acc, day) => {
//         acc[day] = { present: 0, absent: 0 };
//         return acc;
//       }, {} as Record<string, { present: number; absent: number }>);

//       resData.forEach(({ date, present } :{date:string , present:boolean}) => {
//         const day = new Date(date).getDay();
//         if (day >= 1 && day <= 6) {
//           const dayName = daysOfWeek[day - 1];
//           attendanceMap[dayName][present ? "present" : "absent"] += 1;
//         }
//       });

//       const chart = daysOfWeek.map((day) => ({
//         name: day,
//         ...attendanceMap[day],
//       }));

//       setChartData(chart);
//     } catch (error) {
//       console.error("Failed to fetch attendance data:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [daysOfWeek]);

//   useEffect(() => {
//     const monday = getMonday(weekOffset);
//     const saturday = getSaturday(monday);
//     fetchAttendanceData(monday, saturday);
//   }, [weekOffset, fetchAttendanceData]);

//   return (
//     <div className="bg-[#090a15] inshadow frame2 rounded-lg p-4 h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-lg font-semibold">Attendance</h1>
//         <select
//           className="bg-transparent border-2 border-[#ffffff27] px-2 py-1 rounded-xl text-lg"
//           value={weekOffset}
//           onChange={(e) => setWeekOffset(Number(e.target.value))}
//         >
//           {weekRanges.map((label, idx) => (
//             <option key={idx} value={-idx}>
//               {label}
//             </option>
//           ))}
//         </select>
//       </div>
//       {loading ? (
//         <p className="text-center text-sm text-gray-300">Loading...</p>
//       ) : (
//         <AttendanceChart data={chartData} key={weekOffset} />
//       )}
//     </div>
//   );
// };

// export default AttendanceServer;
