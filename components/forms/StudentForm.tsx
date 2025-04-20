"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { CldUploadWidget } from "next-cloudinary";
import { studentSchema, StudentSchema } from "@/lib/FormValidation";
import InputField from "../custom/InputField";
import { createStudent, updateStudent } from "@/server/server.actions";
import { allStudents } from "@/server/form.actions";
import { LuLoader } from "react-icons/lu";
import Image from "next/image";

const StudentForm = ({type,data,setOpen,relatedData,}: {type: "create" | "update" | "delete";data?: any;setOpen: Dispatch<SetStateAction<boolean>>;relatedData?: any;}) => {
  
  const {register,  handleSubmit,formState: { errors },} = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
  });

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<any>([]);
  const [img, setImg] = useState<any>();

  const [state, formAction] = useFormState(
    type === "create" ? createStudent : updateStudent,
    {success: false,error: false  , message: ""}
  );

  const onSubmit = handleSubmit((data) => {
    setLoading(true);

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

    // formAction({ ...data, img: img?.secure_url });
  });

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      toast.success(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
    if (state?.success || state?.error) {
      setLoading(false); 
    }
  }, [state, router, type, setOpen]);

  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allStudents();  
      setStudents(res);
    };
    fetchteachers();
  }, [relatedData]);

   
  const classes = students?.classes; 

  return (
    <form className="flex  flex-col p-3 px-4 pb-6  rounded-3xl text-xl backdrop-blur-xl bg-[#cccccc1a] frame max-lg:gap-1 gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
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
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <CldUploadWidget
        uploadPreset="school"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}>
        {({ open }) => {
          return (
            <div
              className="text-xs text-gray-500 border-[2px] border-[#ffffff45] p-2 rounded-lg flex items-center gap-2 cursor-pointer"
              onClick={() => open()}>
              <FaCloudUploadAlt  className=" text-xl"/>
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
      <div className="flex justify-between flex-wrap gap-4">
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
          <label className="text-xs text-gray-500">gender</label>
          <select
            className="ring-[1.5px] ring-gray-300 bg-transparent p-2 rounded-2xl text-sm w-full"
            {...register("gender")}
            defaultValue={data?.gender}
          >
            <option className=" bg-[#000000a5] " value="MALE">Male</option>
            <option className=" bg-[#000000a5] " value="FEMALE">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
       
        {/* batch */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Batch</label>
          <select
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("batch")}
            defaultValue={data?.batch}
          > 
          <option className=" bg-[#000000a5] " value="BCA">BCA</option>
          <option className=" bg-[#000000a5] " value="MCA">MCA</option>
          <option className=" bg-[#000000a5] " value="BBA">BBA</option>
          <option className=" bg-[#000000a5] " value="MBA">MBA</option>
          <option className=" bg-[#000000a5] " value="BAC">BAC</option>
          <option className=" bg-[#000000a5] " value="MTECH">MTECH</option>
          <option className=" bg-[#000000a5] " value="BTECH">BTECH</option>

          </select>
          {errors.batch?.message && (
            <p className="text-xs text-red-400">
              {errors.batch.message.toString()}
            </p>
          )}
        </div>

        


        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] bg-transparent ring-gray-300 p-2 rounded-2xl text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            { classes && classes.map(
              (classItem: {
                id: number;
                name: string;
                capacity: number;
                _count: { students: number };
              }) => (
                <option className=" bg-[#000000a5] " value={classItem.id} key={classItem.id}>
                  ({classItem.name} -{" "}
                  {classItem._count.students + "/" + classItem.capacity}{" "}
                  Capacity)
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
      </div>
      {state?.message && (
        <span className="text-red-500"> {state?.message?.errors[0]?.message} </span>
      )}
        {state.msg && (
        <span className="text-red-500"> {state?.msg} </span>
      )}
     <button disabled={loading} className="buttonbg mt-2 text-white disabled:bg-gray-700 disabled:cursor-not-allowed p-2 flex items-center justify-center  !rounded-2xl">
        { type === "create" ? "Create" : "Update"}
        {loading  && (<LuLoader className="animate-spin ml-2 text-center text-lg  text-gray-500 " size={24}/>)}
      </button>
    </form>
  );
};

export default StudentForm;
 