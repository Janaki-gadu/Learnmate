import axios from "axios";

const API = axios.create({
  baseURL: "https://learnmate-nvxq.onrender.com/api",
});

// Interceptor to attach JWT token to every request if present
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    const parsed = JSON.parse(profile);
    const token = parsed?.token || parsed;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;