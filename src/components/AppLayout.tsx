import Sidebar from "./Sidebar";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
