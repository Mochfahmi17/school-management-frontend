import Sidebar from "@/components/admin/sidebar/Sidebar";

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {children}
    </div>
  );
}
