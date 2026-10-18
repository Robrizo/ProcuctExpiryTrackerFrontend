import { Package } from "lucide-react";
import React from "react";

const DashboardCard = ({
  title,
  count,
  icon: Icon = Package,
  iconColor = "text-gray-900",
  iconBgColor = "bg-gray-200",
}) => {
  return (
    <div className="w-full bg-white p-4 sm:p-5 text-left border border-gray-300 shadow rounded-lg transition-all duration-150 group hover:border-gray-600">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
          {title}
        </span>
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">
          {count}
        </span>
        <span className="text-xs text-gray-600">items</span>
      </div>
    </div>
  );
};

export default DashboardCard;
