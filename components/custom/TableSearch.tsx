'use client';
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

const TableSearch = () => {
  const router = useRouter();

  const handelSumbit =  (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  }
  return (
    <form onSubmit={handelSumbit} className="w-full md:w-auto flex items-center gap-2 text-xs inshadow frame rounded-full  px-2">
      <IoSearchOutline className=" text-xl"/>
      <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
    </form>
  );
};

export default TableSearch;  