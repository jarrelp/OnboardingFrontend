import React from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";

const DATA = [
  {
    id: 1,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 2,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 3,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 4,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 5,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 6,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 7,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 8,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 9,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 10,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 11,
    title: "First Item",
    description: "Item description",
  },
  {
    id: 12,
    title: "First Item",
    description: "Item description",
  },
];

const DocumentScreen = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <List.Item
          title={item.title}
          description={item.description}
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default DocumentScreen;
