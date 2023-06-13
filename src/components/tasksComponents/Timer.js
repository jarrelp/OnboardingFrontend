import React, { useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { THEME } from "../../constants";

const Timer = ({ mode, style, ...props }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const timer = useRef();

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((pre) => pre + 1);
      }, 1000);
    }
    return () => clearInterval(timer.current);
  }, [running]);

  useEffect(() => {
    if (props.isFinished) if (running) clearInterval(timer.current);
    setRunning(false);
  }, [props.isFinished]);

  useEffect(() => {
    if (props.isStarted) if (!running) setRunning(true);
  }, [props.isStarted]);

  return (
    <PaperButton
      style={[styles.button, style]}
      labelStyle={[styles.text]}
      mode="outlined"
      disabled={true}
      {...props}
    >
      {format(time)}
    </PaperButton>
  );
};

const format = (time) => {
  let hours = Math.floor((time / 60 / 60) % 24);
  let minutes = Math.floor((time / 60) % 60);
  let seconds = Math.floor(time % 60);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
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

export default Timer;
