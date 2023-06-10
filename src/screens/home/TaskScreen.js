import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import Timer from "../../components/Timer";
import Distance from "../../components/Distance";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TaskScreen = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.compassContainer}>
        <View style={styles.timeContainer}>
          <Timer>29:12</Timer>
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

      <View style={styles.takenContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    alignItems: "center",
  },
  compassContainer: {
    flex: 1,
  },
  takenContainer: {
    flex: 3,
    backgroundColor: "#e17000",
    height: "100%",
    width: "100%",
  },
  timeContainer: {
    alignItems: "flex-end",
    marginRight: 20,
  },
});

export default TaskScreen;
