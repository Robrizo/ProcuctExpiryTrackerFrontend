import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { Link } from "react-router";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl text-blue-600 font-bold">
              Welcome back,{" "}
              <span className="capitalize">
                {user.first_name} {user.last_name}!
              </span>
            </h1>
            <p className="text-gray-600 text-sm">
              Household inventory status and automated 7-day expiry monitoring
            </p>
          </div>

          {/* Add Product Button */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/products/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
