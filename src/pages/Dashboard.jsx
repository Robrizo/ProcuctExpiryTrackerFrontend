import React, { useEffect, useMemo, useState } from "react";
import api, { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import { Link } from "react-router";
import { AlertTriangle, Clock, Filter, Plus, ShieldCheck } from "lucide-react";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import Swal from "sweetalert2";
import NotificationsModal from "../components/NotificationsModal";

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

  // fetch notification
  const fetchNotifications = async () => {
    try {
      const logs = await api.get("/notifications/logs");
      setNotifications(logs.data);
    } catch (error) {
      console.error("Failed to load notifications", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchNotifications();
  }, []);

  // delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Product deleted",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to delete product",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

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

  // get categories
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [products]);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Status filter
      if (statusFilter === "expiring" && product.status !== "Expiring Soon")
        return false;
      if (statusFilter === "expired" && product.status !== "Expired")
        return false;
      if (statusFilter === "fresh" && product.status !== "Fresh") return false;

      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory)
        return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesNotes = product.notes?.toLowerCase().includes(q) || false;
        if (!matchesName && !matchesCategory && !matchesNotes) return false;
      }

      return true;
    });
  }, [products, statusFilter, selectedCategory, searchQuery]);
  return (
    <div className="min-h-screen bg-gray-100 pb-8">
      <Navbar
        openNotifications={() => setIsNotificationsOpen(true)}
        notificationsCount={notifications.length}
      />
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
              to="/products/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* stats cards */}
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

        {/* search and filter */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Dropdown */}
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600 shrink-0" />
                <select
                  id="category-filter-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-white border border-gray-200 text-sm text-gray-700 py-2.5 px-3 rounded-lg focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Status Filter Pill Tabs */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-gray-100 overflow-x-auto text-xs pb-1 sm:pb-0">
            <span className="text-gray-600 font-medium mr-1.5 shrink-0">
              Filter:
            </span>
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === "all"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({metrics.total})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("fresh")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === "fresh"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              Fresh ({metrics.fresh})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("expiring")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === "expiring"
                  ? "bg-amber-600 text-white"
                  : "bg-amber-50 text-amber-800 hover:bg-amber-100"
              }`}
            >
              Expiring Soon ({metrics.expiringSoon})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("expired")}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer shrink-0 ${
                statusFilter === "expired"
                  ? "bg-rose-600 text-white"
                  : "bg-rose-50 text-rose-800 hover:bg-rose-100"
              }`}
            >
              Expired ({metrics.expired})
            </button>
          </div>
        </div>

        {/* Product listing */}
        <div>
          <ProductTable
            products={filteredProducts}
            isLoading={isLoading}
            onDelete={handleDeleteProduct}
          />
        </div>
      </main>

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onRefresh={fetchNotifications}
      />
    </div>
  );
};

export default Dashboard;
