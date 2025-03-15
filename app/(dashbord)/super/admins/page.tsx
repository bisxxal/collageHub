'use client'
import AdminForm from '@/components/forms/AdminForm';
import ADupdatePages from '@/components/forms/AdminUpdate';
import { useState } from 'react';

const AdminsPage = () => {
  const [show , setShow] = useState(true)
  return (
    <div className=' w-full min-h-screen'>

<div className=" bg-zinc-900 w-fit  mx-auto flex gap-1 rounded-full mb-10  ">
      <button onClick={()=>setShow(true)} className={` ${show? ' buttonbg font-extrabold ' : ' bg-zinc-900 '}  w-48 h-14 !rounded-full `}>Create Admin</button>
    <button onClick={()=>setShow(false)} className={` ${show? ' bg-zinc-900 ' : ' buttonbg font-extrabold '} w-48 h-14 !rounded-full`}>Update Admin </button>
    </div>
    { show ?  <AdminForm />:
     <ADupdatePages   />}

    </div>
  )
}
 
export default AdminsPage