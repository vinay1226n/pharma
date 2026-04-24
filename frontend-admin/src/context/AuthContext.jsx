import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      loadAdmin(token);
    } else {
      setLoading(false);
    }
  }, []);

  const loadAdmin = async (token) => {
    try {
      const res = axios.get("/api/admin/me", {
        // Assume me route or use token
        headers: { Authorization: `Bearer ${token}` },
      });
      // For simplicity, use token
      setAdmin({ token });
    } catch {
      localStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      axios.defaults.headers.common["Authorization"] =
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
    delete axios.defaults.headers.common["Authorization"];
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
