
import "react-calendar/dist/Calendar.css";
import { MdEventNote } from "react-icons/md";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";
import PieChartComponent from "./PieChart";
import { getFince } from "@/server/payemt.actions";

async function EventCalenderServer({searchParams}:{searchParams:{[key:string]:string | undefined}}) {
  const {date} = searchParams;
  const data = await getFince();

  return (
    <>
    <div className=" w-full frame2 inshadow rounded-lg">

     <PieChartComponent feeData={data}/>
    </div>
    <div className="px-4 w-full rounded-2xl">
    <div className="flex w-full items-center justify-between">
      <h1 className="text-xl font-semibold mb-4">Events</h1>
      <MdEventNote className=" text-3xl" />
    </div>

    <div className=" w-full ">
      <EventCalendar />
    </div>
      <div className=" mt-3">
        <h1 className=" text-center my-5 ">All Events</h1>
        <EventList dateParam={date}/>
      </div>
    </div>
    </>
  )
}

export default EventCalenderServer