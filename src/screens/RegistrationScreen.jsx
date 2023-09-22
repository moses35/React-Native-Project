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
import { useNavigation } from "@react-navigation/native";
import { Background } from "../components/Background";
import { ProfilePhoto } from "../components/ProfilePhoto";
import { registerDB } from "../auth/auth";
import { selectIsLoggedIn, registerUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../config";

export const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [name, onChangeName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const [focusedInput, setFocusedInput] = React.useState("");
  const [isPasswordHidden, setIsPasswordHidden] = React.useState(true);
  const [imagePath, setImagePath] = React.useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn]);

  const onRegistr = async () => {
    const emailRegaxp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
      if (!name || !email || !password) {
        Alert.alert("Fill all fields");
        return;
      }
      if (password.length < 7) {
        Alert.alert("Password too short");
        return;
      }
      if (emailRegaxp.test(email)) {
        await registerDB(imagePath, name, email, password);
        const { accessToken, uid } = auth.currentUser;
        dispatch(registerUser({ name, email, password, accessToken, uid }));
        reset();
        navigation.navigate("Home");
      } else {
        Alert.alert("Not valid email. Example: email@example.com");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImage = (photo) => {
    setImagePath(photo);
  };
  const reset = () => {
    onChangeName("");
    onChangeEmail("");
    onChangePassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-190}
        style={styles.keyboardView}
      >
        <Background>
          <View style={styles.registerContainer}>
            <ProfilePhoto getImage={getImage} />
            <Text style={styles.text}>Реєстрація</Text>
            <View style={styles.inputsContainer}>
              <TextInput
                style={[
                  focusedInput === "TextInput1"
                    ? styles.inputOnFocus
                    : styles.input,
                ]}
                onChangeText={onChangeName}
                onFocus={() => setFocusedInput("TextInput1")}
                onBlur={() => setFocusedInput("")}
                value={name}
                placeholder="Логін"
              />
              <TextInput
                style={[
                  focusedInput === "TextInput2"
                    ? styles.inputOnFocus
                    : styles.input,
                ]}
                inputMode={"email"}
                onChangeText={onChangeEmail}
                onFocus={() => setFocusedInput("TextInput2")}
                onBlur={() => setFocusedInput("")}
                value={email}
                placeholder="Адреса електронної пошти"
                autoCapitalize={"none"}
              />
              <View>
                <TextInput
                  style={[
                    focusedInput === "TextInput3"
                      ? styles.inputOnFocus
                      : styles.input,
                  ]}
                  onChangeText={onChangePassword}
                  onFocus={() => setFocusedInput("TextInput3")}
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
            <TouchableOpacity style={styles.button} onPress={onRegistr}>
              <Text style={styles.buttonText}>Зареєструватися</Text>
            </TouchableOpacity>
            <Text
              style={styles.link}
              onPress={() => {
                navigation.navigate("Login");
                reset();
              }}
            >
              Вже є акаунт? Увійти
            </Text>
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
  registerContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 92,
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
    marginLeft: 10,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  link: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 78,
  },
  pressableText: {
    position: "absolute",
    color: "#1B4371",
    fontSize: 16,
    right: 16,
    bottom: 16,
  },
});
