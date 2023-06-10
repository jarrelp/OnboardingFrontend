import { createContext, useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [tokenState, setTokenState] = useState(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(null);

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

  const onRegister = async (
    username,
    password
    // , firstname, lastname, email
  ) => {
    try {
      return await axios.post("/auth/users", {
        username,
        password,
        // firstname,
        // lastname,
        // email,
      });
    } catch (e) {
      return { error: true, msg: e.response };
    }
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

    axios.defaults.headers.common["Authorization"] = `Bearer ${result}`;

    await SecureStore.setItemAsync(TOKEN_KEY, result.data.access);

    return result;
    // } catch (e) {
    //   console.log("🔥 start login catch");
    //   return { error: true, msg: e.response };
    // }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

// const onLogin = async (
//   username,
//   password
//   // firstname, lastname, email
// ) => {
//   // try {
//   console.log("🔥 start login try");

//   // const result = await axios.post("/auth/jwt/create/", {
//   //   username,
//   //   password,
//   //   // firstname,
//   //   // lastname,
//   //   // email,
//   // });

//   let formData = "username=" + username + "&password=" + password;
//   console.log("🔥 ~ start request");
//   fetch("http://127.0.0.1:8000/auth/jwt/create/", {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: formData,
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.access) {
//         alert(JSON.stringify(response));
//         console.log(
//           "🔥 ~ file: AuthContext.js: 41 ~ onLogin ~ result:",
//           JSON.stringify(response)
//         );
//         setTokenState(response);
//       } else {
//         alert("Probeer het opnieuw");
//       }
//     })
//     .catch((error) => alert(error));

//   // console.log("🔥 ~ file: AuthContext.js: 41 ~ onLogin ~ result:", result);

//   // setTokenState(result.data.token);
//   setIsAuthenticatedState(true);

//   axios.defaults.headers.common[
//     "Authorization"
//   ] = `Bearer ${result.data.token}`;

//   await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

//   return result;
//   // } catch (e) {
//   //   console.log("🔥 start login catch");
//   //   return { error: true, msg: e.response };
//   // }
// };
