import { AlertCircle, Eye, EyeClosed, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerSchema } from "../schemas/authSchema";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleFieldChange = (field, setter) => (e) => {
    setter(e.target.value);

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    const result = registerSchema.safeParse({
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await register({
        username: result.data.username,
        first_name: result.data.firstname,
        last_name: result.data.lastname,
        email: result.data.email,
        password: result.data.password,
      });

      navigate("/dashboard");
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (typeof detail === "string") {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(
          detail
            .map((item) => item.msg)
            .filter(Boolean)
            .join(", ") || "Please check your registration details.",
        );
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-900/10 focus:border-blue-600 transition-colors shadow-xs ${
      errors[field] ? "border-rose-500" : "border-slate-200"
    }`;

  const renderFieldError = (field) =>
    errors[field] && (
      <p
        id={`${field}-error`}
        className="mt-1 text-sm text-rose-600"
        role="alert"
      >
        {errors[field]}
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-xs">
          <div className="mb-6 text-center">
            <h1 className="text-3xl text-blue-600 font-bold">PET</h1>
            <p className="text-slate-600">Product Expiry Tracker</p>

            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
              Create an account
            </h2>

            <p className="mt-1.5 text-sm text-slate-500">
              Start tracking your household products
            </p>
          </div>

          {/* Backend/API error */}
          {error && (
            <div
              role="alert"
              className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister} noValidate>
            {/* Username */}
            <div>
              <label
                htmlFor="register-username-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Username
              </label>

              <input
                id="register-username-input"
                type="text"
                autoComplete="username"
                value={username}
                onChange={handleFieldChange("username", setUsername)}
                placeholder="Choose a username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={
                  errors.username ? "username-error" : undefined
                }
                className={inputClass("username")}
              />

              {renderFieldError("username")}
            </div>

            {/* Firstname */}
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
                autoComplete="given-name"
                value={firstname}
                onChange={handleFieldChange("firstname", setFirstname)}
                placeholder="e.g. John"
                aria-invalid={Boolean(errors.firstname)}
                aria-describedby={
                  errors.firstname ? "firstname-error" : undefined
                }
                className={inputClass("firstname")}
              />

              {renderFieldError("firstname")}
            </div>

            {/* Lastname */}
            <div>
              <label
                htmlFor="register-lastname-input"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Lastname
              </label>

              <input
                id="register-lastname-input"
                type="text"
                autoComplete="family-name"
                value={lastname}
                onChange={handleFieldChange("lastname", setLastname)}
                placeholder="e.g. Phiri"
                aria-invalid={Boolean(errors.lastname)}
                aria-describedby={
                  errors.lastname ? "lastname-error" : undefined
                }
                className={inputClass("lastname")}
              />

              {renderFieldError("lastname")}
            </div>

            {/* Email */}
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
                autoComplete="email"
                value={email}
                onChange={handleFieldChange("email", setEmail)}
                placeholder="name@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass("email")}
              />

              {renderFieldError("email")}

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
                  autoComplete="new-password"
                  value={password}
                  onChange={handleFieldChange("password", setPassword)}
                  placeholder="Minimum 6 characters"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  className={`${inputClass("password")} pr-10`}
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

              {renderFieldError("password")}
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
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={handleFieldChange(
                    "confirmPassword",
                    setConfirmPassword,
                  )}
                  placeholder="Re-enter password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword ? "confirmPassword-error" : undefined
                  }
                  className={`${inputClass("confirmPassword")} pr-10`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeClosed className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {renderFieldError("confirmPassword")}
            </div>

            {/* Submit */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
