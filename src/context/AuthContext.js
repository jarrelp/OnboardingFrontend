import { createContext, useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [tokenState, setTokenState] = useState(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);

  // document
  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored: ", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setTokenState(token);
        setIsAuthenticatedState(true);
      }
    };
    loadToken();
  }, []);

  const onRegister = async (username, password, firstName, lastName, email) => {
    return await axios.post("/auth/users/", {
      username,
      password,
      firstName,
      lastName,
      email,
    });
  };

  const onLogin = async (username, password) => {
    // try {
    console.log("🔥 start login try");

    const result = await axios.post("/auth/jwt/create/", {
      username,
      password,
    });

    console.log("🔥 ~ file: AuthContext.js: 41 ~ onLogin ~ result:", result);

    setTokenState(result.data.access);
    setIsAuthenticatedState(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `JWT ${result.data.access}`;

    await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);

    return result;
  };

  const onLogout = async () => {
    // Delete token from storage
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    // Update HTTP Headers
    axios.defaults.headers.common["Authorization"] = "";

    // Reset auth states
    setTokenState(null);
    setIsAuthenticatedState(false);

    console.log("🔥 ~ logged out!");
  };

  return (
    <AuthContext.Provider
      value={{
        onRegister,
        onLogin,
        onLogout,
        tokenState,
        isAuthenticatedState,
        checkList,
        setCheckList,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
