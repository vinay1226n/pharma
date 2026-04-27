import { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const base = API.defaults.baseURL?.replace(/\/$/, "") || "";
      let res;
      if (!searchTerm && !category) {
        res = await API.get(`${base}/api/products`);
      } else {
        const params = new URLSearchParams();
        if (searchTerm) params.append("q", searchTerm);
        if (category) params.append("category", category);
        res = await API.get(`${base}/api/products/search?${params}`);
      }
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load products. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Antibiotics",
    "Vitamins",
    "Pain Relief",
    "Digestive",
    "Skin Care",
  ]; // Sample

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-6">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our wide range of pharmaceutical products
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col lg:flex-row gap-6 justify-center items-center">
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-96 px-6 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none text-lg"
            onKeyPress={(e) => e.key === "Enter" && fetchProducts()}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full lg:w-64 px-6 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={fetchProducts}
            className="bg-primary text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-primary-dark transition shadow-lg"
          >
            Search
          </button>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-2xl text-red-500">{error}</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ${products.length === 0 ? "text-center py-20" : ""}`}
          >
            {products.length === 0 ? (
              <p className="col-span-full text-2xl text-gray-500">
                No products found. Try different search terms.
              </p>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
