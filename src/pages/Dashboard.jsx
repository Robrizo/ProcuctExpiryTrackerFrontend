import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {

  const { logout } = useAuth();
  return <div>
    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={logout}>
      logout  
    </button>
  </div>;
};

export default Dashboard;
