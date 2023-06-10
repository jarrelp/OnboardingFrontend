import axios from "axios";
const BASE_URL = "http://192.168.178.32:8000";

export default axios.create({
  baseURL: BASE_URL,
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Headers":
    //   "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    // "Access-Control-Allow-Credentials": true,
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
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
