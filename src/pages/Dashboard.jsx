import React from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back,{" "}
            <span className="capitalize">
              {user.first_name} {user.last_name}!
            </span>
          </h1>
        </div>
        <DashboardCard />
      </div>
    </div>
  );
};

export default Dashboard;
