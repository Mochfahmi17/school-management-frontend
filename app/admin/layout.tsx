import Sidebar from "@/components/admin/sidebar/Sidebar";
import NavbarView from "@/components/navbar/NavbarView";

export default function AdminPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto h-screen bg-white">
        <NavbarView />
        {children}
      </main>
    </div>
  );
}
