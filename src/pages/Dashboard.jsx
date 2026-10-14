import React, { useEffect, useMemo, useState } from "react";
import api, { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { Link } from "react-router";
import { AlertTriangle, Clock, Plus, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // fetch products
  const fetchProducts = async () => {
    setIsLoading(true);

    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // metrics calculation
  const metrics = useMemo(() => {
    const total = products.length;
    const expiringSoon = products.filter(
      (p) => p.status === "Expiring Soon",
    ).length;
    const expired = products.filter((p) => p.status === "Expired").length;
    const fresh = products.filter((p) => p.status === "Fresh").length;

    return { total, expiringSoon, expired, fresh };
  }, [products]);
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
          <DashboardCard title={"Total Products"} count={metrics.total} />
          <DashboardCard
            title={"Expiring Soon"}
            icon={Clock}
            count={metrics.expiringSoon}
            iconColor="text-amber-900"
            iconBgColor="bg-amber-100"
          />
          <DashboardCard
            title={"Expired"}
            icon={AlertTriangle}
            count={metrics.expired}
            iconColor="text-rose-900"
            iconBgColor="bg-rose-100"
          />
          <DashboardCard
            title={"Fresh"}
            icon={ShieldCheck}
            count={metrics.fresh}
            iconColor="text-emerald-900"
            iconBgColor="bg-emerald-100"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
