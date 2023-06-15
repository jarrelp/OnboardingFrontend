import { View } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";

import { ProgressBar, MD3Colors, Dialog } from "react-native-paper";

import Task from "./Task";

const TasksCard = (props) => {
  const [number, setNumber] = useState(0);
  const [checkList, setCheckList] = useState([]);

  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  const checkIsTrue = (item) => {
    return item == true;
  };

  useEffect(() => {
    if (props.taskList.length == Object.values(checkList).length) {
      if (Object.values(checkList).every(checkIsTrue)) {
        handleChangeIsFinished(true);
      } else {
        handleChangeIsFinished(false);
      }
    }

    console.log("isfinished: " + props.isFinished);
  }, [checkList]);

  const handleChange = (event, newNumber) => {
    setNumber(newNumber);
  };

  const handleChangeIsFinished = (value) => {
    props.setIsFinished(value);
  };

  return (
    <View>
      <Task
        task={props.taskList[number]}
        setIsChecked={setCheckList}
        checkList={checkList}
        taskId={number}
      >
        <ProgressBar
          progress={(number + 1) / props.taskList.length}
          color={MD3Colors.error50}
        />
        <Card.Actions>
          {number > 0 && !props.isFinished && (
            <Button
              variant="outlined"
              size="large"
              onPress={(e) => handleChange(e, number - 1)}
            >
              Previous
            </Button>
          )}
          {number < props.taskList.length - 1 && !props.isFinished && (
            <Button
              variant="contained"
              size="large"
              onPress={(e) => handleChange(e, 1 + number)}
            >
              Next
            </Button>
          )}
          {props.isFinished && (
            <Button
              variant="contained"
              size="large"
              onPress={() => setVisible(true)}
            >
              Finish
            </Button>
          )}
        </Card.Actions>
        <Text textAlign="center">
          Task: {number + 1} of {props.taskList.length}
        </Text>
      </Task>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Whohoo, je hebt alle taken voltooid in...
          </Text>
        </Dialog.Content>
      </Dialog>
    </View>
  );
};

export default TasksCard;
