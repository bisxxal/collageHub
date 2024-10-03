 
import Bar from "@/components/custom/Bar"; 
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table"
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
 
import { GrView } from "react-icons/gr";
import FormModal from "@/components/FormModal";

type StudentList = Student & {class:Class}

 
const StudentListPage =async({searchParams}:{searchParams:{[key:string]:string|undefined};}) => {


  const { sessionClaims } = auth();

  
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
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
    const renderRow = (item: StudentList) => (
      <tr
        key={item.id}
        className="border-b-[2px]  inshadow  rounded-xl border-gray-700 text-sm hover:bg-[#ffffff0b]"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={item.img || "/avatar.png"}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.class.name}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.username}</td>
        <td className="hidden md:table-cell">{item.class.name[0]}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 text-xl flex items-center justify-center rounded-full bg-lamaSky">
              <GrView />
              </button>
            </Link>
            {role === "admin" && (
   
              <FormModal table="student" type="delete" id={item.id}/>
            )}
          </div>
        </td>
      </tr>
    );

  const {page , ...quaryParmas} = searchParams;

  const p = page ?parseInt(page): 1;

  const quary : Prisma.StudentWhereInput = {};
// [[[[[[[[ 1 ]]]]]]]
  if(quaryParmas){
    for (const [key,value] of Object.entries(quaryParmas)){
      if(value !== undefined){
        switch(key){
          case "classid": 
          quary.class ={
            lessons:{
              some:{
              teacherId:value
              }
            }
          }
          break;
          case "search": quary.name = {contains:value , mode:"insensitive"};
          break;
          default:break;        
        }
      }
    }
  }
  
 const [data ,count] = await prisma.$transaction([
  prisma.student.findMany({
    where:quary,
    include:{
      // subjects:true,
      class:true
    },
    take:10,
    skip:10*(p-1)     
   }),
   prisma.student.count({where:quary})
 ]);

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      {/* <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch/>
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
  
            )}
          </div>
        </div>
      </div> */}

      <Bar role={role} table="student" type="create" />
     
      <Table columns={columns} renderRow={renderRow} data={data} />
      
      <Pagination page={p} count={count} />
    </div>
  );
};

export default StudentListPage;