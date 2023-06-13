import { View } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import React, { useEffect, useState } from "react";

import { ProgressBar, MD3Colors } from "react-native-paper";

import { TaskData } from "./data";

import Task from "./Task";

const TasksCard = (props) => {
  const [number, setNumber] = useState(0);
  const [checkList, setCheckList] = useState([]);

  // haal taken op
  const [taskList, setTaskList] = useState([
    {
      id: "1",
      title: "Introductie en kennismaking",
      description:
        "Het onboardingsproces begint met een formele introductie van het nieuwe personeelslid aan het bedrijf, inclusief de missie, visie en waarden. Er worden ook kennismakingsgesprekken georganiseerd met teamleden en belangrijke stakeholders.",
      point: 1,
    },
    {
      id: "2",
      title: "Administratieve formaliteiten",
      description:
        "Deze taak omvat het verzamelen van alle nodige documenten en informatie van het nieuwe personeelslid, zoals contracten, identiteitsbewijzen en bankgegevens. Tevens worden de benodigde systemen en softwarelicenties geregeld.",
      point: 2,
    },
    {
      id: "3",
      title: "Training en opleiding",
      description:
        "Het nieuwe personeelslid ontvangt training en opleiding om bekend te raken met de bedrijfsspecifieke processen, systemen en procedures. Dit kan zowel online training als klassikale sessies omvatten, afhankelijk van de vereisten van de functie.",
      point: 3,
    },
    {
      id: "4",
      title: "Inwerken en begeleiding",
      description:
        "Gedurende de onboardingperiode krijgt het nieuwe personeelslid een mentor of buddy toegewezen om hen te begeleiden en te ondersteunen bij hun taken. Deze persoon fungeert als aanspreekpunt voor vragen en helpt bij het opbouwen van relaties binnen het bedrijf.",
      point: 4,
    },
  ]);

  const checkIsTrue = (item) => {
    return item == true;
  };

  useEffect(() => {
    if (taskList.length == Object.values(checkList).length) {
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
        task={taskList[number]}
        setIsChecked={setCheckList}
        checkList={checkList}
        taskId={number}
      >
        <ProgressBar
          progress={(number + 1) / taskList.length}
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
          {number < taskList.length - 1 && !props.isFinished && (
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
              onPress={() => console.log("checklist: " + checkList)}
            >
              Finish
            </Button>
          )}
        </Card.Actions>
        <Text textAlign="center">
          Task: {number + 1} of {taskList.length}
        </Text>
      </Task>
    </View>
  );
};

export default TasksCard;
