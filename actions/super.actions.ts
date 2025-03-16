'use server'
import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export const AddAdmin = async ( username:string ,firstName:string , lastName:string, email:string, password:string , collage:string) => {
  try {
        const clerk = clerkClient();  
      const user = await clerk.users.createUser({
        username:  username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        publicMetadata:{role:"admin" ,collage:collage},
      }); 
  
     const res = await prisma.admin.create({
        data: {
         userName: username,
          CollageName:collage
        },
      });
   
      if(user && res){
      return JSON.parse(JSON.stringify({success:true , error:false}));  
    } 
    return JSON.parse(JSON.stringify({success:false , error:true}));  

  } catch (error) { 
    return JSON.parse(JSON.stringify({success: false, error: true, message:error}));  
  }
}
export const AllAdmins = async () => {
  try {
   const admins = await prisma.admin.findMany();
    return JSON.parse(JSON.stringify(admins));    
  } catch (error) { 
    return JSON.parse(JSON.stringify(error));  
  }
}
 
export const DeleteAdmin = async (id:string) => {
  try {
    const admin = await prisma.admin.delete({
      where: {
        id: id,
      },
    });
     return JSON.parse(JSON.stringify({success:true , error:false}));    
  } catch (error) { 
    return JSON.parse(JSON.stringify({success:false , error:true}));  
  }
}
export const UpdateAdmin = async (username:string, collage:string) => {
  try {
    const admin = await prisma.admin.update({
      where: {
       userName: username,
      },
      data: {
        CollageName: collage,
      },
    });
    return JSON.parse(JSON.stringify({success:true , error:false}));    
  } catch (error) { 
    return JSON.parse(JSON.stringify({success:false , error:true}));  
  }
}

export const collageAdmins = async ( ) => {
try {
  const collageData = await prisma.admin.findMany({
    select: {
      CollageName: true,
    },
    distinct: ['CollageName'],
  })
  return JSON.parse(JSON.stringify(collageData));  
} catch (error) {
  
}
}
export const AllStudAdminsAndTeacher = async (collage:string) => {

  try {
    const [studentData, adminData, teacherData] = await prisma.$transaction([
      prisma.student.findMany({
        where: {
          CollageName: collage,
        },
        select:{
          id:true,
          username:true,
          name:true,
          surname:true,
          email:true,
          batch:true,
          gender:true,
        }
      }),
      prisma.admin.findMany({
        where: {
          CollageName: collage,
        },
        select:{
          id:true,
          userName:true,
        }
      }),
      prisma.teacher.findMany({
        where: {
          CollageName: collage,
        },
        select:{
          id:true,
          username:true,
          name:true,
          surname:true,
          email:true,
          gender:true,
        }
      }),
    ])
    return JSON.parse(JSON.stringify({studentData, adminData, teacherData}));
  } catch (error) {
    
  }

}
