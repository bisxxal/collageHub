 
'use client'
import { AllAdmins, DeleteAdmin, UpdateAdmin } from '@/server/super.actions';
import { fullname } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Skeleton from '../Skeleton';
import { useRouter } from 'next/navigation';

interface adminDataProps{
  id:string;
  userName:string;
  collage:string;
  clerkId:string;
  firstName:string;
  lastName:string;
}
const ADupdatePages = ( ) => {
  const router = useRouter();
  const [adminData, setAdminData] = useState( [] as adminDataProps[] ); 
  const [show , setShow] = useState('')
  const [loader , setLoader] = useState(false)
  
  const onDelete = async (id: string) => {
    const res = await DeleteAdmin(id);
    if (res.success) {
      toast.success('Admin Deleted successfully');
    } else {
      toast.error('Admin Delete failed');
    }
    router.refresh();
    setShow('')
  }

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
    if (res.success && res) {
      toast.success('Admin Updated successfully');
    } else {
      toast.error('Admin Update failed');
    }
  };

 
  return (
    <div className=' w-full min-h-screen relative overflow-hidden'>
      <h1 className=' text-center text-3xl font-semibold mb-10'>Update Admin</h1>
      {
        loader && <Skeleton boxes={5} width={'w-[90%] max-md:h-80 h-32'} />  
      }
    { adminData && !loader && <div className="w-[90%] mx-auto border-2 border-[#ffffff29] rounded-2xl">

      {adminData?.map((admin:adminDataProps, index:number) => (
          <form key={admin.id} onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              onSubmit(formData);
            }}
            className="flex justify-between max-md:flex-col gap-4 items-center overflow-hidden py-7 border-b-2 border-[#ffffff16] p-5 max-md:p-4">

              <div  className=' flex items-center flex-col gap-4 justify-center capitalize'>
              <input readOnly name="username" className="  capitalize bg-transparent" value={admin.userName} />
              <input readOnly name="cl" className=" hidden  bg-transparent" value={admin?.clerkId} />
              <p className=' capitalize text-gray-400'> {admin.firstName} {admin.lastName}</p>
              </div>
 
            <select className=" capitalize bg-transparent border border-[#ffffff3c] max-md:text-xs max-md:px-1 max-md:rounded-lg p-2 px-5 rounded-2xl" name="collage"
            defaultValue={ fullname.find((college) => college.collage === admin.collage)?.collage || '' } onChange={(e) => handleCollageChange(index, e.target.value)} >
            {
              fullname.map((college:{collage:string , fname:string}) => (
                <option key={college.collage} value={college.collage}>{college.fname}</option>
              ))
            }
            </select>

          <div className=' flex items-center justify-center  gap-4'>
          <button type="submit" className=" buttongreen text-white rounded-xl p-3    px-10">Update</button>
          <button onClick={() => setShow(admin.clerkId)} className="buttonred text-white rounded-xl p-3   px-10"> Delete </button>
          </div>
          </form>
        ))}      
      </div>}

     { show && <div className=' absolute  left-[20%] max-md:w-[80%]  max-md:left-[10%] max-md:h-[20%] p-4 w-[60%] top-[10%] flex items-center justify-center flex-col rounded-3xl text-xl backdrop-blur-xl bg-[#ffffff18] h-[40%] '>
        <h1 className=' max-md:text-center max-md:text-base text-xl '>All data will be lost. Are you sure you want to delete Admin ? </h1>
        <div className=' flex gap-6 mt-4'>
            <button onClick={() => onDelete(show)}   className="buttonred text-white rounded-lg p-3  px-10"> Delete </button>
            <button onClick={() => setShow('')}   className="bg-gray-500 text-white rounded-lg p-3  px-10"> Cancel </button>
        </div>
      </div>}
    </div>
  );
};

export default ADupdatePages;
