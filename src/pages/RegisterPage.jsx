import { AlertCircle, Eye, EyeClosed, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-xs">
          <div className="mb-6 sm:mx-auto sm:w-full sm:max-w-md text-center">
            <div className="flex flex-col items-center justify-center text-white mx-auto">
              <h1 className="text-3xl text-blue-600 font-bold">PET</h1>
              <p className="text-slate-600">Product Expiry Tracker</p>
            </div>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Create an account
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Start tracking your household products
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4">
            <div>
              <label
                htmlFor="register-firstname-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Firstname
              </label>

              <input
                id="register-firstname-input"
                type="text"
                required
                placeholder="e.g. john"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
              />
            </div>

            <div>
              <label
                htmlFor="register-surname-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Surname
              </label>

              <input
                id="register-surname-input"
                type="text"
                required
                placeholder="e.g. phiri"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
              />
            </div>

            <div>
              <label
                htmlFor="register-email-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email address
              </label>

              <input
                id="register-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
              />

              <p className="text-[11px] text-slate-500 mt-1">
                Reminders 7 days before product expiry will be sent here.
              </p>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="register-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2.5 pr-10 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeClosed className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="register-confirm-password-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="register-confirm-password-input"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full px-3.5 py-2.5 pr-10 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeClosed className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-60"
            >
              <UserPlus className="w-4 h-4" />

              <span>
                {isLoading ? "Creating account..." : "Create Account"}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              id="register-login-link"
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
