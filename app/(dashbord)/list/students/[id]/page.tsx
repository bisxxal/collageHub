
import BigCalenderContainer from "@/components/custom/BigCalenderContainer";
import FormModal from "@/components/FormModal";
import Performance from "@/components/custom/Perfomance";
import StudentAttendanceCard from "@/components/custom/StudentsAttendancecardCart";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const SingleStudentPage = async({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className=" inshadow frame max-xl h-[250px] py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image src={student.img || "/avatar.jpg"} alt="" width={144} height={144} className="w-36 h-32 max-md:h-24 max-md:w-24  rounded-full object-cover" />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center max-md:flex-col max-md:items-start gap-4">
                <h1 className="text-xl max:md-text-base font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormModal table="student" type="update" data={student} />
                )}
              </div>
        
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
               
               
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
               
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex  h-[250px] gap-4 justify-between flex-wrap">

            <div className="inshadow frame p-4 rounded-md flex gap-4  w-[45%] ">
            
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
            </div>

            <div className="inshadow frame p-4 rounded-md flex gap-4 w-[45%]">
            
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student.class.name.charAt(0)}th
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="inshadow frame p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student.class._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div> 
            <div className="inshadow frame p-4 rounded-md flex gap-4 w-[45%]">
          
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 inshadow frame rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalenderContainer type="classId" id={student.class.id} />
        </div>
      </div> 
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="inshadow frame p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/lessons?classId=${student.class.id}`} >
              Student&apos;s Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/teachers?classId=${student.class.id}`}>
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?classId=${student.class.id}`}>
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/assignments?classId=${student.class.id}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/results?studentId=${student.id}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance /> 
      </div>
    </div>
  );
};

export default SingleStudentPage;