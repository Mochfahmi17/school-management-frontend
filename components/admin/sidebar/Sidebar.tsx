"use client";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { FaGraduationCap, FaUsers } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { FaChalkboardTeacher, FaDoorOpen, FaBook } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

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

const Sidebar = () => {
  const { user } = useAuthStore();
  const pathname = usePathname();
  return (
    <aside className="h-screen bg-indigo-800 w-64 shadow-lg text-white">
      <div className="px-6 py-4 border-b border-indigo-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <FaGraduationCap className="size-8" /> School System
        </h1>
        {user ? (
          <p className="mt-1 capitalize text-sm text-indigo-200">
            {user.role === "ADMIN" ? "Admin Panel" : "Teacher Panel"}
          </p>
        ) : null}
      </div>
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
          <li>
            <button
              type="button"
              className="py-3 px-4  rounded-lg hover:bg-red-600 cursor-pointer w-full transition-colors duration-300 flex items-center gap-3"
            >
              <LuLogOut className="size-6" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
