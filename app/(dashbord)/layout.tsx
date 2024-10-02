 
import Menu from "@/components/custom/Menu";
import Navbar from "@/components/custom/Navbar"; 
import Link from "next/link"; 

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#] flex">
      {/* LEFT */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
        
          <span className="hidden lg:block font-bold">Collage</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#161621] overflow-scrol flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}