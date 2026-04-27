import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://backend-8ojo.onrender.com",
});

export default API;