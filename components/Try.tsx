'use client';

import { Dispatch, SetStateAction } from "react";

function Try({
    type,
    data,
    setOpen,
    table,
    relatedData,
    id,
  }: {
    type: "create" | "update" | "delete";
    data?: any;
    table: string;
    id?: number | string;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
  }){

    console.log('Data in SubjectForm:', data , relatedData , type , table ,  id ,  );
    

    
  return (
    <div>Try</div>
  )
}

export default Try