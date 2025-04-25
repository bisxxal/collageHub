'use client'
import { AllStudAdminsAndTeacher, collageAdmins } from '@/server/super.actions'
import { IoMdAdd } from "react-icons/io";
import React, { useState, useEffect } from 'react'
import { LoaderIcon } from 'react-hot-toast'
import Link from 'next/link';
import Skeleton from '@/components/Skeleton';

interface StudentProps{
    name:string;
    surname:string;
    username:string;
    email:string;
    batch:string
    gender:string
}
interface AdminProps{
    id:string;
    userName:string;
    firstName:string;
    lastName:string;
    email:string
}
interface TeacherProps{
    id:string;
    username:string;
    name:string;
    surname:string;
    email:string
    gender:string
}
const CollageSuperPage = () => {
  const [collages, setCollages] = useState<{ CollageName: string }[]>([])
  const [selectedCollage, setSelectedCollage] = useState<string | null>(null)
  const [student, setStudent] = useState<StudentProps[]>([])
  const [admin, setAdmin] = useState<AdminProps[]>([])
  const [teacher, setTeacher] = useState<TeacherProps[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCollages = async () => {
      const collageData = await collageAdmins()
      setCollages(collageData)
    }
    fetchCollages()
  }, [])

  useEffect(() => {
      const fetchData = async () => {
        if (selectedCollage) {
        setLoading(true)
        setStudent([])
        setAdmin([])
        setTeacher([])
        const res = await AllStudAdminsAndTeacher(selectedCollage)
        setStudent(res.studentData)
        setAdmin(res.adminData)
        setTeacher(res.teacherData)
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCollage])  

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const collage = formData.get('collage') as string
    setSelectedCollage(collage)
  }
 
  return (
    <div className='w-full min-h-screen mt-10'>
      <h1 className='text-center text-4xl my-10'>All Collages</h1>

      <form className=' w-full flex items-center gap-5 justify-center' onSubmit={handleSubmit} >
        <select className=" inshadow bg-transparent border border-[#ffffff3c] p-3 px-5 rounded-2xl" name="collage" id="collage-select">
          {collages.map((collage) => (
            <option className=' capitalize' key={collage.CollageName} value={collage.CollageName}>
              {collage.CollageName}
            </option>
          ))}
          {collages.length === 0 && <option value="loading">Loading...</option>}        
        </select>
        <button disabled={ collages.length === 0 } type="submit" className=" flex items-center justify-center disabled:bg-gray-600 buttonbg h-10 w-24 max-md:text-base text-lg rounded-full ">
           {loading ?  <LoaderIcon />  : 'search'}
         
        </button>
      </form>
      {selectedCollage && (
        <div className="mt-6">
            {loading && <p className=' text-center text-gray-400 mb-6'>Looking for {selectedCollage} collage...</p> }
          {loading && <Skeleton boxes={10} width={'w-[90%]'} /> }
          { !loading &&student &&teacher &&admin && 
          <div className='gap-3 px-2 flex justify-center  flex-wrap overflow-hidden  w-full  '>
            
            <div >
            <h3 className=' text-center text-xl font-semibold'> {student.length} Students</h3>
            {student.map((item , index)=>{
            return (<div key={index} className='rounded-2xl p-3  inshadow border-2 border-[#ffffff14] my-2 min-w-[340px] max-md:min-w-[130px] flex-1 frame'> 
            <h1 className=' text-2xl font-semibold text-center mb-4 '>{item?.name} {item?.surname} </h1>
            <p>UserName : {item.username}</p>
            <p>Email : {item?.email}</p>
            <p>Branch : {item?.batch}</p>
            <p>Gender : {item.gender}</p>
          </div>)
         })}
            </div>

            <div>
            <h3 className=' text-center text-xl font-semibold'>{admin.length} Admins</h3>
            { admin.map((item , index)=>{
            return (<div key={index} className='rounded-2xl p-3 text-clip  inshadow border-2 border-[#ffffff14] my-2 w- min-w-[340px] max-md:min-w-[130px] h-44 flex-1  frame'>
            <h1 className=' text-2xl font-semibold text-center mb-4 '>{item?.firstName} {item?.lastName} </h1>
            <h1 className=' text-2xl mb-4 font-semibold text-center '>UserName : {item?.userName}  </h1>
            <p>Email : {item?.email}</p>
            <p></p>
            <p className=' text-'>Id:{item.id}</p>
            </div>)
            })}
                <Link href={'/super/admins'} className='rounded-2xl p-3  flex flex-col items-center justify-center h-44 inshadow border-2 border-green-500 text-green-500 my-2 w-full  '>
                    <IoMdAdd />
                    <p>Add Admins</p>
                </Link>

            </div>

           

            <div>
            <h3 className=' text-center text-xl font-semibold'>{teacher.length} Teachers</h3>

          { teacher.map((item , index)=>{
            return (<div key={index} className='rounded-2xl p-3  inshadow border-2 border-[#ffffff14] my-2 min-w-[340px] max-md:min-w-[130px] flex-1  frame'>
            <h1 className=' text-2xl  font-semibold text-center mb-4'>{item?.name} {item?.surname} </h1>
            <p>UserName : {item.username}</p>
            <p>Email : {item?.email}</p>
            <p>Id : {item?.id}</p>
            <p>Gender : {item.gender}</p>
          </div>)
         })}
         
            </div>
          </div>}
        </div>
      )}
    </div>
  )
}

export default CollageSuperPage
