import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import JWT from "expo-jwt";

const TOKEN_KEY = "my-jwt";
export const API_URL = "https://api.developbetterapps.com";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthTokens(token);
        setUser(JWT.decode(token, TOKEN_KEY));
      }
    };
    loadToken();
  }, []);

  // login
  let loginUser = async (email, password) => {
    try {
      const result = await axios.post(`${baseURL}/auth/jwt/create`, {
        email,
        password,
      });

      console.log(
        "🔥 ~ file: AuthContext.js: 41 ~ loginUser ~ result:",
        result
      );

      setAuthTokens(result.data.access);
      // setIsAuthenticatedState(true);
      setUser(JWT.decode(result.data.access, TOKEN_KEY));

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.access}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);

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
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

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
      {/* {loading ? null : { children }} */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
