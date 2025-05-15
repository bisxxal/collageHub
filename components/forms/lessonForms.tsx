"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { lessonSchema, LessonSchema } from "@/lib/FormValidation"; 
import InputField from "../custom/InputField";
import { allSubjectssAndTeachers } from "@/server/form.actions";
import { createLesson, updateLesson } from "@/server/server.actions";

const LessonForm = ({type,data,setOpen,  relatedData = {},}: {
  type: "create" | "update"|"delete";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LessonSchema>({
    resolver: zodResolver(lessonSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createLesson : updateLesson,
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
      toast.success(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const [data2, setdata2] = useState<any>([]);
  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allSubjectssAndTeachers();
      setdata2(res);
    };
    fetchteachers();
  }, [relatedData]);

    const teachers = data2?.teachers;
    const classes = data2?.classes;
    const subjects = data2?.subjects;
  return (
    <form
      className="flex p-4 rounded-3xl text-xl backdrop-blur-xl bg-[#cccccc1a] frame border-[#ffffff3b] border flex-col gap-8"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Add new Lesson" : "Update the Lesson"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          type="string"
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

    <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">teacher name</label>
          <select
            className="ring-[1.5px] ring-gray-300 bg-transparent p-2 rounded-2xl text-sm w-full"
            {...register("teacherId")}
            defaultValue={data?.teachers}
          >
            {teachers &&
              teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option
                    className=" text-black ! !bg-[#00000085] border-y-[.3px] border-zinc-600 "
                    value={teacher.id}
                    key={teacher.id}
                    selected={data && teacher.id === data.teacherId}
                  >
                    {teacher.name + " " + teacher.surname}
                  </option>
                )
              )}
          </select>
          {errors.teacherId?.message && (
            <p className="text-xs text-red-400">
              {errors.teacherId.message.toString()}
            </p>
          )}
        </div>
        
      </div>


      <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Day</label>
          <select
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("day")}
            defaultValue={data?.day}
          > 
 
            <option className=" bg-[#000000a5] " value="MONDAY">MONDAY</option>
            <option className=" bg-[#000000a5] " value="TUESDAY">TUESDAY</option>
            <option className=" bg-[#000000a5] " value="WEDNESDAY">WEDNESDAY</option>
            <option className=" bg-[#000000a5] " value="THURSDAY">THURSDAY</option>
            <option className=" bg-[#000000a5] " value="FRIDAY">FRIDAY</option>
            <option className=" bg-[#000000a5] " value="SATURDAY">SATURDAY</option>


          </select>
          {errors.day?.message && (
            <p className="text-xs text-red-400">
              {errors.day.message.toString()}
            </p>
          )}
        </div>

      <div className="flex flex-col gap-2 w-full md:w-1/2  ">
          <label className="text-xs text-gray-500">Classes</label>
          <select
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes?.map(
              (c: { id: number; name: string;   }) => (
                <option
                  className=" text-blac border-y-[.3px] border-zinc-600 "
                  value={c.id}
                  key={c.id}
                >
                  {c.name}
                </option>
              )
            )}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>

      <div className="flex flex-col gap-2 w-full md:w-1/2  ">
          <label className="text-xs text-gray-500">subject</label>
          <select
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
          >
            {subjects?.map(
              (c: { id: number; name: string;   }) => (
                <option
                  className=" text-blac border-y-[.3px] border-zinc-600 "
                  value={c.id}
                  key={c.id}
                >
                  {c.name}
                </option>
              )
            )}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>


      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="buttonbg text-white p-2 rounded-2xl">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;
