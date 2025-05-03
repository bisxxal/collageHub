 "use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { ExpenseSchema, expenseSchema } from "@/lib/FormValidation"; 
import InputField from "../custom/InputField";
import { allClasses } from "@/server/form.actions";
import { createClass, createExpense, updateClass, updateExpense } from "@/server/server.actions";

const ExpenseForm = ({
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
  } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createExpense : updateExpense,
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
      toast.success(`Expense has been ${type === "create" ? "Added" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const [classs, setClass] = useState<any>([]);
  useEffect(() => {
    const fetchteachers = async () => {
      const res = await allClasses();
      setClass(res);
    };
    fetchteachers();
  }, [relatedData]);
 
  console.log('clicking')

  return (
    <form
      className="flex p-4 rounded-3xl text-xl backdrop-blur-xl bg-[#cccccc1a] frame  flex-col gap-8"
      onSubmit={onSubmit}
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create expense " : "Update expense"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="expense name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
          />
        <InputField
          label="amount"
          type="number"
          name="amount"
          defaultValue={data?.amount}
          register={register}
          error={errors?.amount}
        />
        <InputField
          label="description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
          <InputField
          label="Date"
          name="date"
          defaultValue={data?.date}
          register={register}
          error={errors?.date}
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

export default ExpenseForm;
