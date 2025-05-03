import Bar from '@/components/custom/Bar';
import Pagination from '@/components/custom/Pagination';
import Table from '@/components/custom/Table';
import FormModal from '@/components/FormModal';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client"; 
const Expense =async  ({searchParams,}: {searchParams: { [key: string]: string | undefined };}) => {
const { userId, sessionClaims } = auth();
const role = (sessionClaims?.metadata as { role?: string })?.role;
const collage = (sessionClaims?.metadata as { collage?: string })?.collage;
    const columns = [
        {
          header: "Expense Name",
          accessor: "name",
        },
        {
          header: "Amount",
          accessor: "amount",
        },
        {
          header: "Description",
          accessor: "teacher",
          className: "hidden md:table-cell",
        },
        {
          header: "Date",
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

      const renderRow = (item:any) => (
        <tr
          key={item.id}
          className=" rounded-xl tr overflow-hidden hover:overflow-hidden inshadow text-sm "
        >
          <td className="flex items-center gap-4 p-4">{item.name}</td>
          <td>{item.amount}</td>
          <td className="hidden md:table-cell">
            { item.description}
          </td>
          <td className="hidden md:table-cell">
            {new Intl.DateTimeFormat("en-US").format(item.date)}
          </td>
          <td>
            <div className="flex items-center gap-2">
              {(role === "admin" || role === "teacher") && (
                <>
                  <FormModal table="expense" type="update" data={item} />
                  <FormModal table="expense" type="delete" id={item.id} />
                </>
              )}
            </div>
          </td>
        </tr>
      );
      const { page, ...queryParams } = searchParams;

      const p = page ? parseInt(page) : 1;

      const query: Prisma.ExpenseWhereInput = { CollageName:collage};
      
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
        prisma.expense.findMany({
          where: query,
          orderBy:{ createdAt: "desc" },
          take: 10,
          skip: 10 * (p - 1),
        }),
        prisma.expense.count({ where: query }),
      ]);

      
  return (
    <div className=" p-4 rounded-2xl flex-1 m-4 mt-0">
      <Bar role={role} table="expense" type="create" data="All Expense" />
      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  )
}

export default Expense