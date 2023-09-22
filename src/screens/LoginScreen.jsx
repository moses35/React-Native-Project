import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Background } from "../components/Background";
import { useNavigation } from "@react-navigation/native";
import { loginDB } from "../auth/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, setUser } from "../redux/authSlice";
import { auth } from "../../config";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [focusedInput, setFocusedInput] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn]);

  const onLogin = async () => {
    const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
      if (!email || !password) {
        Alert.alert("Fill all fields");
        return;
      }
      if (password.length < 7) {
        Alert.alert("Password too short");
        return;
      }

      if (emailRegaxp.test(email)) {
        await loginDB(email, password);
        const { displayName, uid, accessToken } = auth.currentUser;
        dispatch(setUser({ displayName, email, password, accessToken, uid }));
        reset();
        navigation.navigate("Home");
      } else {
        Alert.alert("Not valid email. Example: email@example.com");
      }
    } catch (error) {}
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
        style={styles.keyboardView}
      >
        <Background>
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
                autoCapitalize={"none"}
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
                  autoCapitalize={"none"}
                />
                <Text
                  style={styles.pressableText}
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? "Показати" : "Cховати"}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={onLogin}>
              <Text style={styles.buttonText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Registration");
                reset();
              }}
            >
              <Text style={styles.link}>
                Немає акаунту?
                <Text style={styles.linkUnderline}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Background>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
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
    marginRight: 10,
  },
  linkUnderline: {
    textDecorationLine: "underline",
  },
  pressableText: {
    position: "absolute",
    color: "#1B4371",
    fontSize: 16,
    right: 16,
    bottom: 16,
  },
  buttonAdd: {
    position: "absolute",
    right: -12,
    bottom: 40,
  },
});
