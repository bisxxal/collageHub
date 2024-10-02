"use client"; 
import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/actions/server.actions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const deleteActionMap: any = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
  // TODO: OTHER DELETE ACTIONS
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});

const Form = ({
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
}) => {
  const forms: {
    [key: string]: (
      setOpen: Dispatch<SetStateAction<boolean>>,
      type: "create" | "update | delete",
      data?: any,
      relatedData?: any
    ) => JSX.Element;
  } = {
    subject: (setOpen, type, data, relatedData) => (
      <SubjectForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    class: (setOpen, type, data, relatedData) => (
      <ClassForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    teacher: (setOpen, type, data, relatedData) => (
      <TeacherForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    student: (setOpen, type, data, relatedData) => (
      <StudentForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
    exam: (setOpen, type, data, relatedData) => (
      <ExamForm
        type={type}
        data={data}
        setOpen={setOpen}
        relatedData={relatedData}
      />
    ),
  };
  // const data =
  const [state, formAction] = useFormState(
    deleteActionMap[table as keyof typeof deleteActionMap],
    {
      success: false,
      error: false,
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      // toast(`${table} has been deleted!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router]);

  // console.log("Data in SubjectForm:", data, relatedData, type, table, id);

  return type === "delete" && id ? (
    <form
      action={formAction}
      className="p-4 flex inshadow frame rounded-xl flex-col gap-4"
    >
      <input type="text | number" name="id" value={id} hidden />
      <span className="text-center font-medium">
        All data will be lost. Are you sure you want to delete this {table}?
      </span>
      <button className="bg-red-700  text- py-2 px-4 rounded-md border-none w-max self-center">
        Delete
      </button>
    </form>
  ) : type === "create" || type === "update" ? (
    forms[table](setOpen, type, data, relatedData)
  ) : (
    "Form not found!"
  );
};

export default Form;
