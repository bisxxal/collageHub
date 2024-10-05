// 'use server'

// import { TeacherSchema } from "@/lib/FormValidation";
// import prisma from "@/lib/prisma";
// import { clerkClient } from "@clerk/nextjs/server";

// export const createTeacher = async (
//     currentState: { success: boolean; error: boolean },
//     data: TeacherSchema
//   ) => {
 
    
//     try { 
//       const clerk = clerkClient();  
       
//       const user = await clerk.users.createUser({
//         username: data.username,
//         password: data.password,
//         firstName: data.name,
//         lastName: data.surname,
//         publicMetadata: { role: "teacher" },  
//       });
   
//       await prisma.teacher.create({
//         data: {
//           id: user.id,  
//           username: data.username,
//           name: data.name,
//           surname: data.surname,
//           email: data.email || null,
//           phone: data.phone || null,
//           img: data.img || null,
//           gender: data.gender,
//           subjects: {
//             connect: data.subjects?.map((subjectId: string) => ({
//               id: parseInt(subjectId),
//             })),
//           },
//         },
//       });
  
//       return { success: true, error: false };
//     } catch (err) {  
//       return { success: false, error: true };
//     }
//   };
  
//   export const updateTeacher = async (
//     currentState: { success: boolean; error: boolean },
//     data: TeacherSchema
//   ) => {
//     if (!data.id) {
//         console.log('error heee');
        
//       return { success: false, error: true };
//     } 
  
//     try {
//       const clerk = clerkClient();
//       const user = await clerk.users.getUser(data.id);
//       if (!user) {
//         console.error("User not found:", data.id);
//         return { success: false, error: false };
//       }
  
//       await clerk.users.updateUser(data.id, {
//         username: data.username,
//         ...(data.password !== "" && { password: data.password }),
//         firstName: data.name,
//         lastName: data.surname,
//       });
  
//       await prisma.teacher.update({
//         where: {
//           id: data.id,
//         },
//         data: {
//           ...(data.password !== "" && { password: data.password }),
//           username: data.username,
//           name: data.name,
//           surname: data.surname,
//           email: data.email || null,
//           phone: data.phone || null,
//           img: data.img || null,
//           gender: data.gender,
//           subjects: {
//             set: data.subjects?.map((subjectId: string) => ({
//               id: parseInt(subjectId),
//             })),
//           },
//         },
//       });
 
//       return { success: true, error: false };
//     } catch (error) {
//       console.error("Error fetching or updating user:", error);
//       return { success: false, error: true };
//     }
//   };