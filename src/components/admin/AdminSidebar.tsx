import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  BarChart,
  Image,
} from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/admin" },
    { icon: <Users size={20} />, label: "Clients", path: "/admin/clients" },
    {
      icon: <Calendar size={20} />,
      label: "Schedule",
      path: "/admin/schedule",
    },
    {
      icon: <FileText size={20} />,
      label: "Programs",
      path: "/admin/programs",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      path: "/admin/messages",
    },
    { icon: <Image size={20} />, label: "Media", path: "/admin/media" },
    {
      icon: <BarChart size={20} />,
      label: "Analytics",
      path: "/admin/analytics",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="w-64 bg-gray-800 dark:bg-gray-950 text-white h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Coach Ibra</h2>
        <p className="text-gray-400 text-sm">Administration</p>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-6 border-t border-gray-700">
        <div className="space-y-2">
          <Link
            to="/"
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Website
          </Link>
          <Link
            to="/login"
            className="flex items-center text-gray-300 hover:text-white transition-colors mt-2"
          >
            <span className="mr-2">→</span>
            Logout
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
