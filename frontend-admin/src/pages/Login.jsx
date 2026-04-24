import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch {
      // toast handled in context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-dark">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/50">
        <div>
          <div className="mx-auto h-20 w-20 flex items-center justify-center mb-6">
            <img
              src="/pharma_logo.png"
              alt="Vinay Pharma Admin"
              className="h-30 w-40"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to Admin
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary shadow-lg transition duration-200"
              placeholder="Enter Admin Email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary shadow-lg transition duration-200"
              placeholder="********"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-8 border border-transparent text-lg font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-4 focus:ring-primary/50 transition duration-200 shadow-xl disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className="text-center">
            <Link
              to="/"
              className="text-primary hover:text-primary-dark font-medium transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
