import { Bell, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ openNotifications, notificationsCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/logout");
  };
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <Link to={"/dashboard"}>
            <div className="text-blue-600 font-bold text-2xl/4">PET</div>
            <span className="hidden text-gray-600 text-sm sm:block">
              Product Expiry Tracker
            </span>
          </Link>

          {/* actions */}
          <div className="flex items-center space-x-2">
            {/* notifications */}
            <button
              onClick={openNotifications}
              type="button"
              title="Notifications"
              className="relative p-2 text-gray-00 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center text-white text-[10px] font-medium h-4 min-w-4 px-1 bg-amber-500 rounded-full">
                  {notificationsCount}
                </span>
              )}
            </button>

            {/* user info */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-300">
              <div className="w-8 h-8 bg-gray-200 font-medium text-gray-900 text-lg rounded-full flex items-center justify-center">
                {user.username.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col text-left">
                <span className="capitalize text-sm text-gray-800 leading-tight">
                  {user.username}
                </span>
                <span className="hidden sm:block text-[11px] text-gray-600 leading-tight">
                  {user.email}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              title="Logout"
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-rose-600 bg-rose-50 hover:text-rose-600 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
