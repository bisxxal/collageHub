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
  const size = type === "create" ? " w-fit px-3 h-8 hover:buttonbg transation-all" : "w-7 h-7";
  const bgColor = type === "create" ? "buttonbg" : type === "update" ? "buttongreen" : "buttonred";
  const [open, setOpen] = useState(false);
 
  const relatedData =  {};
  return (
    <> 
      <button className={`${size} flex !justify-center !items-center text-2xl h-10 w-10 rounded-full ${bgColor}`} onClick={() => setOpen(true)} >
        <h1>
          {type === "create" ? (<div className=" flex items-center text-sm  transition-all gap-2"> Add {table} <IoAdd className=" text-2xl" /></div>) : type === "update" ? (<MdEdit className=" text-lg" />) : (<><MdDeleteOutline /></> )}
        </h1>
      </button>
      {open && (
        <div className="w-full h-screen absolute left-0 top-0 bg-[#00000043] backdrop-blur-[10px] bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg- p-4 rounded-2xl relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
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
