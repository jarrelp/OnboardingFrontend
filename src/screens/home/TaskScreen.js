import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons, Text, Button, Card } from "react-native-paper";

import Timer from "../../components/tasksComponents/Timer";
import Distance from "../../components/Distance";
import TasksCard from "../../components/tasksComponents/TasksCard";

const TaskScreen = () => {
  const [value, setValue] = React.useState("");
  const [isStarted, setIsStarted] = React.useState(false);
  const [isFinished, setIsFinished] = React.useState(false);

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
              value: "BG",
              label: "BG",
            },
            {
              value: "F1",
              label: "F1 ",
            },
            { value: "F2", label: "F2" },
          ]}
        />
      </View>

      <View style={styles.takenContainer}>
        {isStarted ? (
          <TasksCard isFinished={isFinished} setIsFinished={setIsFinished} />
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
