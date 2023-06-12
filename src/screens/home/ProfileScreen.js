import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import axios from "../../utils/AxiosInstance";

import { IMAGES } from "../../constants";

const EditProfileView = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  // const [username, setUsername] = useState();

  const edit = async () => {
    const result = await axios.put("/auth/users/me/", {
      // username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
    if (result.error) {
      alert(result.msg);
    } else {
      console.log("Successfully edited");
    }
  };

  useEffect(() => {
    // response: "{ id: 1, username: "test", first_name: "test", last_name: "test", email: "test@gmail.com"}
    loadUser();
  }, []);

  const loadUser = async () => {
    let response = await axios.get("/auth/users/me/");
    console.log("🔥 ~ userdetails: ", response.data);
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
    setEmail(response.data.email);
    // setUsername(response.data.username);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={IMAGES.profile}></Image>
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={() => {
            /* open image picker */
          }}
        ></TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        {/* <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        /> */}
        <TouchableOpacity style={styles.button} onPress={edit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "80%",
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: "#1E90FF",
    fontSize: 18,
  },
});

export default EditProfileView;
