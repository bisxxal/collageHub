import prisma from '@/lib/prisma';
import React from 'react'

 async function EventList({dateParam}:{dateParam?:string | undefined}) {
 
    const date = dateParam ? new Date(dateParam) : new Date();
    
    const data = await prisma.event.findMany({
        where:{
            startTime:{
                gte :new Date(date.setHours(0,0,0,0)),
            }
        }
    })
    return (
    <div className="flex flex-col gap-4">
    {data.map((event) => (
      <div
        className="p-5 frame rounded-2xl border-2 border-[#3756d268] border-t-4 " key={event.id}>
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">{event.title}</h1>
          <span className="text-gray-300 text-xs">
          {event.startTime.toLocaleDateString('en-In', {
              day: '2-digit',
              month: 'short',
              year: '2-digit',
            })} - 
            {event.endTime.toLocaleDateString('en-In', {
              day: '2-digit',
              month: 'short',
              year: '2-digit',
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
      </div>
    ))}
    {
      data.length === 0 && <p className='text-center text-gray-400'>No events </p>
    }
  </div>
  )
}

export default EventList