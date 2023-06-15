import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { THEME } from "../../constants";

const LeaderboardTime = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[styles.button, style]}
      labelStyle={[styles.text]}
      mode="outlined"
      disabled={true}
      {...props}
    >
      {props.children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: THEME.colors.surface,
    borderColor: THEME.colors.secondary,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: THEME.colors.secondary,
  },
});

export default LeaderboardTime;
