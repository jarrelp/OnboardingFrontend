import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import axios from "../../utils/AxiosInstance";

import DocumentCard from "../../components/tasksComponents/DocumentCard";

import useAuth from "../../hooks/useAuth";

const DocumentScreen = () => {
  const { checkList } = useAuth();

  const [retList, setRetList] = useState([]);

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

  useEffect(() => {
    const result = Object.entries(checkList)
      .filter(([index, value]) => value === true && index < documentList.length)
      .map(([index]) => documentList[index]);

    setRetList(result);
  }, [documentList, checkList]);

  return (
    <FlatList
      data={retList}
      renderItem={({ item }) => <DocumentCard document={item} />}
      keyExtractor={(item) => item.task}
    />
  );
};

export default DocumentScreen;
