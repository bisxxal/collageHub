'use client'
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent ,PiExam} from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlinePlayLesson ,MdOutlineAssignment } from "react-icons/md";  
import { FaRegNewspaper  ,FaRegCalendar } from "react-icons/fa";  
import { IoIosPeople } from "react-icons/io"; 
import { GiNotebook } from "react-icons/gi";
import { GoSidebarCollapse } from "react-icons/go";
import { useState } from "react";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { usePathname } from "next/navigation";
const menuItems = [
    {
      title: "Collage Hub",
      items: [
        {
          icon:<GoHome />,
          label: "Home",
          href: "/",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: <FaChalkboardTeacher />,
          label: "Teachers",
          href: "/list/teachers",
          visible: ["admin", "teacher"],
        },
        {
          icon:<PiStudent />,
          label: "Students",
          href: "/list/students",
          visible: ["admin", "teacher"],
        },
        
        {
          icon: <GiNotebook />,
          label: "Subjects",
          href: "/list/subjects",
          visible: ["admin"],
        },
        {
          icon: <SiGoogleclassroom />,
          label: "Classes",
          href: "/list/classes",
          visible: ["admin", "teacher"],
        },
        {
          icon:<MdOutlinePlayLesson />,
          label: "Lessons",
          href: "/list/lessons",
          visible: ["admin", "teacher"],
        },
        {
          icon:<PiExam />,
          label: "Exams",
          href: "/list/exams",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: <MdOutlineAssignment />,
          label: "Assignments",
          href: "/list/assignments",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: <FaRegNewspaper />,
          label: "Results",
          href: "/list/results",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon: <IoIosPeople />,
          label: "Attendance",
          href: "/list/attendance",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon:<FaRegCalendar />,
          label: "Events",
          href: "/list/events",
          visible: ["admin", "teacher", "student"],
        },
        {
          icon:<FaRegMoneyBill1 />,
          label: "fee",
          href: "/list/fee",
          visible: ["admin", "student"],
        },
       
      ],
    },
    
  ];
function MobileMenu({role}:{role:string}) {
  const [width , setWidth ] = useState<boolean>(false)
  const pathname = usePathname()
  const trimmedPathname = pathname.startsWith('/list/') 
  ? pathname.slice(6)  
  : pathname; 
 
  return (
    <>
    <div  onClick={()=>setWidth(!width)} className=" hidden max-lg:block  max-lg:fixed top-4 hover:bg-[#ffffff38] rounded-full p-2 right-2 z-40 text-xl ">
<GoSidebarCollapse className="   " />
    </div>
    <div className={` ${ width === true ? ' w-[190px] left-0 top-0 ' : ' w-0 hidden -left-32  ' } fixed pl-2  top-0 hidden  overflow-hidden bg-[#090a1592] backdrop-blur-[20px] h-screen z-10 max-lg:block`}>
    <div className="mt-20   text-sm"> 
        {menuItems.map((i) => (
          <div className="flex flex-col gap-2" key={i.title}>
            
            {i.items.map((item) => {
                if (item.visible.includes(role)) {
                return (
                    <Link
                    href={item.href}
                    key={item.label}
                    className={` ${trimmedPathname == (item.label.toLowerCase()) ? '  !text-[#a379fd] !font-semibold  ': '  '} flex text-xl w-full pl-3 items-center justify-start lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md `}
                    >
                    {item.icon}
                    <span className="  text-sm ">{item.label}</span>
                    </Link>
                );
              }
            })}
            </div>
        ))}
        </div>
    </div>
        </>
  )
}

export default MobileMenu