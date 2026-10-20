import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Edit3, AlertTriangle } from "lucide-react";
import api from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

const EditProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(err.response?.data?.detail || "Product not found.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleUpdate = async (productData) => {
    if (!id) return;
    await api.put(`/products/${id}`, productData);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6">
          <Link
            id="back-to-details-btn"
            to={"/dashboard"}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Edit Product
              </h1>
              <p className="text-sm text-gray-500">
                Update product details or adjust expiry date
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-800 mb-3"></div>
            <p className="text-sm text-gray-500">
              Loading product information...
            </p>
          </div>
        ) : error || !product ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
            <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-gray-900">
              {error || "Product not found"}
            </h3>
            <Link
              to="/dashboard"
              className="mt-4 inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg text-sm"
            >
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-xs">
            <ProductForm
              initialValues={{
                name: product.name,
                category: product.category,
                quantity: product.quantity,
                purchase_date: product.purchase_date,
                expiry_date: product.expiry_date,
                notes: product.notes,
              }}
              onSubmit={handleUpdate}
              submitLabel="Save Changes"
              isEdit={true}
            />
          </div>
        )}
      </main>
    </div>
  );
};
export default EditProductPage;
