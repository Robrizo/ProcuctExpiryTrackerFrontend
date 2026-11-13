import { Bell, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ openNotifications, notificationsCount = 0 }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const username = user?.username || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full ${
          isAuthenticated
            ? "bg-white shadow"
            : "bg-white/80 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo */}
            <Link
              to={isAuthenticated ? "/dashboard" : "/"}
              className="flex flex-col shrink-0"
            >
              <span className="text-blue-600 font-bold text-2xl leading-none">
                PET
              </span>
              <span className="hidden sm:block text-gray-600 text-xs mt-1">
                Product Expiry Tracker
              </span>
            </Link>

            {/* Public Navigation */}
            {!isAuthenticated && (
              <>
                <nav className="hidden sm:block">
                  <ul className="flex items-center gap-4 md:gap-6 text-sm text-gray-600">
                    <li className="hover:text-blue-600 transition-colors">
                      <a href="#feature">Features</a>
                    </li>
                    <li className="hover:text-blue-600 transition-colors">
                      <a href="#itworks">How It Works</a>
                    </li>
                  </ul>
                </nav>

                <Link
                  to="/login"
                  className="shrink-0 px-4 py-2.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Authenticated Actions */}
            {isAuthenticated && (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Notifications */}
                <button
                  onClick={openNotifications}
                  type="button"
                  title="Notifications"
                  aria-label={`Notifications (${notificationsCount})`}
                  className="relative shrink-0 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5" />

                  {notificationsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-white text-[10px] font-medium h-4 min-w-4 px-1 bg-amber-500 rounded-full">
                      {notificationsCount}
                    </span>
                  )}
                </button>

                {/* User Information */}
                <div className="flex items-center gap-2 pl-2 border-l border-gray-300 min-w-0">
                  <div className="shrink-0 w-8 h-8 bg-gray-200 font-medium text-gray-900 text-sm rounded-full flex items-center justify-center">
                    {initial}
                  </div>

                  <div className="hidden sm:flex flex-col min-w-0">
                    <span className="capitalize text-sm text-gray-800 leading-tight truncate max-w-32">
                      {username}
                    </span>

                    <span className="hidden md:block text-[11px] text-gray-600 leading-tight truncate max-w-40">
                      {user?.email}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <button
                  title="Logout"
                  aria-label="Logout"
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex shrink-0 items-center gap-1.5 px-2 sm:px-3 py-2 text-sm text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
