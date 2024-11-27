import prisma from '@/lib/prisma';
import React from 'react'

 async function EventList({dateParam}:{dateParam:string | undefined}) {
 
    const date =dateParam ? new Date(dateParam) : new Date();
    
    const data =await prisma.event.findMany({
        where:{
            startTime:{
                gte :new Date(date.setHours(0,0,0,0)),
                lte :new Date(date.setHours(23,59,59,59)),
            }
        }
    })
    return (
    <div className="flex flex-col gap-4">
    {data.map((event) => (
      <div
        className="p-5 frame rounded-md border-2 border-[#a277ff51] border-t-4 "
        key={event.id}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">{event.title}</h1>
          <span className="text-gray-300 text-xs">
            {event.startTime.toLocaleTimeString('en-In', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: false,
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
      </div>
    ))}
  </div>
  )
}

export default EventList