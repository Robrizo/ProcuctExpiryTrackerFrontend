import React from "react";
import { ShieldCheck, Clock, AlertTriangle } from "lucide-react";

export const StatusBadge = ({
  status,
  daysUntilExpiry,
  showIcon = true,
  size = "md",
}) => {
  let badgeStyles = "text-emerald-800";
  let Icon = ShieldCheck;
  let label = "Fresh";

  if (status === "Expiring Soon") {
    badgeStyles = "text-amber-800";
    Icon = Clock;
    label = "Expiring Soon";
  } else if (status === "Expired") {
    badgeStyles = "text-rose-800";
    Icon = AlertTriangle;
    label = "Expired";
  }

  const sizeClasses =
    size === "sm"
      ? "py-0.5 text-xs font-medium"
      : "py-1 text-xs sm:text-sm font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ${badgeStyles} ${sizeClasses} whitespace-nowrap`}
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

export default StatusBadge;
