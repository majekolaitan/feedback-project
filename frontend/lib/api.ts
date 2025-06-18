import axios from "axios";
import { Feedback, ApiResponse } from "@/types";

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

export const feedbackApi = {
  getPublicFeedback: async (): Promise<ApiResponse<Feedback>> => {
    const response = await api.get("/feedback/");
    return response.data;
  },

  submitFeedback: async (feedback: {
    title: string;
    content: string;
  }): Promise<Feedback> => {
    const response = await api.post("/feedback/", feedback);
    return response.data;
  },
};

export default api;
