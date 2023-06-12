import * as React from "react";
import { Appbar } from "react-native-paper";

const CustomHeader = ({ navigation, back, title }) => (
  <Appbar.Header>
    {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
    <Appbar.Content title={title} />
  </Appbar.Header>
);

export default CustomHeader;
