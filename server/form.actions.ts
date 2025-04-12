'use server'

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const allLessons = async () => {
    const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  const examLessons = await prisma.lesson.findMany({
    where: {
      ...(role === "teacher" ? { teacherId: currentUserId! } : {}),
    },
    select: { id: true, name: true },
  });
  return JSON.parse(JSON.stringify( examLessons));    
}

export const allteachers = async () => {
  try {
    const teacherSubjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });
    return JSON.parse(JSON.stringify(teacherSubjects ));    
 
  } catch (error) {
    
  }
}

export const allStudents = async () => {
  try {
    // const studentGrades = await prisma.grade.findMany({
    //   select: { id: true, level: true },
    // });
    const studentClasses = await prisma.class.findMany({
      include: { _count: { select: { students: true } } },
    });
    return JSON.parse(JSON.stringify({ classes: studentClasses,   }));
  } catch (error) {
    
  }
}
export const allSubjects = async () => {
  try {
    const subjectTeachers = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    });
    return JSON.parse(JSON.stringify(subjectTeachers ));    
 
  } catch (error) {
    
  }
}

export const allClasses = async () => {
  // const classGrades = await prisma.grade.findMany({
  //     select: { id: true, level: true },
  //   });
    const classTeachers = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    }); 
    return JSON.parse(JSON.stringify( { teachers: classTeachers,  }));
}

export const allevent = async ()=>{
  try {
    const events = await prisma.class.findMany({
      select: { id: true, name: true },
    }) 
    return JSON.parse(JSON.stringify(events));    
    
  } catch (error) {  
  }
}
export const allassignment = async ()=>{
  try {
    const events = await prisma.lesson.findMany({
      select: { id: true, name: true },
    }) 

    return JSON.parse(JSON.stringify(events));    
  } catch (error) {  
  }
}
export const allResults = async () => {

  try {
    const classGrades = await prisma.exam.findMany({
        select: { id: true, title: true },
      });
      const classTeachers = await prisma.student.findMany({
        select: { id: true, name: true, surname: true },
      }); 
      return JSON.parse(JSON.stringify( { teachers: classTeachers, exam: classGrades }));
  } catch (error) {
    
  }
}
 

export const updateAttendance = async (attendanceData: {
  studentId: string;
  lessonId: number;
  date: Date;
  present: boolean;
  collage: string;

}) => {
  try {
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        studentId: attendanceData.studentId,
        lessonId: attendanceData.lessonId,
        date: attendanceData.date,
        CollageName: attendanceData.collage,
      },
    });

    if (existingAttendance) { 
      const res  = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: { present: attendanceData.present , CollageName: attendanceData.collage },
      });
    } else { 
      await prisma.attendance.create({
        data: {
          studentId: attendanceData.studentId,
          lessonId: attendanceData.lessonId,
          date: attendanceData.date,
          present: attendanceData.present,
          CollageName: attendanceData.collage 
        },
      });
    }

    return JSON.parse(JSON.stringify({ success: true }));
    // return { success: true };
  } catch (error) { 
    
  }
};

export const allStudentsAttendence = async (role : 'admin'| 'teacher' , id:string) => {

  try {
   
    if(role === "admin"){
      const [students, lesssons] = await Promise.all([
        prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
        prisma.lesson.findMany({
          select: { id: true, name: true },
        }),
      ]);
      return JSON.parse(JSON.stringify({students , lesssons}));
    }

    if(role === "teacher"){
      const [students, lesssons] = await Promise.all([
        prisma.student.findMany({ 
          select: { id: true, name: true, surname: true },
        }),
        prisma.teacher.findMany({
          where: {
            id:id,
          },
          select:{
            lessons: {
              select: { id: true, name: true },
            },
          }
        }),
      ]);

      return JSON.parse(JSON.stringify({students , lesssons :lesssons[0].lessons}));
    }
  } catch (error) {
  }
} 
 
 
export const getAttendanceForLesson = async (lessonId: number, year: number, month: number) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);  

  try {
    const attendanceData = await prisma.attendance.findMany({
      where: {
        lessonId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return JSON.parse(JSON.stringify({success: true, data: attendanceData}));

  } catch (error) { 
    return JSON.parse(JSON.stringify({ success: false }));
    // return { success: false  };
  }
};


interface AttendancePayload {
  studentId: string;
  lessonId: number;
  date: Date;
  present: boolean;
  collage: string;
}

export const updateAllAttendance = async (data: AttendancePayload[]) => {
  try {
    const writePromises = data.map(async (record) => {
      return prisma.attendance.upsert({
        where: {
          studentId_lessonId_date: {
            studentId: record.studentId,
            lessonId: record.lessonId,
            date: new Date(record.date.toDateString()), // remove time
          },
        },
        update: {
          present: record.present,
        },
        create: {
          studentId: record.studentId,
          lessonId: record.lessonId,
          date: new Date(record.date.toDateString()),
          present: record.present,
          // collage: record.collage,
        },
      });
    });

    await Promise.all(writePromises);

    return { success: true };
  } catch (error) {
    console.error("Failed to update attendance:", error);
    return { success: false, message: "Failed to update attendance." };
  }
};
