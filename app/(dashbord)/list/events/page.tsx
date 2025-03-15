  
import FormModal from "@/components/FormModal";
import Bar from "@/components/custom/Bar";
import Pagination  from "@/components/custom/Pagination";
import Table from "@/components/custom/Table";
import prisma from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import { Event, Prisma } from "@prisma/client";
type EventList = Event & { class: {name:string}[] };

const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  const collage = (sessionClaims?.metadata as { collage?: string })?.collage;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "StartDate",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "EndDate",
      accessor: "date",
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

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="rounded-xl hover:bg-[#ffffff21] overflow-hidden hover:overflow-hidden inshadow text-sm "
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
    
      <td className=" ">{item.class.map((item) => item.name).join(', ') || "-"}</td>

 
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-IN").format(item.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-IN").format(item.endTime)}
      </td>
    
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;
  
  const query: Prisma.EventWhereInput = {CollageName:collage};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
 
  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: {
          select: { name: true },
        
        },
        
      },
      take: 10,
      skip: 10 * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);
 
  
  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
   
      <Bar role={role} table="event" type="create" data="" /> 
      <Table columns={columns} renderRow={renderRow} data={data} /> 
      {data.length === 0 && <div className='text-center mt-10 text-lg '>No Event Found</div>}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventListPage;