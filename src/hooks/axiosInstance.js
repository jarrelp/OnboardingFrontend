import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "my-jwt";
const baseURL = "http://127.0.0.1:8000";

let authTokens = AsyncStorage.getItem(TOKEN_KEY)
  ? JSON.parse(AsyncStorage.getItem(TOKEN_KEY))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = AsyncStorage.getItem(TOKEN_KEY)
      ? JSON.parse(AsyncStorage.getItem(TOKEN_KEY))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const user = jwt_decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
    refresh: authTokens.refresh,
  });

  AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
