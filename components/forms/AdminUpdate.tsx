 
'use client'
import { AllAdmins, DeleteAdmin, UpdateAdmin } from '@/actions/super.actions';
import React, { useEffect, useState } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast';

const ADupdatePages = ( ) => {
  const [adminData, setAdminData] = useState( [] as any); 
  const [show , setShow] = useState('')
  const [loader , setLoader] = useState(false)
  useEffect(() => {
    const fetchAdmins = async () => {
        setLoader(true)
        const admins = await AllAdmins();
        setAdminData(admins);
        setLoader(false)
    }
    fetchAdmins();
  }
  , [ ]);

  console.log(adminData)

  const handleCollageChange = (index: number, value: string) => {
    const updatedAdmins = [...adminData];
    updatedAdmins[index].collage = value;
    setAdminData(updatedAdmins); 
  };

  const onSubmit = async (formData: FormData) => {
    const collage = formData.get('collage') as string; 
    const username = formData.get('username') as string;
    const cl = formData.get('cl') as string;
    const res = await UpdateAdmin(username,cl, collage);
    if (res.success) {
      toast.success('Admin Updated successfully');
    } else {
      toast.error('Admin Update failed');
    }
    console.log(username, collage)
  };

  const onDelete = async (id: string) => {
    const res = await DeleteAdmin(id);
    if (res.success) {
      toast.success('Admin Deleted successfully');
    } else {
      toast.error('Admin Delete failed');
    }
    setShow('')
  }

  return (
    <div className=' w-full min-h-screen relative overflow-hidden'>
      <h1 className=' text-center text-3xl font-semibold mb-10'>Update Admin</h1>
      {
            loader && <div className=' absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <LoaderIcon className=' text-xl' />
            </div>
        }
    { adminData && !loader &&  <div className="w-1/2 max-md:w-[90%] mx-auto border-2 border-[#ffffff29] rounded-2xl">

      {adminData?.map((admin:{id:string , userName:string , collage:string , clerkId:string}, index:number) => (
          <form
            key={admin.id}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              onSubmit(formData);
            }}
            className="flex justify-between items-center overflow-hidden py-7 border-b-2 border-[#ffffff16] p-5 max-md:p-4">
            <input readOnly name="username" className="max-md:w-32   bg-transparent" value={admin.userName} />
            <input readOnly name="cl" className="max-md:w-32  hidden  bg-transparent" value={admin?.clerkId} />

            <select className="inputbg capitalize bg-transparent border border-[#ffffff3c] p-2 px-5 rounded-2xl" name="collage"
            defaultValue={admin.collage} onChange={(e) => handleCollageChange(index, e.target.value)} >
              <option value="tact">Tact</option>
              <option value="silicon">Silicon</option>
              <option value="tat">Tat</option>
              <option value="iter">Iter</option>
              <option value="kiit">Kiit</option>
            </select>

            <button type="submit" className="bg-green-500 text-white rounded-xl p-3  max-md:px-5 px-10">Update</button>
            <button onClick={() => setShow(admin.id)} className="bg-red-500 text-white rounded-xl p-3 max-md:px-5 px-10"> Delete </button>
          </form>
        ))}      
      </div>}

     { show && <div className=' absolute  left-[20%] max-md:w-[80%]  max-md:left-[10%] max-md:h-[20%] p-4 w-[60%] top-[10%] flex items-center justify-center flex-col rounded-3xl text-xl backdrop-blur-xl bg-[#ffffff18] h-[40%] '>
        <h1 className=' text-xl '>All data will be lost. Are you sure you want to delete Admin ? </h1>
        <div className=' flex gap-6 mt-4'>
            <button onClick={() => onDelete(show)}   className="bg-red-500 text-white rounded-lg p-3  px-10"> Delete </button>
            <button onClick={() => setShow('')}   className="bg-green-500 text-white rounded-lg p-3  px-10"> Cancel </button>
        </div>
      </div>}
    </div>
  );
};

export default ADupdatePages;
