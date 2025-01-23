import axios from "axios";

export const API = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
