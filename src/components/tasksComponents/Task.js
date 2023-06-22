import { Card, Text, Checkbox } from "react-native-paper";
import React from "react";

import useAuth from "../../hooks/useAuth";

const Task = (props) => {
  const { checkList, setCheckList } = useAuth();

  let list = checkList;

  const handleChange = () => {
    setCheckList((list) => ({
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
