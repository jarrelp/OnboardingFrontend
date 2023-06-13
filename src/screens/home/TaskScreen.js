import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons, Text, Button, Card } from "react-native-paper";

import axios from "../../utils/AxiosInstance";

import Timer from "../../components/tasksComponents/Timer";
import Distance from "../../components/Distance";
import TasksCard from "../../components/tasksComponents/TasksCard";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.compassContainer}>
        <View style={styles.timeContainer}>
          <Timer isStarted={isStarted} isFinished={isFinished} />
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
});

export default TaskScreen;
