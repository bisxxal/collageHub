
import { allStudentsAttendence } from '@/server/form.actions'; 
import StudentAttendance from '@/components/custom/StudentAttendance'; 
import AttendanceForm from '@/components/forms/AttendanceFoem'
import { auth } from '@clerk/nextjs/server';
 

async function Attendencepage() {
  const {  sessionClaims  , userId } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const collage = (sessionClaims?.metadata as { collage?: string })?.collage  as string
  let students;
  if(role === "admin" || role === "teacher"){
     students = await allStudentsAttendence(role, userId!);
  }
  return (
    <div className='  flex items-center mt-24 justify-center  w-full  min-h-[90vh]'>
      {
        role === "admin" || role === "teacher" ? <AttendanceForm   lessons={students?.lesssons}  collage={collage}/> :
        <>
        <div  className=' w-full h-screen'> 
          <StudentAttendance/>
        </div>
        </>
      }
    </div>
  )
}

export default Attendencepage