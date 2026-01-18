export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <section className="h-screen">{children}</section>
    </main>
  );
}
