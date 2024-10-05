import { allStudentsAttendence } from '@/actions/form.actions';
import AttendanceServer from '@/components/custom/AttendanceServer';
import AttendanceForm from '@/components/forms/AttendanceFoem'
import { auth } from '@clerk/nextjs/server';
 

async function Attendencepage() {
  const { userId, sessionClaims } = auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
   
  let students;

  if(role === "admin" || role === "teacher"){
     students = await allStudentsAttendence();
  }


  return (
    <div className='  flex items-center mt-20 justify-center w-[1470px] min-h-[90vh]'>

      {
        role === "admin" || role === "teacher" ? <AttendanceForm students={students?.students} lessons={students?.lesssons} /> :
        <>
        <div >
          <h1>Only Admin and Teacher can access this page</h1>

        </div>
        </>
      }
    </div>
  )
}

export default Attendencepage