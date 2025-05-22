import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:5050", // or env var
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
