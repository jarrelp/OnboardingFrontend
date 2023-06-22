import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  SegmentedButtons,
  Text,
  Button,
  Card,
  Dialog,
} from "react-native-paper";

import axios from "../../utils/AxiosInstance";

import Distance from "../../components/Distance";
import TasksCard from "../../components/tasksComponents/TasksCard";

import { THEME } from "../../constants";

const TaskScreen = () => {
  const [value, setValue] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // haal taken op
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async () => {
    let response = await axios.get("/speurtocht/task/");
    console.log("🔥 ~ taskList: ", response.data);
    setTaskList(response.data);
  };

  // timer
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
    if (isFinished) if (running) clearInterval(timer.current);
    setRunning(false);
  }, [isFinished]);

  useEffect(() => {
    if (isStarted) if (!running) setRunning(true);
  }, [isStarted]);

  const format = (time) => {
    let hours = Math.floor((time / 60 / 60) % 24);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = Math.floor(time % 60);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.compassContainer}>
        <View style={styles.timeContainer}>
          <Button
            style={[styles.timerButton]}
            labelStyle={[styles.timerText]}
            mode="outlined"
            disabled={true}
          >
            {format(time)}
          </Button>
        </View>
      </View>
      <View style={styles.containerCenter}>
        <Distance>52m</Distance>
        <Text>Deze taak bevindt zich op: </Text>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "Begane Grond",
              label: <Text>Begane grond</Text>,
            },
            {
              value: "Verdieping 1",
              label: <Text>Verdieping 1</Text>,
            },
            { value: "verdieping 2", label: <Text>Verdieping 2</Text> },
          ]}
        />
      </View>

      <View style={styles.takenContainer}>
        {isStarted ? (
          <TasksCard
            isFinished={isFinished}
            setIsFinished={setIsFinished}
            taskList={taskList}
          />
        ) : (
          <Card style={styles.takenCard} mode="outlined">
            <Card.Title />
            <Card.Title />
            <Card.Content style={styles.cardContent}>
              <Text variant="titleLarge">Start het spel</Text>
              <Text variant="bodyMedium">
                Wanneer u op start drukt begint de timer te lopen
              </Text>
              <Button
                mode="contained"
                onPress={() => {
                  setIsStarted(true);
                }}
              >
                Start
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
      {isFinished && (
        <Dialog visible={true}>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Whohoo, je hebt alle taken voltooid in {format(time)}
            </Text>
          </Dialog.Content>
        </Dialog>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerCenter: {
    alignItems: "center",
  },
  compassContainer: {},
  takenContainer: {
    paddingTop: 30,
    flex: 2,
    height: "100%",
    width: "100%",
  },
  takenCard: {
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  cardContent: {
    alignSelf: "center",
  },
  timeContainer: {
    alignItems: "flex-end",
  },
  buttonRight: {
    marginEnd: 10,
  },
  timerButton: {
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: THEME.colors.surface,
    borderColor: THEME.colors.secondary,
  },
  timerText: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
    color: THEME.colors.secondary,
  },
});

export default TaskScreen;
