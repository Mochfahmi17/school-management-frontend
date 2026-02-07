import EditTeacherView from "@/components/admin/teacherView/EditTeacherView";
import { notFound } from "next/navigation";

export default async function EditTeachersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const teacherId = (await params).id;

  if (!teacherId) return notFound();

  return <EditTeacherView id={teacherId} />;
}
