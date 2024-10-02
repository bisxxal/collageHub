 
import { CgProfile } from "react-icons/cg";
import Link from "next/link";
 import { GoHome } from "react-icons/go";
 import { FaChalkboardTeacher } from "react-icons/fa";
 import { PiStudent ,PiExam} from "react-icons/pi";
 import { SiGoogleclassroom } from "react-icons/si";
 import { MdOutlinePlayLesson ,MdOutlineAssignment } from "react-icons/md";  
 import { FaRegNewspaper  ,FaRegCalendar } from "react-icons/fa"; 
 import { FaRegMessage } from "react-icons/fa6";
 import { GrAnnounce } from "react-icons/gr";
 import { FiLogOut } from "react-icons/fi";
 import { IoIosSettings ,IoIosPeople } from "react-icons/io"; 
 import { GiNotebook } from "react-icons/gi";
 import { currentUser } from "@clerk/nextjs/server";
const menuItems = [
  {
    title: "MENU",
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
        icon: <FaRegMessage />,
        label: "Messages",
        href: "/list/messages",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: <GrAnnounce />,
        label: "Announcements",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: <CgProfile />,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon: <IoIosSettings />,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student"],
      },
      {
        icon:<FiLogOut />,
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student"],
      },
    ],
  },
];

 
const Menu = async() => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex text-xl items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-[#31313b]"
                >
                  {item.icon}
                  <span className="hidden text-sm lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
}; 
export default Menu;