import React from "react";
import { ShieldCheck, Clock, AlertTriangle } from "lucide-react";

export const StatusBadge = ({
  status,
  daysUntilExpiry,
  showIcon = true,
  size = "md",
}) => {
  let badgeStyles = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let Icon = ShieldCheck;
  let label = "Fresh";

  if (status === "Expiring Soon") {
    badgeStyles = "bg-amber-50 text-amber-800 border-amber-200";
    Icon = Clock;
    label = "Expiring Soon";
  } else if (status === "Expired") {
    badgeStyles = "bg-rose-50 text-rose-800 border-rose-200";
    Icon = AlertTriangle;
    label = "Expired";
  }

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-xs font-medium"
      : "px-2.5 py-1 text-xs sm:text-sm font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${badgeStyles} ${sizeClasses} whitespace-nowrap`}
    >
      {showIcon && (
        <Icon className={size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} />
      )}
      <span>{label}</span>
      {typeof daysUntilExpiry === "number" && (
        <span className="opacity-75 font-normal text-[11px] ml-0.5">
          (
          {daysUntilExpiry < 0
            ? `${Math.abs(daysUntilExpiry)}d ago`
            : daysUntilExpiry === 0
              ? "Today"
              : `${daysUntilExpiry}d left`}
          )
        </span>
      )}
    </span>
  );
};

export default StatusBadge
