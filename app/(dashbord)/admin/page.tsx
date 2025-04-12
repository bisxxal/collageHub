import AttendanceServer from "@/components/custom/AttendanceServer";
import Card from "@/components/custom/Card";
import CountchatServer from "@/components/custom/CountchatServer";
import EventCalenderServer from "@/components/custom/EventCalenderServer";
import FinanceChart from "@/components/custom/FinanceChart";


const AdminPage = ({searchParams}:{searchParams:{[key:string]:string | undefined}}) => {
  return (
    <div className="p-4 bg-[#090a15f2] flex gap-4 flex-col min-h-[100vh] md:flex-row ">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">

        <div className="flex gap-4 max-md:gap-2 mt-2 justify-between flex-wrap">
          <Card type="admin"  text='text-[#fc2626]' bg='bg-[#ff00003e]' />
          <Card type="teacher" text='text-[#26fc26]' bg='bg-[#0dff003e]' />
          <Card type="student" text='text-[#f3fd29]' bg='bg-[#fff2003e]'/>
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
 
            <CountchatServer />
          </div> 
          <div className="w-full  lg:w-2/3 h-[450px]">
            <AttendanceServer />
          </div>
        </div> 
        <div className="w-full   h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex  flex-col gap-8">
      
        <EventCalenderServer searchParams={searchParams} /> 
      </div>
    </div>
  );
};

export default AdminPage;