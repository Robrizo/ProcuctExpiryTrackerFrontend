import { AlertCircle, Eye, EyeClosed, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login, error } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
              Sign in to your account
            </h2>
          </div>
          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span></span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="login-username-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Username
              </label>
              <input
                id="login-username-input"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
              />
            </div>

            <div>
              <label
                htmlFor="login-password-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-700 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeClosed className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-60"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? "Signing in..." : "Sign in"}</span>
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              id="login-register-link"
              to="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
