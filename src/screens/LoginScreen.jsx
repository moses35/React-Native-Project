import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Background } from "../components/Background";

export const LoginScreen = () => {
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [focusedInput, setFocusedInput] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  const onLogin = () => {
    if (!email || !password) {
      Alert.alert("Fill all fields");
      return;
    }
    console.log("Login data:", `Email: ${email}, Password: ${password}`);
    reset();
  };

  const reset = () => {
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-250}
        style={styles.keyboarView}
      >
        <View style={styles.loginContainer}>
          <Text style={styles.text}>Увійти</Text>

          <View style={styles.inputsContainer}>
            <TextInput
              style={[
                focusedInput === "TextInput1"
                  ? styles.inputOnFocus
                  : styles.input,
              ]}
              inputMode={"email"}
              onChangeText={onChangeEmail}
              onFocus={() => setFocusedInput("TextInput1")}
              onBlur={() => setFocusedInput("")}
              value={email}
              placeholder="Адреса електронної пошти"
              keyboardType="numeric"
            />
            <View>
              <TextInput
                style={[
                  focusedInput === "TextInput2"
                    ? styles.inputOnFocus
                    : styles.input,
                ]}
                onChangeText={onChangePassword}
                onFocus={() => setFocusedInput("TextInput2")}
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

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.link} onPress={() => console.log("click")}>
            Немає акаунту?{" "}
            <Text style={styles.linkUnderline}> Зареєструватися</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboarView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  input: {
    height: 50,
    minWidth: "100%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 4,
    borderColor: "#E8E8E8",
  },
  inputOnFocus: {
    height: 50,
    minWidth: "100%",
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
  loginContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 32,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  link: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 144,
  },
  linkUnderline: {
    textDecorationLine: "underline",
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
