import React from "react";
import TableSearch from "./TableSearch";
import FormModal from "../FormModal"; 

function Bar({ role, table, type, data }: any) {
  return (
    <div className="flex items-center justify-between w-full">
      {data && (
        <h1 className="hidden md:block text-lg font-semibold">{data}</h1>
      )}
      <div className="flex flex-col md:flex-row items-center !justify-between gap-4 !w-full md:w-auto">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
    
          {(role == "admin"  ) && (
            <FormModal table={table} type={type} />
          )}

        {( ( table==='exam' || table==='assignment') && role === "teacher") && (
            <FormModal table={table} type={type} />
          )}

        </div>
      </div>
    </div>
  );
}

export default Bar;
