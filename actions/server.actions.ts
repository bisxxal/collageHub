'use server'
import { AssignmentSchema, ClassSchema, EventSchema, ExamSchema, ResultSchema, StudentSchema, SubjectSchema, TeacherSchema } from "@/lib/FormValidation"
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
type CurrentState = { success: boolean; error: boolean };

export const createSubject = async ( currentState:CurrentState , data:SubjectSchema) => {
  try {
    
    await prisma.subject.create({
        data:{
            name:data.name,
            teachers:{
                connect:data.teachers.map((teacherId) => ({id:teacherId}))            
            }
        }
    })
    return JSON.parse(JSON.stringify({success:true , error:false}));    
  } catch (error) { 
    
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
}
export const updateSubject = async ( currentState:CurrentState , data:SubjectSchema) => {
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


          return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (error) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
  }
export const deleteSubject = async ( currentState:CurrentState , data:FormData) => {
    try {
      const id = data.get("id") as string;
      await prisma.subject.delete({
        where: {
          id: parseInt(id),
        },
      }); 
    
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (error) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
  } 
 
  export const createTeacher = async (
    currentState: { success: boolean; error: boolean },
    data: TeacherSchema
  ) => {
 
    
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
  
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) {  
      console.log("error", err);
    
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
  };
  
  export const updateTeacher = async (
    currentState: { success: boolean; error: boolean },
    data: TeacherSchema
  ) => {
    if (!data.id) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    } 
  
    try {
      const clerk = clerkClient();
      const user = await clerk.users.getUser(data.id);
      if (!user) { 
        return { success: false, error: false };
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

      
 
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (error) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
   
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
  };
  
  export const createStudent = async (
    currentState: CurrentState,
    data: StudentSchema
  ) => { 
    try { 
      const clerk = clerkClient();  
      const classItem  = await prisma.class.findUnique({
        where: { id: data.classId },
        include: { _count: { select: { students: true } } },
      });
  
      if (classItem && classItem.capacity === classItem._count.students) {
        return JSON.parse(JSON.stringify({success: false, error: true}));  
      }
  
      const user = await clerk.users.createUser({
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
          batch: data.batch  
        },
      });
   
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      // console.log(err);
      
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
  };
  
  export const updateStudent = async (
    currentState: CurrentState,
    data: StudentSchema
  ) => {
    if (!data.id) {
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
      console.log("data", data.img);
      
      
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
   
      return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
      
       return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
       return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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
   
       return JSON.parse(JSON.stringify({success:true , error:false}));   
    } catch (err) { 
      return JSON.parse(JSON.stringify({success: false, error: true}));  
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

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) { 
    return JSON.parse(JSON.stringify({success: false, error: true}));  
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

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    // console.log("error" , err);
    
    return JSON.parse(JSON.stringify({success: false, error: true}));   
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

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) { 
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};


export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
    const event = await prisma.event.create({
      data: {
        title: data.name,  
        startTime: data.startTime,
        endTime: data.endTime,
       
        class: {
          connect: data.class.map((classId: string) => ({ id: parseInt(classId) }))  
        },
        description: data.description,
      },
    });
 

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};
 
export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema
) => {
  try {
     await prisma.event.update({
      where: { id: data.id },  
      data: {
        title: data.name,
        startTime: data.startTime,
        endTime: data.endTime, 
        class: {
          connect: data.class.map((classI: string) => ({ id: parseInt(classI) }))  
        },
        description: data.description,
      },
    }); 

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};
export const deleteEvent = async ( currentState:CurrentState , data:FormData) => {
  try {
    const id = data.get("id") as string;
    await prisma.event.delete({
      where: {
        id: parseInt(id),
      },
    }); 
    return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (error) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
}

export const createAssignment = async (currentState: CurrentState,data: AssignmentSchema) => {
  try {
    const event = await prisma.assignment.create({
      data: {
        title: data.title,  
        startDate: data.startTime,
        dueDate: data.endTime,
        lessonId:  parseInt(data.lessonId) ,
      },
    }); 
     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};

export const updateAssignment = async ( currentState: CurrentState, data: AssignmentSchema) => {
  try {
    if (!data.id) {
      return { success: false, error: true, };
    }

    const event = await prisma.assignment.update({
      where: {
        id: data.id ? data.id : undefined
      },
      data: {
        title: data.title,
        startDate: data.startTime,
        dueDate: data.endTime,
        lessonId: data.lessonId ? parseInt(data.lessonId) : undefined,
      },
    }); 
   
     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};


export const deleteAssingment = async ( currentState: CurrentState, data: AssignmentSchema) => {
  try {
    if (!data.id) {
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
    const id = data.id;
    await prisma.event.delete({
      where: {
        id,
      },
    }); 
    return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (error) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
}



export const createResults = async (currentState: CurrentState, data: ResultSchema) => {
  try {
    if (!data.score || !data.studentId) {
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
    const result = await prisma.result.create({
      data: {
        score: parseInt(data.score), 
        examId: data.studentId ? parseInt(data.studentId) : null, 
        studentId: data.examId,
      },
    });
     return JSON.parse(JSON.stringify({success:true , error:false}));    
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));    
  }
};


export const updateResults = async ( currentState: CurrentState, data: ResultSchema) => {
  try {
    if (!data.id) {
      return { success: false, error: true, };
    }

    const event = await prisma.result.update({
      where: {
        id: data.id ? data.id : undefined
      },
      data: {
        score: parseInt(data.score), 
        examId: data.studentId ? parseInt(data.studentId) : null, 
        studentId: data.examId,
      },
    });   
     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (err) {
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};

export const deleteResults = async (currentState: CurrentState, data: ResultSchema) => {
  try {
    let id;
    if (data instanceof FormData) {
      id = data.get("id");
    }  
    if (!id) {
      return JSON.parse(JSON.stringify({success: false, error: true}));  
    }
    const parsedId = parseInt(id as string, 10);
    if (isNaN(parsedId)) {
      return { success: false, error: true};
    }
    await prisma.result.delete({
      where: {
        id: parsedId,  
      },
    });

     return JSON.parse(JSON.stringify({success:true , error:false}));   
  } catch (error) { 
    return JSON.parse(JSON.stringify({success: false, error: true}));  
  }
};

export async function getStudentsForLesson(lessonId: number) {
   
  try { 
    const students = await prisma.student.findMany({
      where: {
       class:{
        lessons:{
          some:{
            id:lessonId
          }
        }
       }
      },
      select: {
        id: true,
        name: true,
        surname: true,
      },
    }); 
    return JSON.parse(JSON.stringify({ success: true, data: students }));
  } catch (error) {
    console.error("Error fetching students:", error);
    return JSON.parse(JSON.stringify({ success: false, message: "Failed to fetch students" }));
  }
}