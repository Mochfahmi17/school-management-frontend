/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuthStore } from "@/stores/auth";
import { IoSearchOutline } from "react-icons/io5";
import LoadingCircle from "../LoadingCircle";

const NavbarView = () => {
  const { user } = useAuthStore();

  const getAvatar = (name: string) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

    return avatarUrl;
  };
  return (
    <header className="bg-white px-[2%] py-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            className="w-80 rounded-lg bg-slate-50 py-2.5 pr-3 pl-11 text-sm outline-0"
          />
          <button className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer">
            <IoSearchOutline className="size-6 text-gray-500" />
          </button>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1 text-right">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-200">
              <img
                src={getAvatar(user.name)}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LoadingCircle className="size-5 border-gray-800" />
            <p className="text-sm">Loading</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavbarView;
