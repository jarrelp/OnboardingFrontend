import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { THEME } from "../constants";

const Distance = ({ mode, style, ...props }) => {
  return (
    <>
      <PaperButton
        style={[styles.button, style]}
        labelStyle={[styles.text]}
        mode="outlined"
        disabled={true}
        {...props}
        loading={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: THEME.colors.surface,
    borderColor: THEME.colors.secondary,
  },
  text: {
    fontWeight: "bold",
    fontSize: 60,
    lineHeight: 60,
    color: THEME.colors.secondary,
  },
});

export default Distance;
