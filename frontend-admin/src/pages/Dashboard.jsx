import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    description: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.category);
    data.append("name", formData.name);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);

    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, data);
        toast.success("Product updated!");
      } else {
        await axios.post("/api/products", data);
        toast.success("Product added!");
      }
      setFormData({ category: "", name: "", description: "", image: null });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      category: product.category,
      name: product.name,
      description: product.description,
      image: null,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-600 mt-2">Add, edit, and delete products</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition shadow-xl"
        >
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 border border-gray-100">
          <h2 className="text-2xl font-bold mb-8">
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 resize-vertical"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Product Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg file:mr-6 file:py-3 file:px-6 file:rounded-xl file:border-0 file:bg-primary file:text-white file:font-bold hover:file:bg-primary-dark"
              />
              <p className="text-sm text-gray-500 mt-1">
                Max 5MB. JPG, PNG supported
              </p>
            </div>
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-4 px-8 rounded-2xl font-bold hover:bg-primary-dark transition shadow-xl"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      category: "",
                      name: "",
                      description: "",
                      image: null,
                    });
                  }}
                  className="flex-1 bg-gray-500 text-white py-4 px-8 rounded-2xl font-bold hover:bg-gray-600 transition shadow-xl"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">
            Products ({products.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-8 py-12 text-center text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-8 py-6">
                      <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img
                            src={`http://localhost:5000${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          "No Image"
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-6 font-medium text-gray-900 max-w-md truncate">
                      {product.name}
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-gray-600 max-w-lg truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-6 text-sm text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm bg-red-50 px-4 py-2 rounded-xl hover:bg-red-100 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
