import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
} from "react-native";

import Svg, { Circle, Path } from "react-native-svg";

export const RegistrationScreen = () => {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState("");
  const [password, onPasswordNumber] = React.useState("");
  const [focusedInput, setFocusedInput] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  return (
    <View style={styles.registerContainer}>
      <View>
        <View style={styles.photoContainer}></View>
        <TouchableHighlight
          onPress={() => null}
          style={styles.buttonAdd}
          underlayColor="transparent"
        >
          <Svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Circle cx="12.5" cy="12.5" r="12" fill="white" stroke="#FF6C00" />
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
              fill="#FF6C00"
            />
          </Svg>
        </TouchableHighlight>
      </View>
      <Text style={styles.text}>Реєстрація</Text>
      <View style={styles.inputsContainer}>
        <TextInput
          style={[
            focusedInput === "TextInput1" ? styles.inputOnFocus : styles.input,
          ]}
          onChangeText={onChangeText}
          onFocus={() => setFocusedInput("TextInput1")}
          onBlur={() => setFocusedInput("")}
          value={text}
          placeholder="Логін"
        />
        <TextInput
          style={[
            focusedInput === "TextInput2" ? styles.inputOnFocus : styles.input,
          ]}
          inputMode={"email"}
          onChangeText={onChangeNumber}
          onFocus={() => setFocusedInput("TextInput2")}
          onBlur={() => setFocusedInput("")}
          value={number}
          placeholder="Адреса електронної пошти"
          keyboardType="numeric"
        />
        <View>
          <TextInput
            style={[
              focusedInput === "TextInput3"
                ? styles.inputOnFocus
                : styles.input,
            ]}
            onChangeText={onPasswordNumber}
            onFocus={() => setFocusedInput("TextInput3")}
            onBlur={() => setFocusedInput("")}
            value={password}
            placeholder="Пароль"
            secureTextEntry={isPasswordHidden}
          />

          <Pressable
            style={styles.showPass}
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            <Text style={styles.pessableText}>
              {isPasswordHidden ? "Показати" : "Cховати"}
            </Text>
          </Pressable>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
      <Text style={styles.link} onPress={() => console.log("click")}>
        Вже є акаунт? Увійти
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 343,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 4,
    borderColor: "#E8E8E8",
  },
  inputOnFocus: {
    height: 50,
    width: 343,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    borderColor: "#FF6C00",
  },

  inputsContainer: {
    gap: 16,
    marginBottom: 43,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 32,
  },
  registerContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  button: {
    width: 343,
    height: 50,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  link: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 78,
  },
  photoContainer: {
    width: 120,
    height: 120,
    marginBottom: 26,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  showPass: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
  pessableText: {
    color: "#1B4371",
    fontSize: 16,
  },
  buttonAdd: {
    position: "absolute",
    right: -12,
    bottom: 40,
  },
});
