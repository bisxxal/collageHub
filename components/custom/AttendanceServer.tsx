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
