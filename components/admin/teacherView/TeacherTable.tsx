/* eslint-disable @next/next/no-img-element */
import LoadingCircle from "@/components/LoadingCircle";
import { DataTeacher } from "@/types";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

type TeacherTableProps = {
  teachers: DataTeacher[];
  isLoading: boolean;
};

const TeacherTable = ({ teachers, isLoading }: TeacherTableProps) => {
  const getAvatar = (name: string) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=a232a8&color=fff`;

    return avatarUrl;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              NIP
            </th>
            <th scope="col" className="px-4 py-3">
              Nama
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Phone
            </th>
            <th scope="col" className="px-4 py-3">
              Wali Kelas
            </th>
            <th scope="col" className="px-4 py-3">
              Bidang Guru
            </th>
            <th scope="col" className="px-4 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 && isLoading ? (
            <tr className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
              <td
                colSpan={7}
                className="p-4 text-center font-medium whitespace-nowrap text-gray-800 dark:text-white"
              >
                <div className="flex items-center justify-center gap-2">
                  <LoadingCircle className="size-5 border-gray-800" />
                  Memuat data
                </div>
              </td>
            </tr>
          ) : teachers.length > 0 && !isLoading ? (
            teachers.map((teacher) => (
              <tr
                key={teacher.id}
                className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <td className="p-4 font-medium whitespace-nowrap text-gray-800 dark:text-white">
                  {teacher.nip}
                </td>
                <td className="flex items-center gap-2 p-4 font-medium whitespace-nowrap text-gray-800 dark:text-white">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                    <img
                      src={getAvatar(teacher.user.name.split(",")[0])}
                      alt={teacher.user.name}
                      className="h-full w-full"
                    />
                  </div>
                  {teacher.user.name}
                </td>
                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-white">
                  {teacher.user.email}
                </td>
                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-white">
                  {teacher.phone}
                </td>
                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-white">
                  X AKL 1
                </td>
                <td className="p-4 whitespace-nowrap text-gray-600 dark:text-white">
                  {teacher.subjects.name}
                </td>
                <td className="p-4 font-medium whitespace-nowrap text-gray-800 dark:text-white">
                  <div className="flex items-center">
                    <Link
                      href={`teachers/edit/${teacher.id}`}
                      title="Edit"
                      className="flex size-8 cursor-pointer items-center justify-center rounded-full text-blue-600 hover:text-blue-500"
                    >
                      <BsPencilSquare />
                    </Link>
                    <span className="h-6 w-px bg-gray-200"></span>
                    <button
                      type="button"
                      className="flex size-8 cursor-pointer items-center justify-center rounded-full text-red-600 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-b border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700">
              <td
                colSpan={7}
                className="p-4 text-center font-medium whitespace-nowrap text-gray-800 dark:text-white"
              >
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherTable;
