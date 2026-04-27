import { Link } from "react-router-dom";
import API from "../api";

const buildImageUrl = (path) => {
  if (!path) return null;
  const base = API.defaults.baseURL?.replace(/\/$/, "") || "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return base ? `${base}${path}` : path;
  return base ? `${base}/${path}` : `/${path}`;
};

const ProductCard = ({ product }) => {
  const imageUrl = buildImageUrl(product.image);

  return (
    <Link
      to={`/products/${product._id}`}
      className="group block p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
    >
      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-6 overflow-hidden group-hover:scale-105 transition-transform">
        {product.image ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-lg">No Image</span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">
        {product.name}
      </h3>
      <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
        {product.description}
      </p>
      <div className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
        {product.category}
      </div>
    </Link>
  );
};

export default ProductCard;
