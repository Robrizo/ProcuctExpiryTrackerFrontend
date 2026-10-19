import React from "react";
import { ArrowLeft, PackagePlus } from "lucide-react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import { Link } from "react-router";
import api from "../context/AuthContext";

const AddProductPage = () => {
  const handleCreate = async (productData) => {
    const res = await api.post("/products", productData);
    return res.data;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <Link
            id="back-to-dashboard-btn"
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Add Household Product
              </h1>
              <p className="text-sm text-gray-500">
                Record a new product and monitor its expiry timeline
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <ProductForm onSubmit={handleCreate} submitLabel="Add Product" />
        </div>
      </main>
    </div>
  );
};
export default AddProductPage;
