
import "react-calendar/dist/Calendar.css";
import { MdEventNote } from "react-icons/md";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import PieChartComponent from "./PieChart";
import { getFince } from "@/actions/payemt.actions";

async function EventCalenderServer({searchParams}:{searchParams:{[key:string]:string | undefined}}) {
  const {date} = searchParams;
  const data = await getFince();

  return (
    <>
    <div className=" w-full frame2 inshadow rounded-lg">
    <h1 className=' pt-2 pl-4 font-semibold text-lg'>Revenue pie</h1>
     <PieChartComponent feeData={data}/>
    </div>
    <div className="px-4 w-full rounded-md">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-xl font-semibold mb-4">Events</h1>
      <MdEventNote className=" text-3xl" />
    </div>
      <EventCalendar />
      <div className=" mt-3">
        <h1 className=" text-center my-5 ">All Events</h1>
        <EventList dateParam={date}/>
      </div>
    </div>
    </>
  )
}

export default EventCalenderServer