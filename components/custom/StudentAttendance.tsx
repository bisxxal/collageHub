import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

async function AttendanceServer() {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);  

  let resData;

  const user = await currentUser();

  if (!user) {
    return <div>Error: User not found</div>;
  }

  const student = await prisma.student.findUnique({
    where: { username: user.username! },
    select: { id: true },
  });

  if (student) {
    try {
      resData = await prisma.attendance.findMany({
        where: {
          studentId: student.id,
          date: {
            gte: startOfYear,
          },
        },
        select: {
          date: true,
          present: true,
        },
      });
 
    } catch (error) { 
      return <div>Error loading attendance data</div>;
    }
  }

  const attendanceMap: { [key: string]: { present: number; absent: number } } = {
    Jan: { present: 0, absent: 0 },
    Feb: { present: 0, absent: 0 },
    Mar: { present: 0, absent: 0 },
    Apr: { present: 0, absent: 0 },
    May: { present: 0, absent: 0 },
    Jun: { present: 0, absent: 0 },
    Jul: { present: 0, absent: 0 },
    Aug: { present: 0, absent: 0 },
    Sep: { present: 0, absent: 0 },
    Oct: { present: 0, absent: 0 },
    Nov: { present: 0, absent: 0 },
    Dec: { present: 0, absent: 0 },
  };

  resData && resData.forEach((item) => {
    const itemDate = new Date(item.date);
    const monthName = itemDate.toLocaleString('default', { month: 'short' }); // Change to short month format

     if (attendanceMap[monthName]) {
      if (item.present) {
        attendanceMap[monthName].present += 1;
      } else {
        attendanceMap[monthName].absent += 1;
      }
    }
  });

  const data = Object.keys(attendanceMap).map((month) => ({
    name: month,
    present: attendanceMap[month].present,
    absent: attendanceMap[month].absent,
  }));
 
  return (
    <>
      <h1 className='w-[90%] mx-auto font-semibold text-xl max-md:text-base '>Attendance from january - December 2024</h1>
    <div className="bg-[#090a15] inshadow frame2 mt-12 m-auto rounded-lg p-4  w-[90%] max-md:h-[50%] h-[70%]">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
      </div>
      <AttendanceChart data={data} />
    </div>
    </>
  );
}

export default AttendanceServer;
 