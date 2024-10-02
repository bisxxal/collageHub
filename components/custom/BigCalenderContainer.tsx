import prisma from '@/lib/prisma'
import React from 'react'
import BigCalendar from './Bigcalender'
import { adjustScheduleToCurrentWeek } from '@/lib/utils'

async function BigCalenderContainer({type,id}:{type:'teacherId'|'classId',id:string|number}) {                  
 
  const resData = await prisma.lesson.findMany({
    where:{
        ...(type === 'teacherId' ? {teacherId:id as string} : {classId:id as number})
    }
  })

  const data = resData.map((lesson)=>{
    return{
        title:lesson.name,
        start:lesson.startTime,
        end:lesson.endTime
    }
  })
  const schedule = adjustScheduleToCurrentWeek(data);
    return (
    <div>
        <BigCalendar data={schedule} />
    </div>
  )
}

export default BigCalenderContainer