import axios from "axios";
import { auth } from "@/lib/firebase";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error getting auth token:", error);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export const paymentAPI = {
  processPayment: async (amount: number, orderId: string, email: string, phone: string) => {
    const response = await apiClient.post("/payments/process", {
      amount,
      orderId,
      email,
      phone,
    });
    return response.data;
  },
};

export const eventsAPI = {
  getAll: async () => {
    const response = await apiClient.get("/events");
    return response.data;
  },
  create: async (eventData: any) => {
    const response = await apiClient.post("/events", eventData);
    return response.data;
  },
};

export default apiClient;
