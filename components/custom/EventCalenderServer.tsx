
import "react-calendar/dist/Calendar.css";
import { MdEventNote } from "react-icons/md";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

async function EventCalenderServer({searchParams}:{searchParams:{[key:string]:string | undefined}}) {
  const {date} = searchParams;
  return (
    <div className="px-4 rounded-md">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold mb-4">Events</h1>
      <MdEventNote className=" text-3xl" />
    </div>

      <EventCalendar />


      <div className=" mt-3">
        <h1 className=" ">All Events</h1>
        <EventList dateParam={date}/>

      </div>
     
    </div>
  )
}

export default EventCalenderServer