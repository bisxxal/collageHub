'use client'
import { useEffect, useState } from "react";
import { getAttendanceForLesson, updateAttendance } from "@/actions/form.actions";
import { toast } from "react-toastify";

interface Student {
  id: string;
  name: string;
  surname: string;
}
interface Lessons {
  id: number;   
  name: string;
}

interface AttendanceFormProps {
  students: Student[];
  lessons: Lessons[];
}

const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days: Date[] = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const AttendanceForm: React.FC<AttendanceFormProps> = ({ students, lessons }) => {
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [lessonId, setLessonId] = useState<number>(lessons[0]?.id || 1);  
 
  const month = new Date().getMonth();  
  const year = new Date().getFullYear(); 
  const daysInMonth = getDaysInMonth(month, year);
  const today = new Date().toDateString();  
  
  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await getAttendanceForLesson(lessonId, year, month);
      if (response.success) {
        const fetchedAttendance: any = response.data;
        const newAttendanceState: { [key: string]: boolean } = {};

        fetchedAttendance.forEach((record: any) => {
          const key = `${record.studentId}-${new Date(record.date).toDateString()}`;
          newAttendanceState[key] = record.present;
        });

        setAttendance(newAttendanceState);
      } else { 
      }
    };

    fetchAttendance();
  }, [lessonId, month, year]);

 
function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const handleCheckboxChange = debounce(async (studentId: string, date: Date, isChecked: boolean) => {
  const dateString = date.toDateString();
  
  const today = new Date().toDateString(); 
  
  if (dateString !== today) {
    return;  
  }

  setAttendance((prev) => ({
    ...prev,
    [`${studentId}-${dateString}`]: isChecked,
  }));

  const response = await updateAttendance({ studentId, lessonId, date, present: isChecked } );
  
  if (response?.success) {
    toast.success('Attendance updated');
  }
}, 300);  

  return (
    <div className=" w-[1270px] overflow-x-auto  max-lg:px-2">

       <h2 className="text-lg font-semibold text-gray-500">
        Attendance for {new Date().toLocaleString("default", { month: "long" })}
      </h2>

    <div className=" w-full flex gap-5 items-center my-2  justify-end pr-40 "> 
     <h1 className=" text text-zinc-500  whitespace-nowrap ">Select lesson </h1>
        <select className="ring-[1.5px] bg-[#00000037] ring-[#ffffff23] p-1 rounded-md text-sm w-[200px]  " value={lessonId}
        onChange={(e) => setLessonId(parseInt(e.target.value))} >
        {lessons?.map((lesson) => (
          <option
            className="bg-[#000000c0] option border-y-[.3px] border-zinc-600" value={lesson.id} key={lesson.id}>
            {lesson.name}
          </option>
        ))}
      </select>
    </div>

     
      <div className="flex items-center w-full max-lg:w-[1270px] ">
        <h1 className="w-[173px]">Student name</h1>
        <div className={`flex mb-5 text-sm gap-[5.5px] w-full justify-between mt-4 pr-5  `}>
          {daysInMonth.map((date) => (
            <div key={date.toDateString()} className={`${ date.toDateString() === today ? 'bg-blue-600' : 'bg-[#6f16ff2c]' } w-4 h-4 flex items-center justify-center rounded day-block`}>
              <span>{date.getDate()}</span>
            </div>
          ))}
        </div>
      </div>

      {students.map((student) => (
        <div key={student.id} className="mb-5  w-[1270px] inshadow px-3 rounded py-2 flex  items-center">
          
          <div className="text-sm  w-[133px] flex items-center  ">
            {student.name} {student.surname} 
          </div>

          <div className="flex gap-1 ">
            {daysInMonth.map((date) => (
              <div key={`${student.id}-${date.toDateString()}`} className="w-8 h-8 flex items-center justify-center">
                <input type="checkbox" className=" disabled:accent-red-600 " checked={attendance[`${student.id}-${date.toDateString()}`] || false}
                  onChange={(e) => handleCheckboxChange(student.id, date, e.target.checked)}
                  disabled={date.toDateString() !== today}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceForm;
