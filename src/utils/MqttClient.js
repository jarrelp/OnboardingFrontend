import { Alert } from "react-native";
import Paho from "paho-mqtt";

class MqttClient {
  constructor() {
    const clientId = "ReactNativeMqtt";
    this.client = new Paho.Client("test.mosquitto.org", 1883, clientId);
    this.client.onMessageArrived = this.onMessageArrived;
    this.callbacks = {};
    this.onSuccessHandler = undefined;
    this.onConnectionLostHandler = undefined;
    this.isConnected = false;
  }

  onConnect = (onSuccessHandler, onConnectionLostHandler) => {
    this.onSuccessHandler = onSuccessHandler;
    this.onConnectionLostHandler = onConnectionLostHandler;
    this.client.onConnectionLost = () => {
      this.isConnected = false;
      onConnectionLostHandler();
    };

    this.client.connect({
      timeout: 10,
      onSuccess: () => {
        this.isConnected = true;
        onSuccessHandler();
      },
      useSSL: false,
      onFailure: this.onError,
      reconnect: true,
      keepAliveInterval: 20,
      cleanSession: true,
    });
  };

  onError = ({ errorMessage }) => {
    console.log(errorMessage);
    this.isConnected = false;
    Alert.alert("Failed", "Failed to connect to MQTT", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Try Again",
        onPress: () =>
          this.onConnect(this.onSuccessHandler, this.onConnectionLostHandler),
      },
    ]);
  };

  onMessageArrived = (message) => {
    const { payloadString, topic } = message;
    console.log("onMessageArrived:", payloadString);
    this.callbacks[topic](payloadString);
  };

  onPublish = (topic, message) => {
    this.client.publish(topic, message);
  };

  onSubscribe = (
    topic
    // , callback
  ) => {
    // this.callbacks[topic] = callback;
    this.client.subscribe(topic);
  };

  unsubscribe = (topic) => {
    delete this.callbacks[topic];
    this.client.unsubscribe(topic);
  };
}

let client = new MqttClient();
export { client as MqttClient };

// import { Client, Message } from "react_native_mqtt";
// import { v4 as uuidv4 } from "uuid";

// const mqttClient = new Client({
//   uri: "mqtt://test.mosquitto.org:1883",
//   clientId: uuidv4(),
// });

// // Callbacks
// mqttClient.onConnect = () => {
//   console.log("Connected");
//   mqttClient.subscribe("mqtt-onboarding-2/value", 0);
// };

// mqttClient.onConnectionLost = (responseObject) => {
//   if (responseObject.errorCode !== 0) {
//     console.log(`Connection lost: ${responseObject.errorMessage}`);
//   }
// };

// mqttClient.onMessageArrived = (message) => {
//   console.log(`Message received: ${message.payloadString}`);
// };

// // Connect to the MQTT broker
// mqttClient.connect();

// // Publish a message
// const publishMessage = (topic, payload) => {
//   const message = new Message(payload);
//   message.destinationName = topic;
//   mqttClient.send(message);
// };

// export { mqttClient, publishMessage };
