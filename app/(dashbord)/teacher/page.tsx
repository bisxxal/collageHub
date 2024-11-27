import BigCalenderContainer from "@/components/custom/BigCalenderContainer";
import { auth } from "@clerk/nextjs/server";

const TeacherPage = () => {
  const { userId } = auth();
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-[#161621] inshadow frame p-4 rounded-md ">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalenderContainer type="teacherId" id={userId!} />
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;