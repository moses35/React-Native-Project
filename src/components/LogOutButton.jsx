import { StyleSheet, TouchableHighlight } from "react-native";

import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

export const LogOutButton = ({ profileScreen = false }) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      onPress={() => navigation.navigate("Login")}
      style={[
        profileScreen ? styles.buttonLogOutProlileScreen : styles.buttonLogOut,
      ]}
      underlayColor="transparent"
    >
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
          stroke="#BDBDBD"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 16L21 12L17 8"
          stroke="#BDBDBD"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M21 12H9"
          stroke="#BDBDBD"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  buttonLogOut: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },
  buttonLogOutProlileScreen: {
    position: "absolute",
    right: 16,
    top: 22,
  },
});
