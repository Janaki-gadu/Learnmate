import axios from "axios";

const API = axios.create({
  baseURL: "https://learnmate-nvxq.onrender.com/api",
});

API.interceptors.request.use((req) => {
  let token = localStorage.getItem("token");

  if (!token) {
    const profile = localStorage.getItem("profile");
    if (profile) {
      try {
        const parsed = JSON.parse(profile);
        token = parsed?.token || parsed;
      } catch {
        token = profile;
      }
    }
  }

  if (token) {
    // Strip extra quotes if stringified
    const cleanToken = typeof token === "string" ? token.replace(/^"(.*)"$/, "$1") : token;
    req.headers.Authorization = `Bearer ${cleanToken}`;
  }

  return req;
});

export default API;