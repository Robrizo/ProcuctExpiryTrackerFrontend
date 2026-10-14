import { Package } from "lucide-react";
import React from "react";

const DashboardCard = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white p-4 sm:p-5 text-left border border-gray-300 shadow rounded-lg transition-all duration-150 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
          Total Products
        </span>
        <div className="p-2 rounded-lg bg-gray-200">
          <Package />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
          20
        </span>
        <span className="text-xs text-gray-600">items</span>
      </div>
    </button>
  );
};

export default DashboardCard;
