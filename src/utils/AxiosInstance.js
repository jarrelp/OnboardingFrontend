import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import JWT from "expo-jwt";
import dayjs from "dayjs";

const TOKEN_KEY = "my-jwt";
const baseURL = "http://127.0.0.1:8000";

const authTokens = async () =>
  (await AsyncStorage.getItem(TOKEN_KEY))
    ? JSON.parse(await AsyncStorage.getItem(TOKEN_KEY))
    : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = (await AsyncStorage.getItem(TOKEN_KEY))
      ? JSON.parse(await AsyncStorage.getItem(TOKEN_KEY))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const user = JWT.decode(authTokens.access, TOKEN_KEY);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
    refresh: authTokens.refresh,
  });

  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(response.data));

  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
