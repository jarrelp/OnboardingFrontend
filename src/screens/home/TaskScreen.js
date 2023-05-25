import React from "react";
import { View, Text } from "react-native";

import CustomHeader from "../../components/CustomHeader";

const TaskScreen = () => {
  return (
    <View>
      <CustomHeader title={"Taken"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Task Screen</Text>
      </View>
    </View>
  );
};

export default TaskScreen;
