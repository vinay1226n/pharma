import { createContext, useContext, useState, useEffect } from "react";
import API from "../api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadAdmin(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadAdmin = async (token) => {
    try {
      const res = await API.get("/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data);
    } catch {
      localStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await API.post("/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      API.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;
      setAdmin(res.data.admin);
      toast.success("Login successful!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    delete API.defaults.headers.common["Authorization"];
    setAdmin(null);
    toast.success("Logged out");
  };

  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
