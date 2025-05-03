import { z } from "zod";

export const subjectSchema  =  z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1 ,{message:"subjectname must be 3 characters long!" }),
    teachers:z.array(z.string())
  });
 export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  // gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;


export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters long!" }).max(20, { message: "Username must be at most 20 characters long!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(), 
  img: z.string().optional(), // Added img property
  gender: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.string()).optional(),  
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }).optional().or(z.literal("")),
  phone: z.string().optional(), 
  img: z.string().optional(), 
  gender: z.enum(["MALE", "FEMALE"], { message: "gender is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
  batch: z.enum(["MCA", "BCA" ,"BBA" , 'BTECH' , "MTECH" , "BSC" , "MSC" ],{ message: "Batch is required!" }),
});
 
export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
  
});

export type ExamSchema = z.infer<typeof examSchema>;

export const eventSchema  =  z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1 ,{message:"subjectname must be 3 characters long!" }),
  description: z.string().min(1 ,{message:"description must be 3 characters long!" }),
  class:z.array(z.string()),
  startTime: z.coerce.date({ message: "Start date is required!" }),
  endTime: z.coerce.date({ message: "End date is required!" }),
});
export type EventSchema = z.infer<typeof eventSchema>;

export const assignmentSchema  =  z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1 ,{message:"assignment must be 3 characters long!" }),
  lessonId:z.string({message:"must be required"}),
  startTime: z.coerce.date({ message: "Start date is required!" }),
  endTime: z.coerce.date({ message: "sumbit date is required!" }),
});
export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const resultSchema  =  z.object({
  id: z.coerce.number().optional(),
  score: z.string({message:"assignment must be grater then equal to 0!" }),
  examId:z.string({message:"must be required"}),
  studentId:z.string({message:"must be required"}), 
});
export type ResultSchema = z.infer<typeof resultSchema>;


export const lessonSchema  =  z.object({
  id: z.coerce.number().optional(),
  name: z.string({message:"name must be grater then equal to 0!" }),
  // studentId:z.string({message:"must be required"}),
  startTime: z.coerce.date({ message: "Start date is required!" }), 
  endTime: z.coerce.date({ message: "End date is required!" }), 
  subjectId :z.string({message:"subject must be required"}),
  teacherId:z.string({message:"must be required"}),
  classId:z.string({message:"class must be required"}),
  day : z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", ], { message: "Day is required!" }),
});
export type LessonSchema = z.infer<typeof lessonSchema>;


export const expenseSchema  =  z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1 ,{message:"subjectname must be 3 characters long!" }),
  description: z.string().optional(),
  amount: z.coerce.number().min(1 ,{message:"amount must be grater then equal to 0!" }),
  date: z.coerce.date({ message: " date is required!" }), 
})

export type ExpenseSchema = z.infer<typeof expenseSchema>;
