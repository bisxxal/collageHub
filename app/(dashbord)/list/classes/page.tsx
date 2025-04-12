 
import Bar from "@/components/custom/Bar";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table"; 
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Prisma, Teacher } from "@prisma/client"; 
type ClassList = Class & { supervisor: Teacher };

const ClassListPage =async ({searchParams,}: {searchParams: { [key: string]: string | undefined };}) => {
  const { sessionClaims } = auth( );
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const collage = (sessionClaims?.metadata as { collage?: string })?.collage;

const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
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

const renderRow = (item: ClassList) => (
  <tr
    key={item.id}
    className="rounded-xl hover:bg-[#ffffff21] overflow-hidden hover:overflow-hidden inshadow text-sm"
  >
    <td className="flex items-center gap-4 p-4">{item?.name}</td>
    <td className="hidden md:table-cell">{item?.capacity}</td>
    <td className="hidden md:table-cell">
      {item?.supervisor?.name + " " + item?.supervisor?.surname}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="class" type="update" data={item} />
            <FormModal table="class" type="delete" id={item?.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1; 
  const query: Prisma.ClassWhereInput = { CollageName:collage};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "supervisorId":
            query.supervisorId = value;
            break;
          case "search":
            query.name = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.class.findMany({
      where: query,
      include: {
        supervisor: true,
      },
      take: 10,
      skip: 10 * (p - 1),
    }),
    prisma.class.count({ where: query }),
  ]);

  return (
    <div className=" p-4 rounded-2xl flex-1 m-4 mt-0">
      
         <Bar role={role} table="class" type="create" data="All Classes" />
        <Table columns={columns} renderRow={renderRow} data={data} /> 
        {data.length === 0 && <div className='text-center mt-10 text-lg '>No Classes Found</div>}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ClassListPage;