import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { RegistrationScreen } from "./src/screens/RegistrationScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { PostsScreen } from "./src/screens/PostsScreen";
import BackgroundImage from "./src/assets/photo_BG.jpg";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BackgroundImage}
        resizeMode="cover"
        objectFit="cover"
        style={styles.image}
      >
        <RegistrationScreen />
        {/* <LoginScreen /> */}
        {/* <PostsScreen /> */}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
