import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  UserCircle,
  FileText,
  TrendingUp,
  ArrowLeftRight,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Menu,
  X
} from "lucide-react";

// Mock auth context for demo
const mockUser = {
  role: "CLUB_ADMIN",
  name: "John Doe",
  email: "john@example.com"
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = mockUser;

  if (!user) return null;

  const superAdminLinks = [
    { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: "/admin/clubs", label: "Clubs", icon: <Building2 className="w-5 h-5" /> },
    { to: "/admin/users", label: "Users", icon: <Users className="w-5 h-5" /> }
  ];

  const clubAdminLinks = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { to: "/players", label: "Players", icon: <UserCircle className="w-5 h-5" /> },
    { to: "/contracts", label: "Contracts", icon: <FileText className="w-5 h-5" /> },
    { to: "/loans", label: "Loans", icon: <TrendingUp className="w-5 h-5" /> },
    { to: "/transfers", label: "Transfers", icon: <ArrowLeftRight className="w-5 h-5" /> },
    { to: "/club/settings", label: "Club Settings", icon: <Settings className="w-5 h-5" /> }
  ];

  const links = user.role === "SUPER_ADMIN" ? superAdminLinks : clubAdminLinks;

  const handleLogout = () => {
    console.log("Logging out...");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white
          flex flex-col shadow-2xl z-40 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo / Title */}
        <div className="relative p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold truncate">Football SaaS</h1>
                <p className="text-xs text-gray-400 truncate">Management System</p>
              </div>
            )}
          </div>

          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-gray-700 hover:bg-gray-600 rounded-full items-center justify-center border-2 border-gray-900 transition"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-4 border-b border-gray-700/50">
            <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-2 px-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                {user.role === "SUPER_ADMIN" ? "Super Admin" : "Club Admin"}
              </span>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {!isCollapsed && (
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Navigation
            </p>
          )}
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              label={link.label}
              icon={link.icon}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50 space-y-2">
          {!isCollapsed && (
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition group">
              <Settings className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 
              bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white 
              rounded-lg transition group
              ${isCollapsed ? 'justify-center' : ''}
            `}
            title={isCollapsed ? "Logout" : ""}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function SidebarLink({
  to,
  label,
  icon,
  isCollapsed
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  isCollapsed: boolean;
}) {
  // Simulating active state (you'll use NavLink's isActive in real implementation)
  const isActive = to === "/";

  return (
    <a
      href={to}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg transition group relative
        ${isActive
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
      title={isCollapsed ? label : ""}
    >
      <div className={`flex-shrink-0 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`}>
        {icon}
      </div>
      {!isCollapsed && (
        <span className="text-sm font-medium">{label}</span>
      )}
      {isActive && !isCollapsed && (
        <div className="absolute right-3 w-2 h-2 bg-white rounded-full" />
      )}
    </a>
  );
}