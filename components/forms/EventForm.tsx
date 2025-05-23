"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { eventSchema, EventSchema  } from "@/lib/FormValidation";
import { createEvent,  updateEvent } from "@/server/server.actions";
import InputField from "../custom/InputField";
import { allevent } from "@/server/form.actions";

const EventForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update" |"delete";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const [teachers, setTeachers] = useState<any>([]);

  const [state, formAction] = useFormState(
    type === "create" ? createEvent : updateEvent,
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
      toast.success(`Event has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allevent();
      setTeachers(res);
    };
    fetchteachers();
  }, [relatedData]);

  return (
    <form
      className="flex  p-4 rounded-3xl text-xl backdrop-blur-xl bg-[#cccccc1a] frame border-[#ffffff3b] border flex-col gap-8"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Event" : "Update the event"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Event Title"
          name="name"
          defaultValue={data?.title}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Event description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
           <InputField
          label="Start Date"
          name="startTime"
          defaultValue={data?.startTime}
          register={register}
          error={errors?.startTime}
          type="date"
        />
        <InputField
          label="End Date"
          name="endTime"
          defaultValue={data?.endTime}
          register={register}
          error={errors?.endTime}
          type="date"
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
        <div className="flex flex-col gap-2 w-full md:w-1/2  ">
          <label className="text-xs text-gray-500">Classes</label>
          <select
            multiple
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("class")}
            defaultValue={data?.classId}
          >
            {teachers?.map(
              (teacher: { id: string; name: string;   }) => (
                <option
                  className=" text-blac border-y-[.3px] border-zinc-600 "
                  value={teacher.id}
                  key={teacher.id}
                >
                  {teacher.name }
                </option>
              )
            )}
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>
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

export default EventForm;
