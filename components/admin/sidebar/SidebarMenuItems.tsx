"use client";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaBook,
  FaChalkboardTeacher,
  FaDoorOpen,
  FaUsers,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdHome } from "react-icons/md";

const MENUS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <MdHome className="size-6" />,
  },
  {
    label: "Guru",
    href: "/admin/teachers",
    icon: <FaChalkboardTeacher className="size-6" />,
  },
  {
    label: "Siswa",
    href: "/admin/students",
    icon: <FaUsers className="size-6" />,
  },
  {
    label: "Kelas",
    href: "/admin/classes",
    icon: <FaDoorOpen className="size-6" />,
  },
  {
    label: "Mata Pelajaran",
    href: "/admin/subjects",
    icon: <FaBook className="size-6" />,
  },
];

const SidebarMenuItems = () => {
  const pathname = usePathname();
  return (
    <nav className="p-4 text-white">
      <ul className="space-y-2">
        {MENUS.map((menu, i) => {
          const active = pathname === menu.href;
          return (
            <li key={i}>
              <Link
                href={menu.href}
                className={`py-3 px-4 rounded-lg flex items-center gap-3 ${active ? "bg-indigo-700 hover:bg-indigo-600" : "hover:bg-indigo-700"}  transition-all duration-300`}
              >
                {menu.icon}
                {menu.label}
              </Link>
            </li>
          );
        })}
        <li className="mt-4 pt-4 border-t border-t-indigo-700">
          <Link
            href="/admin/settings"
            className="py-3 px-4  rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center gap-3"
          >
            <IoMdSettings className="size-6" />
            Pengaturan
          </Link>
        </li>
        <LogoutButton />
      </ul>
    </nav>
  );
};

export default SidebarMenuItems;
