import { createContext, useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import JWT from "expo-jwt";

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(async () =>
    (await AsyncStorage.getItem(TOKEN_KEY))
      ? JSON.parse(await AsyncStorage.getItem(TOKEN_KEY))
      : null
  );
  const [user, setUser] = useState(async () =>
    (await AsyncStorage.getItem(TOKEN_KEY))
      ? jwt_decode(await AsyncStorage.getItem(TOKEN_KEY))
      : null
  );
  const [loading, setLoading] = useState(true);

  // login
  let loginUser = async (email, password) => {
    try {
      const result = await axios.post(`${baseURL}/auth/jwt/create`, {
        email,
        password,
      });

      const data = await response.json();

      console.log("🔥 ~ file: AuthContext.js: 41 ~ loginUser ~ result:", data);

      setAuthTokens(data);

      setUser(JWT.decode(data.access, TOKEN_KEY));

      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(data));

      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  // const loginUser = async (email, password) => {
  //   try {
  //     const result = await axios.post(`${API_URL}/auth`, { email, password });

  //     console.log("🔥 ~ file: AuthContext.js: 41 ~ loginUser ~ result:", result);

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

  const logoutUser = async () => {
    // Delete token from storage
    await AsyncStorage.removeItem(TOKEN_KEY);

    // Reset auth states
    setAuthTokens(null);
    setUser(null);

    console.log("🔥 ~ logged out!");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(JWT.decode(authTokens.access, TOKEN_KEY));
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
