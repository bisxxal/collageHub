import Bar from "@/components/custom/Bar"; 
import FormServer from "@/components/FormServer";
import Pagination from "@/components/custom/Pagination";
import Table from "@/components/custom/Table";
import TableSearch from "@/components/custom/TableSearch";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";

type ExamList = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
  title?: string;
};

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const currentUserId = userId;


const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  ...(role === "admin" || role === "teacher"
    ? [
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : []),
];

const renderRow = (item: ExamList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200  "
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">
      {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
    </td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormServer table="exam" type="update" data={item} />
            <FormServer table="exam" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.ExamWhereInput = {};

  query.lesson = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.lesson.teacherId = currentUserId!;
      break;
    case "student":
      query.lesson.class = {
        students: {
          some: {
            id: currentUserId!,
          },
        },
      };
      break;
    
    default:
      break;
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        }, 
      },
      take: 10,
      skip: 10 * (p - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <div className=" p-4 rounded-md flex-1 m-4 mt-0">
    
<Bar role={role} table="exam" type="create" data="All Exams" />

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default ExamListPage;