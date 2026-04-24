import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { admin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      await axios.put("/api/admin/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast.success("Password changed successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-24 bg-white rounded-3xl shadow-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
        Change Password
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Secure your admin account
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            required
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            required
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Re-enter Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-primary-dark transition shadow-xl disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
