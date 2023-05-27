import MatIcon from "react-native-vector-icons/MaterialIcons";
import FontAweIcon from "react-native-vector-icons/FontAwesome5";
import MatComIcon from "react-native-vector-icons/MaterialCommunityIcons";

// tab bar icons
const TabTakenIcon = (props) => <FontAweIcon name="tasks" {...props} />;
const TabDocumentIcon = (props) => <MatComIcon name="tasks" {...props} />;
const TabLeaderboardIcon = (props) => <MatIcon name="tasks" {...props} />;

export default {
  TabTakenIcon,
  TabDocumentIcon,
  TabLeaderboardIcon,
};
