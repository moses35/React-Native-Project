import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";
import { MainNavigator } from "./src/routes/MainNavigator";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { PostsScreen } from "./src/screens/PostsScreen";
import { CreatePostsScreen } from "./src/screens/CreatePostsScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { CommentsScreen } from "./src/screens/CommentsScreen";
import { Background } from "./src/components/Background";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainNavigator />
      {/* <RegistrationScreen /> */}
      {/* <LoginScreen /> */}
      {/* <PostsScreen /> */}
      {/* <CreatePostsScreen /> */}
      {/* <ProfileScreen /> */}
      {/* <CommentsScreen /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
