import { AlertCircle, Edit2, Eye, Mail, MailCheck, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import formatDate from "../utils/formatDate";
import StatusBadge from "./StatusBadge";
import { useState } from "react";

const ProductTable = ({ products, onDelete, isLoading }) => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">
          No products found
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-6">
          There are no products matching your current filters or you haven't
          added any household items yet.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-800 mb-3"></div>
        <p className="text-sm text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-medium">
              <tr>
                <th className="py-3.5 px-4 font-semibold text-gray-700">
                  Product Name
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700">
                  Category
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700 text-center">
                  Qty
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700">
                  Expiry Date
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700 text-center">
                  Reminder
                </th>
                <th className="py-3.5 px-4 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  id={`product-row-${product.id}`}
                  className="hover:bg-gray-100 transition-colors group"
                >
                  {/* Name & Notes */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <Link
                        to={`/products/${product.id}`}
                        className="font-medium text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        {product.name}
                      </Link>
                      {product.notes && (
                        <span className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {product.notes}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {product.category || "General"}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="py-3.5 px-4 text-center font-medium text-gray-700">
                    {product.quantity}
                  </td>

                  {/* Expiry Date */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-gray-800 whitespace-nowrap">
                      {formatDate(product.expiry_date)}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <div>
                      <StatusBadge
                        status={product.status}
                        daysUntilExpiry={product.days_until_expiry}
                      />
                    </div>
                  </td>

                  {/* 7d Reminder indicator */}
                  <td className="py-3.5 px-4 text-center">
                    {product.reminder_sent ? (
                      <span
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                        title="Reminder email sent"
                      >
                        <MailCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Sent</span>
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md"
                        title="Reminder will send 7 days before expiry"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Scheduled</span>
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1">
                      <Link
                        id={`view-product-${product.id}`}
                        to={`/products/${product.id}`}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        id={`edit-product-${product.id}`}
                        to={`/products/${product.id}/edit`}
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        id={`delete-product-${product.id}`}
                        type="button"
                        onClick={() => setDeleteTarget(product)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 animate-in fade-in duration-150">
            <h4 className="text-lg font-semibold text-gray-900">
              Delete Product
            </h4>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                "{deleteTarget.name}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="confirm-delete-button"
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
