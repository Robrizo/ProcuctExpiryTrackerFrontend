import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the saved JWT to every API request.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = Boolean(user);

  // Fetch the authenticated user's profile.
  const fetchUser = async () => {
    const response = await api.get("/user/me");
    return response.data;
  };

  // Restore the session when the application loads.
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await fetchUser();
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error("Failed to restore session:", err);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Log in a user.
  const login = async (username, password) => {
    setError(null);

    try {
      const response = await api.post("auth/login/", {
        username,
        password,
      });

      const accessToken = response.data.access_token || response.data.token;

      if (accessToken) {
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
      }

      // Use the returned profile or fetch it from the backend.
      let userData = response.data.user;

      if (!userData && accessToken) {
        const profileResponse = await api.get("/user/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        userData = profileResponse.data;
      }

      if (!userData) {
        throw new Error("The server did not return user information.");
      }

      setUser(userData);
      return userData;
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";

      setError(message);
      throw err;
    }
  };

  // Log out a user.
  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setError(null);
  };

  // Refresh the user's profile.
  const refreshUser = async () => {
    if (!localStorage.getItem("token")) {
      setUser(null);
      return;
    }

    try {
      const userData = await fetchUser();
      setUser(userData);
      setError(null);
    } catch (err) {
      const status = err.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }

      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Failed to refresh user.",
      );

      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        isAuthenticated,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
