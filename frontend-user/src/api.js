import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL || "https://backen-0dos.onrender.com",
});

export default API;
