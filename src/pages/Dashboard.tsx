import { useEffect, useState } from "react";
import { 
  Users, 
  Trophy, 
  Building2, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Calendar,
  Search,
  Bell,
  Settings,
  ChevronDown,
  MoreVertical
} from "lucide-react";
import { fetchAdminDashboard } from "../api/admin.api";

type AdminDashboardData = {
  stats: {
    totalClubs: number;
    totalUsers: number;
    totalPlayers: number;
  };
  recentClubs: any[];
  recentTransfers: any[];
};

export default function Dashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    fetchAdminDashboard().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen w-full flex-1  bg-gray-50 flex flex-col items-start justify-start p-6">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-5 w-full">
        <div className="w-full px-0 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                Admin
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Settings */}
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                <Settings className="w-5 h-5" />
              </button>
              
              {/* User Profile */}
              <button className="flex items-center space-x-3 pl-3 pr-2 py-2 hover:bg-gray-100 rounded-lg transition">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">AD</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full p-6 space-y-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
              <p className="text-blue-100">Here's what's happening with your platform today.</p>
            </div>
          {/*   <div className="hidden md:flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Last 7 days</span>
              <ChevronDown className="w-4 h-4" />
            </div> */}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            label="Total Clubs"
            value={data.stats.totalClubs}
            change={12}
            icon={<Building2 className="w-6 h-6" />}
            color="blue"
          />
          <StatCard
            label="Total Users"
            value={data.stats.totalUsers}
            change={8.2}
            icon={<Users className="w-6 h-6" />}
            color="green"
          />
          <StatCard
            label="Total Players"
            value={data.stats.totalPlayers}
            change={-3.1}
            icon={<Trophy className="w-6 h-6" />}
            color="purple"
          />
       {/*    <StatCard
            label="Active Transfers"
            value={156}
            change={15.3}
            icon={<Activity className="w-6 h-6" />}
            color="orange"
          /> */}
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clubs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recently Added Clubs</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentClubs.map((club, index) => (
                  <div 
                    key={club.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {club.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{club.name}</p>
                        <p className="text-sm text-gray-500">{club.country}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Transfers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transfers</h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {data.recentTransfers.map((transfer) => (
                  <div 
                    key={transfer.id} 
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-gray-900">{transfer.player}</p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          transfer.status === 'completed' 
                            ? 'bg-green-100 text-green-700' 
                            : transfer.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {transfer.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {transfer.from} → {transfer.to}
                      </p>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className="text-xs text-gray-400">{transfer.transferType}</span>
                        <span className="text-xs font-semibold text-gray-700">{transfer.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton icon={<Building2 />} label="Add Club" />
            <QuickActionButton icon={<Users />} label="Add User" />
            <QuickActionButton icon={<Trophy />} label="Add Player" />
            <QuickActionButton icon={<Activity />} label="New Transfer" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, change, icon, color }: {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}) {
  const isPositive = change >= 0;
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg transition group">
      <div className="text-gray-400 group-hover:text-blue-600 transition mb-2">
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
        {label}
      </span>
    </button>
  );
}