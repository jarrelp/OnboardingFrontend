import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { IMAGES } from "../../constants";

const EditProfileView = () => {
  const profile = {
    name: "Bert",
    username: "Bert.Jansen@gmail.com",
    password: "geheim",
    avatar: "https://example.com/jane-doe-avatar.png",
  };
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState(profile.password);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={IMAGES.profile}></Image>
        <TouchableOpacity
          style={styles.changeAvatarButton}
          onPress={() => {
            /* open image picker */
          }}
        >
          <Text style={styles.changeAvatarButtonText}>
            Change Profile Image
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit({ name, username, password, avatar })}
        >
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
