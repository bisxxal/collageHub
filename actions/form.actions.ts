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
  return  examLessons;
}

export const allteachers = async () => {
  try {
    const teacherSubjects = await prisma.subject.findMany({
      select: { id: true, name: true },
    });
    return teacherSubjects;
  } catch (error) {
    
  }
}

export const allStudents = async () => {
  try {
    const studentGrades = await prisma.grade.findMany({
      select: { id: true, level: true },
    });
    const studentClasses = await prisma.class.findMany({
      include: { _count: { select: { students: true } } },
    });
    return JSON.parse(JSON.stringify({ classes: studentClasses, grades: studentGrades }));
  } catch (error) {
    
  }
}
export const allSubjects = async () => {
  try {
    const subjectTeachers = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    });
    return  subjectTeachers;
  } catch (error) {
    
  }
}

export const allClasses = async () => {
  const classGrades = await prisma.grade.findMany({
      select: { id: true, level: true },
    });
    const classTeachers = await prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    }); 
    return JSON.parse(JSON.stringify( { teachers: classTeachers, grades: classGrades }));
}