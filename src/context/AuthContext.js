import { createContext, useEffect, useState } from "react";
import JWT from "expo-jwt";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
const baseURL = "http://127.0.0.1:8000";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(async () =>
    (await SecureStore.getItemAsync(TOKEN_KEY))
      ? JSON.parse(await SecureStore.getItemAsync(TOKEN_KEY))
      : null
  );
  let [user, setUser] = useState(async () =>
    (await SecureStore.getItemAsync(TOKEN_KEY))
      ? JWT.decode(await SecureStore.getItemAsync(TOKEN_KEY), TOKEN_KEY)
      : null
  );
  let [loading, setLoading] = useState(true);
  // const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync(TOKEN_KEY);
  //     console.log("stored: ", token);

  //     if (token) {
  //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //       setAuthTokens(token);
  //       setIsAuthenticatedState(true);
  //     }
  //   };
  //   loadToken();
  // }, []);

  // const onLogin = async (email, password) => {
  //   try {
  //     const result = await axios.post(`${baseURL}/auth`, { email, password });

  //     console.log("🔥 ~ file: AuthContext.js: 41 ~ onLogin ~ result:", result);

  //     setAuthTokens(result.data.token);
  //     setIsAuthenticatedState(true);

  //     axios.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${result.data.token}`;

  //     await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

  //     return result;
  //   } catch (e) {
  //     return { error: true, msg: e.response.data.msg };
  //   }
  // };

  let loginUser = async (email, password) => {
    try {
      const result = await axios.post(`${baseURL}/auth`, { email, password });

      console.log("🔥 ~ file: AuthContext.js: 41 ~ onLogin ~ result:", result);

      setAuthTokens(result.data.token);
      // setIsAuthenticatedState(true);
      setUser(JWT.decode(result.data.access));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);

      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  let logoutUser = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

    // Reset auth states
    setAuthTokens(null);
    setUser(null);
    // setIsAuthenticatedState(false);

    console.log("🔥 ~ logged out!");
  };

  let contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(JWT.decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
