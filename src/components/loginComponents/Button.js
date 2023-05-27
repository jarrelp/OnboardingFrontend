import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { THEME } from "../../constants";

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && {
          backgroundColor: THEME.colors.surface,
        },
        style,
      ]}
      labelStyle={[
        styles.text,
        mode === "outlined" && {
          color: THEME.colors.secondary,
        },
      ]}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: THEME.colors.secondary,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});
