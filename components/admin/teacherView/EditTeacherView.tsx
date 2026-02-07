import { SingleUserTeacherResponse } from "@/types";
import EditTeacherForm from "./EditTeacherForm";
import { cookies } from "next/headers";

type EditTeacherViewProps = {
  id: string;
};

async function getTeacherData(teacherId: string) {
  const cookieStore = cookies();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher/${teacherId}`,
    {
      method: "GET",
      headers: { Cookie: (await cookieStore).toString() },
      cache: "no-store",
    },
  );

  const data: SingleUserTeacherResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch sigle data teacher.");
  }

  return data;
}

const EditTeacherView = async ({ id }: EditTeacherViewProps) => {
  const teacher = await getTeacherData(id);

  return (
    <section className="py-3 md:py-8 dark:bg-gray-900">
      <div className="px-[2%]">
        <div className="mb-6 border-b border-b-gray-200 pb-2">
          <h2 className="text-2xl font-semibold">Edit Data Guru</h2>
          <p className="mt-1 text-sm text-gray-600">
            Lengkapi form di bawah untuk mengedit guru.
          </p>
        </div>

        {/* Form */}
        <EditTeacherForm initialData={teacher.teacher} />
      </div>
    </section>
  );
};

export default EditTeacherView;
