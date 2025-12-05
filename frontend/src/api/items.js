import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const createItem = (data) => API.post("/api/v1/items", data);
export const getItems = () => API.get("/api/v1/items");
export const updateItem = (id, data) => API.put(`/api/v1/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/api/v1/items/${id}`);
