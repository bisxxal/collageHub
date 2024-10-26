'use client' 
import { useState } from "react"; 
import { MdEdit } from "react-icons/md"; 
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Form from "./Forms";
 

export type FormServerProps = {
  table: | "teacher" | "student" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormModal = ({ table, type, data, id,  }: FormServerProps  ) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor = type === "create" ? "bg-blue-500" : type === "update" ? "bg-green-500" : "bg-red-500";
  const [open, setOpen] = useState(false);
 
  const relatedData:any =  {};
  return (
    <> 
      <button className={`${size} flex !justify-center !items-center text-2xl h-10 w-10 rounded-full ${bgColor}`} onClick={() => setOpen(true)} >
        <h1>
          {type === "create" ? (<IoAdd />) : type === "update" ? (<MdEdit className=" text-lg" />) : (<><MdDeleteOutline /></> )}
        </h1>
      </button>
      {open && (
        <div className="w-full h-screen absolute left-0 top-0 bg-[#00000043] backdrop-blur-[10px] bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg- p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form type={type} data={data} setOpen={setOpen} table={table} relatedData={relatedData} id={id}  />
            <div className="absolute top-8 right-12 text-lg font-bold cursor-pointer" onClick={() => setOpen(false)} >
              X
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
