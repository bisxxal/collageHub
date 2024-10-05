 
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table"; 
import Image from "next/image"; 
import Link from "next/link";
import { GrView } from "react-icons/gr";
import { Class, Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import Bar from "@/components/custom/Bar";
import FormModal from "@/components/FormModal";
type TeacherList = Teacher & {subjects:Subject[]} & {classes:Class[]} 

const TeacherListPage = async({searchParams}:{searchParams:{[key:string]:string|undefined};}) => {
 
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const renderRow = (item: TeacherList) => (
    <tr
      key={item.id}
      className=" rounded-xl hover:bg-[#ffffff21] overflow-hidden hover:overflow-hidden inshadow text-sm "
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/avatar.jpg"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.subjects.map(subj=>subj.name).join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.map(cls=>cls.name).join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td> 
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 text-xl flex items-center justify-center rounded-full bg-blue-500 ">
            <GrView />
            </button>
          </Link>
          {role === "admin" && (
       <> 
            <FormModal table="teacher" type="delete" id={item.id}/>
       </>
          )}
        </div>
      </td>
    </tr>
  );

  
  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    }, 
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];
  
  const {page , ...quaryParmas} = searchParams;

  const p = page ?parseInt(page): 1;

  const quary : Prisma.TeacherWhereInput = {};

  if(quaryParmas){
    for (const [key,value] of Object.entries(quaryParmas)){
      if(value !== undefined){
        switch(key){
          case "classid": 
          quary.lessons ={
            some:{
              classId:parseInt(value)
            }
          }
          break;
          case "search": quary.name = {contains:value , mode:"insensitive"};
          
            break; 


          }
       
        }
    }
  }
  
 const [teachers ,count] = await prisma.$transaction([
  prisma.teacher.findMany({
    where:quary,
    include:{
      subjects:true,
      classes:true
    },
    take:10,
    skip:10*(p-1)     
   }),
   prisma.teacher.count({where:quary})
 ]);

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
    
    <Bar role={role} table="teacher" type="create" /> 

      <Table columns={columns} renderRow={renderRow} data={teachers} />
      
      <Pagination page={p} count={count} />
    </div>
  );
};

export default TeacherListPage;