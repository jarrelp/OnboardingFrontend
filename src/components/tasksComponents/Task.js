import { View } from "react-native";
import { Card, Text, Checkbox } from "react-native-paper";
import React from "react";

const Task = (props) => {
  let list = props.checkList;

  const handleChange = () => {
    props.setIsChecked((list) => ({
      ...list,
      [props.taskId]: !list[props.taskId],
    }));
  };

  return (
    <Card>
      <Card.Title title={props.task.title} />
      <Card.Content>
        {/* <Text variant="titleLarge"></Text> */}
        <Text variant="bodyMedium">{props.task.description}</Text>
        <Checkbox
          status={list[props.taskId] ? "checked" : "unchecked"}
          onPress={handleChange}
        />
        {props.children}
      </Card.Content>
    </Card>
  );
};

export default Task;
