import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

const ProductDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
      </main>
    </div>
  );
};

export default ProductDetailPage;
