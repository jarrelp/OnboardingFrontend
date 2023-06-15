import { Card, Text } from "react-native-paper";
import React from "react";
import { Image } from "react-native";

import LeaderboardTime from "./LeaderboardTime";

import { IMAGES } from "../../constants";

const LeaderboardCard = (props) => {
  return (
    // <Card style={{ margin: 10 }}>
    //   <Card.Title
    //     title={props.leaderboard.firstName + " " + props.leaderboard.lastName}
    //   />
    //   <Card.Content>
    //     <Text variant="bodyMedium">{props.leaderboard.time}</Text>
    //   </Card.Content>
    // </Card>
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={props.leaderboard.firstName + " " + props.leaderboard.lastName}
        subtitle={props.index + 1 + "."}
        left={(props) => (
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={IMAGES.profile}
          />
        )}
        right={() => (
          <LeaderboardTime style={{ marginRight: 10 }}>
            {props.leaderboard.time}
          </LeaderboardTime>
        )}
      />
    </Card>
  );
};

export default LeaderboardCard;
