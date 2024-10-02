'use server'

import { ClassSchema, ExamSchema, StudentSchema, SubjectSchema, TeacherSchema } from "@/lib/FormValidation"
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server"; 
type CurrentState = { success: boolean; error: boolean };

export const createSubject = async ( currentState:{success:boolean ; error:boolean} , data:SubjectSchema) => {
  try {
    
    await prisma.subject.create({
        data:{
            name:data.name,
            teachers:{
                connect:data.teachers.map((teacherId) => ({id:teacherId}))            
            }
        }
    })
    return {success:true , error:false}
  } catch (error) {
    console.log("Error while creating subject",error);
    return {success:false , error:true}
  }
}
export const updateSubject = async ( currentState:{success:boolean ; error:boolean} , data:SubjectSchema) => {
    try {
       
        await prisma.subject.update({
            where: {
              id: data.id,
            },
            data: {
              name: data.name,
              teachers: {
                set: data.teachers.map((teacherId) => ({ id: teacherId })),
              },
            },
          });


        return {success:true , error:false}
    } catch (error) {
      console.log("Error while updating subject",error);
      return {success:false , error:true}
    }
  }
export const deleteSubject = async ( currentState:{success:boolean ; error:boolean} , data:FormData) => {
    try {
      const id = data.get("id") as string;
      await prisma.subject.delete({
        where: {
          id: parseInt(id),
        },
      });
    console.log("Subject deleted",id);
    
        return {success:true , error:false}
    } catch (error) {
      console.log("Error while deleteing subject",error);
      return {success:false , error:true}
    }
  }
 
  export const createTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
  ) => {

    console.log(data);
    
    try { 
      const clerk = clerkClient();  
       
      const user = await clerk.users.createUser({
        username: data.username,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        publicMetadata: { role: "teacher" },  
      });
   
      await prisma.teacher.create({
        data: {
          id: user.id,  
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          img: data.img || null,
          gender: data.gender,
          subjects: {
            connect: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });
  
      return { success: true, error: false };
    } catch (err) { 
      console.error("Error creating teacher:", err);
      return { success: false, error: true };
    }
  };
  
  export const updateTeacher = async (
    currentState: CurrentState,
    data: TeacherSchema
  ) => {
    if (!data.id) {
      return { success: false, error: "Invalid user ID" };
    }
    console.log("Updating user with ID:", data.id);
  
    try {
      const clerk = clerkClient();
      const user = await clerk.users.getUser(data.id);
      if (!user) {
        console.error("User not found:", data.id);
        return { success: false, error: "User not found" };
      }
  
      await clerk.users.updateUser(data.id, {
        username: data.username,
        ...(data.password !== "" && { password: data.password }),
        firstName: data.name,
        lastName: data.surname,
      });
  
      await prisma.teacher.update({
        where: {
          id: data.id,
        },
        data: {
          ...(data.password !== "" && { password: data.password }),
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null,
          img: data.img || null,
          gender: data.gender,
          subjects: {
            set: data.subjects?.map((subjectId: string) => ({
              id: parseInt(subjectId),
            })),
          },
        },
      });
      return { success: true, error: false };
    } catch (error) {
      console.error("Error fetching or updating user:", error);
      return { success: false, error: true };
    }
  };
  export const deleteTeacher = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await clerkClient.users.deleteUser(id);
  
      await prisma.teacher.delete({
        where: {
          id: id,
        },
      });
   
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
  ) => {
    console.log(data);
    try { 

      const classItem = await prisma.class.findUnique({
        where: { id: data.classId },
        include: { _count: { select: { students: true } } },
      });
  
      if (classItem && classItem.capacity === classItem._count.students) {
        return { success: false, error: true };
      }
  
      const user = await clerkClient.users.createUser({
        username: data.username,
        password: data.password,
        firstName: data.name,
        lastName: data.surname,
        publicMetadata:{role:"student"}
      });
  
      await prisma.student.create({
        data: {
          id: user.id,
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null, 
          phone: data.phone || null, 
          img: data.img || null, 
          gender: data.gender, 
          gradeId: data.gradeId,
          classId: data.classId, 
        },
      });
   
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema
  ) => {
    if (!data.id) {
      return { success: false, error: true };
    }
    try {
      const clerk = clerkClient();
      const user = await clerk.users.updateUser(data.id, {
        username: data.username,
        ...(data.password !== "" && { password: data.password }),
        firstName: data.name,
        lastName: data.surname,
      });
  
      await prisma.student.update({
        where: {
          id: data.id,
        },
        data: {
          ...(data.password !== "" && { password: data.password }),
          username: data.username,
          name: data.name,
          surname: data.surname,
          email: data.email || null,
          phone: data.phone || null, 
          img: data.img || null, 
          gender: data.gender, 
          gradeId: data.gradeId,
          classId: data.classId, 
        },
      }); 
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const deleteStudent = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
    try {
      await clerkClient.users.deleteUser(id);
  
      await prisma.student.delete({
        where: {
          id: id,
        },
      });
   
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const createExam = async (
    currentState: CurrentState,
    data: ExamSchema
  ) => {
    try {
     const exam = await prisma.exam.create({
        data: {
          title: data.title,
          startTime: data.startTime,
          endTime: data.endTime,
          lessonId: data.lessonId,
        },
      });

      console.log("Exam created" , exam);
      
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const updateExam = async (
    currentState: CurrentState,
    data: ExamSchema
  ) => {
  
    try {
   
      await prisma.exam.update({
        where: {
          id: data.id,
        },
        data: {
          title: data.title,
          startTime: data.startTime,
          endTime: data.endTime,
          lessonId: data.lessonId,
        },
      });
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };
  
  export const deleteExam = async (
    currentState: CurrentState,
    data: FormData
  ) => {
    const id = data.get("id") as string;
   
    try {
      await prisma.exam.delete({
        where: {
          id: parseInt(id),
          // ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {}),
        },
      });
   
      return { success: true, error: false };
    } catch (err) {
      console.log(err);
      return { success: false, error: true };
    }
  };

  
export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.create({
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema
) => {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data,
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/class");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
