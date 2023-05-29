import axios from "axios";
import JWT from "expo-jwt";
import dayjs from "dayjs";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
const baseURL = "http://127.0.0.1:8000";

let authTokens = (await SecureStore.getItemAsync(TOKEN_KEY))
  ? JSON.parse(await SecureStore.getItemAsync(TOKEN_KEY))
  : null;

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = (await SecureStore.getItemAsync(TOKEN_KEY))
      ? JSON.parse(await SecureStore.getItemAsync(TOKEN_KEY))
      : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }

  const user = JWT.decode(authTokens.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/api/token/refresh/`, {
    refresh: authTokens.refresh,
  });

  await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${response.data.access}`;
  return req;
});

export default axiosInstance;
