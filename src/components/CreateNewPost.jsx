import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import Svg, { Rect, Path } from "react-native-svg";

export const CreateNewPost = () => {
  const [text, onChangeText] = React.useState("");
  const [location, onChangeLocation] = React.useState("");
  const [isDisebled, setIsDisebled] = React.useState(true);

  return (
    <View>
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.addPhoto}>
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Назва..."
        />
        <View style={styles.inputLocationContainer}>
          <Svg
            style={styles.locationIcon}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
          <TextInput
            style={styles.inputLocation}
            onChangeText={onChangeLocation}
            value={location}
            placeholder="Місцевість..."
          />
        </View>
      </View>
      <TouchableOpacity
        style={[isDisebled ? styles.buttonDisabled : styles.button]}
        disabled={isDisebled}
        onPress={() => console.log("press")}
      >
        <Text
          style={[isDisebled ? styles.buttonTextDisabled : styles.buttonText]}
        >
          Опубліковати
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    marginBottom: 32,
  },
  input: {
    borderBottomColor: "#E8E8E8",
    height: 50,
    minWidth: "100%",
    borderBottomWidth: 1,
  },
  inputLocation: {
    borderBottomColor: "#E8E8E8",
    height: 50,
    minWidth: "100%",
    borderBottomWidth: 1,
    paddingLeft: 28,
  },
  inputLocationContainer: {
    justifyContent: "center",
  },
  locationIcon: {
    position: "absolute",
  },
  addPhoto: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    margin: 0,
    padding: 0,
    marginBottom: 32,
  },
  textUnderPhoto: {
    color: "#BDBDBD",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  photoContainer: {
    alignItems: "center",
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    marginBottom: 8,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonTextDisabled: {
    color: "#BDBDBD",
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
});
