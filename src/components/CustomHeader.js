import * as React from "react";
import { Appbar } from "react-native-paper";

const CustomHeader = ({ navigation, back, title }) => (
  <Appbar.Header>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content title={title} />
  </Appbar.Header>
);

export default CustomHeader;

// import React from "react";
// import { Appbar } from "react-native-paper";
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";

// const CustomHeader = ({ options, navigation }) => {
//   const { options } = scene.descriptor;
//   const title = options.headerTitle;

//   return (
//     <Appbar.Header>
//       {navigation.goBack() ? (
//         <Appbar.BackAction onPress={() => navigation.pop()} />
//       ) : (
//         <Icon name="instagram" size={24} color="white" />
//       )}
//       <Appbar.Content title={title} />
//       <Appbar.Action
//         icon="bell"
//         onPress={() => console.log("Notification pressed")}
//       />
//     </Appbar.Header>
//   );
// };

// export default CustomHeader;
