'use client'
import Link from "next/link";
 import { GoHome } from "react-icons/go";
 import { FaChalkboardTeacher, FaSchool } from "react-icons/fa";
 import { PiStudent ,PiExam} from "react-icons/pi";
 import { SiGoogleclassroom } from "react-icons/si";
 import { MdOutlinePlayLesson ,MdOutlineAssignment } from "react-icons/md";  
 import { FaRegNewspaper  ,FaRegCalendar } from "react-icons/fa";  
 import { IoIosPeople } from "react-icons/io"; 
 import { GiNotebook } from "react-icons/gi"; 
import MobileMenu from "./MobileMenu";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { RiAdminFill } from "react-icons/ri";
<RiAdminFill />

  const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon:<GoHome />,
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student" , 'super'],
      },
      {
        icon:<RiAdminFill />,
        label: "Admin",
        href: "/super/admins",
        visible: [ 'super'],
      },
      {
        icon:<FaSchool />,
        label: "Collages",
        href: "/super/collages",
        visible: [ 'super'],
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

 
const Menu = () => {
  const {   user } = useUser();
  const role = user?.publicMetadata?.role as string;
  const pathname = usePathname()
  const trimmedPathname = pathname.startsWith('/list/') ? pathname.slice(6) : pathname; 
  
  return (
    <>
      <MobileMenu role={role}/>
    <div className="mt-4 fixed top-12 backdrop-blur-lg left-0 inshadow border-r-[2px] border-[#ffffff2f] w-[200px] h-screen  max-lg:hidden block text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2 mt-6 pl-3 " key={i.title} >
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link href={item.href} key={item.label}   className={` ${trimmedPathname == (item.label.toLowerCase()) ? '  !text-[#3352cc] !font-semibold  ': '  '} flex text-xl w-full pl-3 items-center justify-start lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md `}>
                  {item.icon}
                  <span className={` text-sm`}>{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
    </>
  );
}; 
export default Menu;