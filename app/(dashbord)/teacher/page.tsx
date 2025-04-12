import BigCalenderContainer from "@/components/custom/BigCalenderContainer";
import EventCalendar from "@/components/custom/EventCalendar";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = () => {
  const { userId } = auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-[#161621] inshadow frame p-4 rounded-2xl ">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalenderContainer type="teacherId" id={userId!} />
        </div>
       
      </div> <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
      </div>
    </div>
  );
};

export default TeacherPage;