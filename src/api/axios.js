import axios from "axios";

// Shared API client for auth endpoints
const api = axios.create({
  baseURL: "https://lobster-app-ddwng.ondigitalocean.app/user",
  headers: {
    api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
  },
});

// Attach token when present (used after login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
