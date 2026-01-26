"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";
import Modal from "./Modal";

const LogoutButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        { method: "POST", credentials: "include" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      router.replace("/login");
      setShowConfirmation(false);
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Logout gagal!");
    }
  };
  return (
    <>
      <li>
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="py-3 px-4 rounded-lg hover:bg-red-600 cursor-pointer w-full transition-colors duration-300 flex items-center gap-3"
        >
          <LuLogOut className="size-6" />
          Logout
        </button>
      </li>

      {showConfirmation && (
        <Modal setShowConfirmation={setShowConfirmation}>
          <LuLogOut className="size-14 text-gray-500 mx-auto mb-8" />
          <p className="mb-6 text-gray-500 dark:text-gray-300">
            Apa anda yakin ingin keluar ?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="py-2 px-6 text-sm cursor-pointer font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="py-2 px-6 text-sm cursor-pointer font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Logout
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LogoutButton;
