import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import axios from "../../utils/AxiosInstance";

import DocumentCard from "../../components/tasksComponents/DocumentCard";

const DocumentScreen = () => {
  // haal documenten op
  const [documentList, setDocumentList] = useState([]);

  useEffect(() => {
    getDocumentList();
  }, []);

  const getDocumentList = async () => {
    let response = await axios.get("/speurtocht/info/");
    console.log("🔥 ~ documentList: ", response.data);
    setDocumentList(response.data);
  };

  return (
    <FlatList
      data={documentList}
      renderItem={({ item }) => (
        // <List.Item
        //   title={item.title}
        //   description={item.text}
        //   left={(props) => <List.Icon {...props} icon="folder" />}

        // />
        <DocumentCard document={item} />
      )}
      keyExtractor={(item) => item.task}
    />
  );
};

export default DocumentScreen;
