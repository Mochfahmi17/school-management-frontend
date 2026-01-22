/* eslint-disable @next/next/no-img-element */
"use client";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";

const NavbarView = () => {
  const { user } = useAuthStore();

  const getAvatar = (name: string) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

    return avatarUrl;
  };
  return (
    <header className="bg-white py-6 px-[2%] shadow-sm">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            className="py-2.5 pr-3 pl-11 rounded-lg text-sm outline-0 w-80 bg-slate-50"
          />
          <button className="absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer">
            <IoSearchOutline className="size-6 text-gray-500" />
          </button>
        </div>
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right gap-1">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-gray-500 text-xs">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full">
              <img
                src={getAvatar(user.name)}
                alt={user.name}
                className="rounded-full w-10 h-10"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm">Loading...</p>
        )}
      </div>
    </header>
  );
};

export default NavbarView;
