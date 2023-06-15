import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import axios from "../../utils/AxiosInstance";

import LeaderboardCard from "../../components/tasksComponents/LeaderboardCard";

const Data = [
  {
    firstName: "Anna",
    lastName: "Bakker",
    time: "00:00:45",
  },
  {
    firstName: "Bram",
    lastName: "De Vries",
    time: "00:01:18",
  },
  {
    firstName: "Daan",
    lastName: "Hoekstra",
    time: "00:01:30",
  },
  {
    firstName: "Emma",
    lastName: "Jansen",
    time: "00:01:42",
  },
  {
    firstName: "Fleur",
    lastName: "Kramer",
    time: "00:01:48",
  },
  {
    firstName: "Isa",
    lastName: "Meijer",
    time: "00:01:52",
  },
  {
    firstName: "Julia",
    lastName: "Peters",
    time: "00:01:54",
  },
  {
    firstName: "Liam",
    lastName: "Schouten",
    time: "00:01:55",
  },
  {
    firstName: "Lotte",
    lastName: "Smit",
    time: "00:02:03",
  },
  {
    firstName: "Lucas",
    lastName: "Visser",
    time: "00:02:07",
  },
  {
    firstName: "Luna",
    lastName: "Bosman",
    time: "00:02:12",
  },
  {
    firstName: "Max",
    lastName: "Hendriks",
    time: "00:02:21",
  },
  {
    firstName: "Milan",
    lastName: "Kok",
    time: "00:02:28",
  },
  {
    firstName: "Noah",
    lastName: "Mulder",
    time: "00:02:37",
  },
  {
    firstName: "Ruben",
    lastName: "Smit",
    time: "00:02:41",
  },
  {
    firstName: "Sara",
    lastName: "van Beek",
    time: "00:02:48",
  },
  {
    firstName: "Sophie",
    lastName: "van Dijk",
    time: "00:02:51",
  },
  {
    firstName: "Stijn",
    lastName: "van der Berg",
    time: "00:02:56",
  },
  {
    firstName: "Thijs",
    lastName: "van der Veen",
    time: "00:02:58",
  },
  {
    firstName: "Vera",
    lastName: "van der Meer",
    time: "00:03:00",
  },
];

const LeaderboardScreen = () => {
  // haal documenten op
  const [leaderboardList, setLeaderboardList] = useState(Data);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  useEffect(() => {
    loadUser();
    console.log("🔥 ~ leaderboardList: " + leaderboardList);
  }, []);

  const loadUser = async () => {
    let response = await axios.get("/auth/users/me/");

    console.log("🔥 ~ userdetails: ", leaderboardList);
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
  };

  return (
    <FlatList
      data={leaderboardList}
      renderItem={({ item }) => (
        // <List.Item
        //   title={item.title}
        //   description={item.text}
        //   left={(props) => <List.Icon {...props} icon="folder" />}

        // />
        <LeaderboardCard
          leaderboard={item}
          index={leaderboardList.indexOf(item)}
        />
      )}
    />
  );
};

export default LeaderboardScreen;
