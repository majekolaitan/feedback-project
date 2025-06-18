// lib/api.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include CSRF token
api.interceptors.request.use(async (config) => {
  if (config.method !== "get") {
    try {
      const tokenResponse = await axios.get(`${API_BASE_URL}/csrf/`, {
        withCredentials: true,
      });
      const csrfToken = tokenResponse.data.csrfToken;
      if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
      }
    } catch (error) {
      console.warn("Failed to get CSRF token:", error);
    }
  }
  return config;
});

export default api;
