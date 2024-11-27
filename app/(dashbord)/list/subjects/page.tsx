 
import Bar from "@/components/custom/Bar"; 
import FormModal from "@/components/FormModal";
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table"; 
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma, Subject, Teacher } from "@prisma/client"; 
type SubjectList = Subject & { teachers: Teacher[] };
 

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  
  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="rounded-xl hover:bg-[#ffffff21] overflow-hidden hover:overflow-hidden inshadow text-sm"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="subject" type="update" data={item} />
              <FormModal table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
 
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
 

  const query: Prisma.SubjectWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
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
    prisma.subject.findMany({
      where: query,
      include: {
        teachers: true,
      },
      take: 10,
      skip: 10 * (p - 1),
    }),
    prisma.subject.count({ where: query }),
  ]);



  return (
    <div className="bg- p-4 rounded-md flex-1 m-4 mt-0">
     
    <Bar role={role} table="subject" type="create" data="All Subjects" />
      <Table columns={columns} renderRow={renderRow} data={data} />
     
      <Pagination page={p} count={count} />
    </div>
  );
};

export default SubjectListPage;