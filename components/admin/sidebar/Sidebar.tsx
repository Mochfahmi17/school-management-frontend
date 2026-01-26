"use client";
import { useAuthStore } from "@/stores/auth";
import SidebarMenuItems from "./SidebarMenuItems";
import { FaGraduationCap } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useAuthStore();
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
      <SidebarMenuItems />
    </aside>
  );
};

export default Sidebar;
