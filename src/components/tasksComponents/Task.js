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
      <Card.Title
        title={props.task.title}
        right={() => (
          <Checkbox.Item
            status={list[props.taskId] ? "checked" : "unchecked"}
            onPress={handleChange}
            style={{
              marginRight: 10,
            }}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={{ paddingBottom: 40 }}>
          {props.task.description}
        </Text>

        {props.children}
      </Card.Content>
    </Card>
  );
};

export default Task;
