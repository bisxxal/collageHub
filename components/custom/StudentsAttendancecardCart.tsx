import prisma from "@/lib/prisma";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const startOfYear = new Date();
  startOfYear.setMonth(0); 
  startOfYear.setDate(1);
  startOfYear.setHours(0, 0, 0, 0);

  const attendance = await prisma.attendance.findMany({
    where: {
      studentId: id,
      date: {
        gte: startOfYear,
      },
    },
  });

  const totalDays = attendance.length;
  const presentDays = attendance.filter((day) => day.present === true).length;
  const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

  return (
    <div>
      <h1 className="text-xl font-semibold">{percentage.toFixed(2)}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
