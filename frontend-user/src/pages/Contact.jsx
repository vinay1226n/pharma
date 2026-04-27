import { useState } from "react";
import API from "../api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setStatus("");
      await API.post("/api/contact", formData);
      setStatus("Message sent successfully! We will contact you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team for inquiries
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Cladian Pharma
              </h3>
              <p className="text-gray-600">
                We are here to help with all your pharmaceutical needs.
              </p>
            </div>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p>www.cladianpharma@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>+91 7702108616</p>
                  <p>+91 9885108616</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {status && (
              <div
                className={`p-4 rounded-xl ${status.includes("success") ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}
              >
                {status}
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition resize-vertical"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-5 px-8 rounded-2xl font-bold text-lg hover:bg-primary-dark transition shadow-xl disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
