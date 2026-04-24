import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser } from "react-icons/fi";

const AdminNavbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg border-b border-primary/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/pharma_logo.png"
            alt="Cladian Pharma Admin"
            className="h-12"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">
            Dashboard
          </Link>
          <Link
            to="/change-password"
            className="text-gray-700 hover:text-primary font-medium"
          >
            Change Password
          </Link>
          <div className="flex items-center space-x-3 p-2 rounded-xl bg-gray-100">
            <FiUser className="text-xl text-gray-600" />
            <span className="font-medium text-gray-900">{admin.email}</span>
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
