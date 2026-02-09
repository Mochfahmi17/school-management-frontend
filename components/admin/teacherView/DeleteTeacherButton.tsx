"use client";
import Modal from "@/components/Modal";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "sonner";

type DeleteTeacherButtonProps = {
  id: string;
  mutateData: () => void;
};

const DeleteTeacherButton = ({ id, mutateData }: DeleteTeacherButtonProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/teacher/${id}`,
        { method: "DELETE", credentials: "include" },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setShowConfirmation(false);
      toast.success(data.message);
      mutateData();
    } catch (error) {
      console.log(error);
      toast.error("Hapus data gagal!");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirmation(true)}
        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-red-600 hover:text-red-500"
      >
        <FaTrash />
      </button>

      {showConfirmation && (
        <Modal setShowConfirmation={setShowConfirmation}>
          <FaTrash className="mx-auto mb-8 size-14 text-gray-500" />
          <p className="mb-6 text-gray-500 dark:text-gray-300">
            Apa anda yakin ingin hapus data guru ini ?
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="focus:ring-primary-300 cursor-pointer rounded-lg border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:outline-none dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Hapus
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default DeleteTeacherButton;
