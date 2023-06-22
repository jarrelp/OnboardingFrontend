import React, { createContext, useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";
import * as SecureStore from "expo-secure-store";

import { MqttClient } from "../utils/MqttClient";

// 1
// import Paho from "paho-mqtt";

// const client = new Paho.Client(
//   "test.mosquitto.org", // test.mosquitto.org
//   1883,
//   `mqtt-onboarding-2-${parseInt(Math.random() * 100)}`
// );

// auth
const TOKEN_KEY = "my-jwt";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // document
  const [checkList, setCheckList] = useState([]);

  // mqtt

  // 1
  // useEffect(() => {
  //   // Subscribing to a topic
  //   mqttClient.subscribe("mqtt-onboarding-2/value", 0);

  //   return () => {
  //     // Unsubscribe and disconnect when the component unmounts
  //     mqttClient.unsubscribe("mqtt-onboarding-2/value");
  //     mqttClient.disconnect();
  //   };
  // }, []);

  // Publishing a message
  // useEffect(() => {
  //   publishMessage("mqtt-onboarding-2/value", checkList);
  // }, [checkList]);

  // 2
  // function onMessage(message) {
  //   if (message.destinationName === "mqtt-onboarding-2/value")
  //     setCheckList(parseInt(message.payloadString));
  // }

  // useEffect(() => {
  //   client.connect({
  //     onSuccess: () => {
  //       console.log("Connected!");
  //       client.subscribe("mqtt-onboarding-2/value");
  //       client.onMessageArrived = onMessage;
  //     },
  //     onFailure: () => {
  //       console.log("Failed to connect!");
  //     },
  //   });
  // }, []);

  // useEffect(() => {
  //   const message = new Paho.Message(checkList.toString());
  //   message.destinationName = "mqtt-onboarding-2/value";
  //   client.send(message);
  // }, [checkList]);

  // 3

  React.useEffect(() => {
    MqttClient.onConnect(onSuccess, onConnectionLost);
    onSubscribeHandler("mqtt-onboarding-2/value");
  }, []);

  const onSuccess = () => {
    console.info("Mqtt Connected");
  };

  const onConnectionLost = () => {
    console.info("Mqtt Fail to connect");
  };

  function onSubscribeHandler(subscribeTopic) {
    MqttClient.onSubscribe(subscribeTopic);
  }

  function onPublishHandler(publishTopic, publishPayload) {
    MqttClient.onPublish(publishTopic, publishPayload);
  }

  // Publishing a message
  useEffect(() => {
    onPublishHandler("mqtt-onboarding-2/value", checkList);
  }, [checkList]);

  // auth
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
