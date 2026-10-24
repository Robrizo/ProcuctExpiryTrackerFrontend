import { Calendar, CheckCircle2, Clock, RefreshCw, X } from "lucide-react";
import React, { useState } from "react";
import api from "../context/AuthContext";
import formatDate from "../utils/formatDate";

const NotificationsModal = ({
  onClose,
  isOpen,
  notifications = [],
  onRefresh,
}) => {
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  if (!isOpen) return null;

  const items = Array.isArray(notifications)
    ? notifications
    : Array.isArray(notifications?.notifications)
      ? notifications.notifications
      : [];

  const handleRunCheck = async () => {
    setIsRunningCheck(true);
    setCheckResult(null);
    try {
      const res = await api.post("/tasks/check-expiry");

      setCheckResult(res.data.message || "Check expiry complete");
      await onRefresh();
    } catch (err) {
      setCheckResult("Error running expiry check.");
    } finally {
      setIsRunningCheck(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Email Expiry Reminders
            </h3>
            <p className="text-xs text-gray-500">
              Automated 7-day expiry notification dispatch log
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-600">
            {items.length} reminder email
            {items.length === 1 ? "" : "s"} recorded
          </span>
          <button
            id="run-expiry-check-modal-btn"
            type="button"
            onClick={handleRunCheck}
            disabled={isRunningCheck}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRunningCheck ? "animate-spin" : ""}`}
            />
            <span>
              {isRunningCheck ? "Scanning..." : "Run Expiry Check Now"}
            </span>
          </button>
        </div>

        {checkResult && (
          <div className="mx-6 mt-3 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{checkResult}</span>
          </div>
        )}

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {items.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-700">
                No reminder emails sent yet
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Reminders are automatically sent to your email 7 days before
                items expire. Click "Run Expiry Check Now" above to trigger a
                scan of your products.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-colors text-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-semibold text-slate-900 text-sm">
                    {item.subject}
                  </span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(item.sent_at)}
                  </span>
                </div>

                <div className="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono text-[11px] whitespace-pre-line leading-relaxed">
                  {item.body}
                </div>

                <div className="flex items-center justify-between text-slate-500 pt-1 text-[11px]">
                  <span>To: {item.recipient}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" /> Dispatched
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
