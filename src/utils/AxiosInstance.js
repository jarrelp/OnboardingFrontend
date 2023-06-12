import axios from "axios";
const BASE_URL = "http://192.168.178.32:8000";

export default axios.create({
  baseURL: BASE_URL,
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    withCredentials: true,
  },
});
