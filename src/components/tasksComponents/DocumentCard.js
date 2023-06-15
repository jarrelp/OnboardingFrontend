import { Card, Text } from "react-native-paper";
import React from "react";

const DocumentCard = (props) => {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Title title={props.document.title} />
      <Card.Content>
        <Text variant="bodyMedium">{props.document.text}</Text>
      </Card.Content>
    </Card>
  );
};

export default DocumentCard;
