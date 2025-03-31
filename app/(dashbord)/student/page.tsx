import BigCalenderContainer from "@/components/custom/BigCalenderContainer";
import EventCalendar from "@/components/custom/EventCalendar";
import StudentMarks from "@/components/custom/studentMarks";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

 
const StudentPage = async() => {
  const { userId } = auth();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } },
    },
  }); 
  return (
    <div className="p-4 bg-[#161621 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-[#161621] inshadow frame2 p-4 rounded-md ">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalenderContainer type="teacherId" id={userId!} />
          <StudentMarks />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>

    </div>
  );
};

export default StudentPage;