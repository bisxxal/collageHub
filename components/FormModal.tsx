"use client";
import { deleteExam, deleteStudent, deleteSubject, deleteTeacher } from "@/actions/subject.actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { IoAdd } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FormServerProps } from "./FormServer";
import Form from "./Forms";
const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormServerProps & { relatedData: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";

  const bgColor = type === "create" ? "bg-blue-500" : type === "update" ? "bg-green-500" : "bg-red-500";

  const [open, setOpen] = useState(false);  

  // console.log(relatedData);
  
  return (
    <>
     {/* <Try type={type} data={data} setOpen={setOpen} table={table} relatedData={relatedData} id={id}  /> */}
     {/* <Form type={type} data={data} setOpen={setOpen} table={table} relatedData={relatedData} id={id}  /> */}
      <button
        className={`${size} flex !justify-center !items-center text-2xl h-10 w-10 rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <h1>
          {type === "create" ? (
            <IoAdd />
          ) : type === "update" ? (
            <MdEdit className=" text-lg" />
          ) : (
            <>
              <MdDeleteOutline />
            </>
          )}
        </h1>
      </button>
      {open && (
        <div className="w-full h-screen absolute left-0 top-0 bg-[#00000043] backdrop-blur-[10px] bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg- p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form type={type} data={data} setOpen={setOpen} table={table} relatedData={relatedData} id={id}  />
            <div
              className="absolute top-8 right-12 text-lg font-bold cursor-pointer"
              onClick={() => setOpen(false)}
            >
              X
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
