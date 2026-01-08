import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`transition-all duration-300 pt-0 ${isCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
        {children}
      </main>
    </div>
  );
}
