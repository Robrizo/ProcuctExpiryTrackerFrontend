import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Edit2,
  Mail,
  MailCheck,
} from "lucide-react";
import api from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import formatDate from "../utils/formatDate";

const ProductDetailPage = () => {
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

        {isLoading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-800 mb-3"></div>
            <p className="text-sm text-gray-500">Loading product details...</p>
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
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <StatusBadge
                    status={product.status}
                    daysUntilExpiry={product.days_until_expiry}
                  />
                </div>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-500">
                  <span className="px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-700">
                    {product.category}
                  </span>
                  <span>•</span>
                  <span>Quantity: {product.quantity}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2.5">
                <Link
                  id="detail-edit-product-btn"
                  to={`/products/${product.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </Link>
              </div>
            </div>

            {/* Information Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Purchase Date */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Purchase Date</span>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatDate(product.purchase_date)}
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Expiry Date</span>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatDate(product.expiry_date)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {product.days_until_expiry < 0
                      ? `Expired ${Math.abs(product.days_until_expiry)} days ago`
                      : product.days_until_expiry === 0
                        ? "Expires today"
                        : `${product.days_until_expiry} days remaining`}
                  </div>
                </div>
              </div>

              {/* Reminder status banner */}
              <div className="p-4 rounded-xl border border-gray-200 bg-white">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  7-Day Notification Status
                </h4>
                {product.reminder_sent ? (
                  <div className="flex items-start gap-3 text-emerald-800 bg-emerald-50/70 p-3.5 rounded-lg border border-emerald-200">
                    <MailCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Reminder Email Dispatched
                      </p>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        An email reminder was automatically delivered to your
                        registered email address 7 days before this product
                        expires.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 text-gray-700 bg-gray-50 p-3.5 rounded-lg border border-gray-200">
                    <Mail className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Automated Reminder Scheduled
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Our background expiry checker will dispatch an email
                        reminder to you exactly 7 days before{" "}
                        {formatDate(product.expiry_date)}.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {product.notes ? (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Storage Instructions & Notes
                  </h4>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                    {product.notes}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic">
                  No additional notes provided.
                </div>
              )}

              {/* Metadata */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Added on {formatDate(product.created_at)}</span>
                <span>Last updated {formatDate(product.updated_at)}</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductDetailPage;
