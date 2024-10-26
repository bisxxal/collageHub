 
import Menu from "@/components/custom/Menu";
import Navbar from "@/components/custom/Navbar"; 

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <div className=" relative  w-full ">
      <Menu />
        <Navbar />
        <div className=" max-lg:w-full  mt-[60px] ml-[200px] max-lg:ml-0 ">
        {children}
        </div>
      </div>
    </div>
  );
}