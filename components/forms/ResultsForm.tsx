"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import {   resultSchema, ResultSchema } from "@/lib/FormValidation"; 
import InputField from "../custom/InputField";
import {  allResults } from "@/actions/form.actions";
import { createClass, createResults, updateClass, updateResults } from "@/actions/server.actions";

const ResultForm = ({
  type,
  data,
  setOpen,
  relatedData = {},
}: {
  type: "create" | "update"|"delete";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResultSchema>({
    resolver: zodResolver(resultSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createResults : updateResults,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    formAction(data);
    
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const [classs, setClass] = useState<any>([]);
  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allResults();
      
      setClass(res);
    };
    fetchteachers();
  }, [relatedData]);

  const teachers = classs?.teachers;
  const grades = classs?.grades;
 

  return (
    <form
      className="flex p-4 inshadow frame rounded-lg flex-col gap-8"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Result Score"
          name="score"
          defaultValue={data?.score}
          register={register}
          error={errors?.score}
          type="number"
          />
       
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Student name</label>
          <select
            className="ring-[1.5px] ring-gray-300 bg-transparent p-2 rounded-md text-sm w-full"
            {...register("examId")}
            defaultValue={data?.teachers}
          >
            {teachers &&
              teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    className=" text-black ! !bg-[#00000085] border-y-[.3px] border-zinc-600 "
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.supervisorId}
                  >
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
          </select>
          {errors.examId?.message && (
            <p className="text-xs text-red-400">
              {errors.examId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Exam Name</label>
          <select
            className="ring-[1.5px] ring-gray-300 bg-transparent p-2 rounded-md text-sm w-full"
            {...register("studentId")}
            defaultValue={data?.studentId}
          >
            {grades &&
              grades.map((grade: { id: number; title: number }) => (
                <option
                  value={grade.id}
                  className=" text-black !bg-[#00000085] "
                  key={grade.id}
                  selected={data && grade.id === data.studentId}
                >
                  {grade.title}
                </option>
              ))}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="buttonbg text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ResultForm;
