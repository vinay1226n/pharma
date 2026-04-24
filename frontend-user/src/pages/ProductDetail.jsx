import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/products`);
      const found = res.data.find((p) => p._id === id);
      setProduct(found || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="py-24 min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <a
            href="/products"
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-dark transition"
          >
            Back to Products
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <a
          href="/products"
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium mb-8"
        >
          ← Back to Products
        </a>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-xl">
                  No Image Available
                </span>
              )}
            </div>
          </div>
          <div>
            <div className="bg-secondary/10 rounded-2xl p-6 inline-block mb-8">
              <span className="text-secondary font-bold text-lg px-4 py-2 bg-white rounded-xl">
                {product.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
              <span>ID: {product._id.slice(-6)}</span>
              <span>
                Created: {new Date(product.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-primary text-white py-4 px-8 rounded-2xl font-bold hover:bg-primary-dark transition shadow-lg">
                Contact for Quote
              </button>
              <button className="border-2 border-primary text-primary py-4 px-8 rounded-2xl font-bold hover:bg-primary hover:text-white transition shadow-lg">
                Add to List
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
