"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { CldUploadWidget } from "next-cloudinary";
import { teacherSchema, TeacherSchema } from "@/lib/FormValidation";
import { IoMdCloudUpload } from "react-icons/io";
import InputField from "../custom/InputField"; 
import { allteachers } from "@/actions/form.actions"; 
import { createTeacher, updateTeacher } from "@/actions/server.actions";

const TeacherForm = ({
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
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [img, setImg] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => { 
    if (!img) {
      setImg(data.img);
    }
    else{
      setImg(img?.secure_url);
    } 
    if(type === "update"){
      formAction({ ...data , img: img?.secure_url }); 
      
    }
    if(type === "create"){
      formAction({ ...data, img: img?.secure_url });
    }
 
  });
  

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const [subjects, setTeachers] = useState<any>([]);

  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allteachers();
      setTeachers(res);
    };
    fetchteachers();
  }, [relatedData]);

  return (
    <form className="flex inshadow p-4 rounded-2xl frame flex-col max-lg:gap-0 gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update the teacher"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap max-md:gap-1 gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap max-md:gap-1 gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.surname}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
       { data && 
       <>
       <InputField
          label="img"
          name="img"
          defaultValue={data?.img}
          register={register}
          error={errors.img}
        />
       </>
        }

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
        <div className="flex flex-col max-md:gap-1 gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 bg-transparent rounded-md text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option className=" bg-[#0000009f] " value="MALE">
              Male
            </option>
            <option className=" bg-[#000000b4] " value="FEMALE">
              Female
            </option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Subjects</label>
          <select
            multiple
            className="ring-[1.5px] ring-gray-300 p-2 bg-[#0000006e] rounded-md text-sm w-full"
            {...register("subjects")}
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>
        <CldUploadWidget
          uploadPreset="school"
          onSuccess={(result, { widget }) => {
            setImg(result.info);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className="text-xs text-gray-500 max-md:my-2 border border-[#ffffff3b] rounded-lg p-2 flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <IoMdCloudUpload className=" text-xl" />
                <span>Upload a photo</span>
              </div>
            );
          }}
        </CldUploadWidget>

        {img ? (
          <Image
            className=" w-24 h-24 rounded-full"
            src={img}
            alt=""
            width={700}
            height={728}
          />
        ) : ( data?.img &&
          <Image
            className=" w-20 h-20 rounded-full"
            src={data?.img}
            alt=""
            width={700}
            height={728}
          />
        )}
      </div>
      {state.error && (
        <span className="text-red-500">Username is taken !!</span>
      )}
      <button className="buttonbg mt-2 text-white p-2   !rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
