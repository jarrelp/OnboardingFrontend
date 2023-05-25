import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// import CustomHeader from "../../components/CustomHeader";

const TaskScreen = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Icon name="compass-outline" size={300} />
      <Text>Deze taak bevindt zich op: </Text>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "Verdieping1",
            label: "Verdieping1",
          },
          {
            value: "Verdieping2",
            label: "Verdieping2",
          },
          { value: "Verdieping3", label: "Verdieping3" },
        ]}
      />
      <View style={styles.taken}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  taken: {
    backgroundColor: "#e17000",
    height: "100%",
    width: "100%",
  },
});

export default TaskScreen;
