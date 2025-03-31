'use client'
import { AddAdmin } from '@/actions/super.actions';
import { fullname } from '@/lib/utils';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const AdminForm = () => {
    const [error , setError] = useState('');
    const [loading , setLoading] = useState(false);
const onSumbit = async(formData:FormData) => {
  setLoading(true)
  setError('')
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const collage = formData.get('collage') as string;

    try {
      const res = await AddAdmin( username , firstName ,lastName ,email, password ,collage );
      if (res?.message) {
        toast.error(res?.message?.errors[0]?.message)
        setError(res?.message?.errors[0]?.message)
      }
      if(res?.success)
      toast.success('Admin added successfully');
    }
    catch (error) {
    }
    setLoading(false)
}
  return (
    <div>
          <h1 className=' text-center text-3xl font-semibold mb-10'>Add New Admin</h1>
        <form className=' flex flex-col gap-4  mx-auto mt-10 w-1/2 max-md:w-[80%] rounded-2xl ' action={onSumbit}>
          <div className='flex flex-col'>
            <label htmlFor="email">Email</label>
            <input className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' type="email" name='email' id='email'  required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password">Password</label>
            <input className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' type="password" name='password' id='password'required />
          </div>
          <div className='flex flex-col'>
            <label  >UserName</label>
            <input className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' type="text" name='username' required/>
          </div>
          <div className='flex flex-col'>
            <label  >FirstName</label>
            <input className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' type="text" name='firstName' required/>
          </div>
          <div className='flex flex-col'>
            <label>LastName</label>
            <input className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' type="text" name='lastName' required/>
          </div>
          <div className='flex flex-col'>
            <label>Collaege Name</label>
            <select className=' inputbg bg-transparent border-2 border-[#2b5dfe9e] p-2 rounded-2xl' name="collage" required >
             
              {
                fullname.map((college:{collage:string , fname:string}) => (
                  <option key={college.collage} value={college.collage}>{college.fname}</option>
                ))
              }
            </select>
          </div>

      {error &&  <span className="text-red-500 text-lg "> {error} </span>}
          <button disabled={loading} className=' disabled:bg-gray-500 buttonbg p-4 rounded-full ' type='submit'>
            {loading ? 'Loading...' : '  Add Admin' }
          </button>
        </form>

    </div>
  )
}

export default AdminForm