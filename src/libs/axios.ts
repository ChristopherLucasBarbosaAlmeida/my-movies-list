import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  params: {
    language: "pt-br",
  },
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
