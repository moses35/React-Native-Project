import BackgroundImage from "../assets/images/photo_BG.jpg";
import { StyleSheet, ImageBackground } from "react-native";

export const Background = ({ children }) => {
  return (
    <ImageBackground
      source={BackgroundImage}
      resizeMode="cover"
      objectFit="cover"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
