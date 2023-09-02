import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Comment } from "../components/Comment";
import Forest from "../assets/images/forest.jpg";
export const CommentsScreen = () => {
  const [text, onChangeText] = React.useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
        style={styles.keyboardView}
      >
        <View style={styles.commentsContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.text}>Коментарі</Text>
            <TouchableHighlight
              onPress={() => console.log("click")}
              style={styles.arrowLeft}
              underlayColor="transparent"
            >
              <AntDesign
                name="arrowleft"
                size={24}
                color="rgba(33, 33, 33, 0.8)"
              />
            </TouchableHighlight>
          </View>
          <View style={styles.publicationContainer}>
            <ScrollView style={styles.comments}>
              <View style={styles.photoContainer}>
                <Image source={Forest} style={styles.image} />
              </View>

              <Comment />
              <Comment />
              <Comment />
            </ScrollView>

            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Коментувати..."
              />
              <TouchableOpacity style={styles.iconArrowUp}>
                <AntDesign name="arrowup" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 44,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
  },

  text: {
    fontSize: 17,
    fontWeight: "500",
    marginTop: 11,
    marginBottom: 11,
  },
  commentsContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    height: "100%",
  },
  publicationContainer: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  arrowLeft: {
    position: "absolute",
    left: 16,
    bottom: 10,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
    height: "100%",
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
  image: {
    width: "100%",
    borderRadius: 16,
  },
  input: {
    minHeight: 50,
    minWidth: "100%",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
    borderColor: "#E8E8E8",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  comments: {
    gap: 24,
  },
  iconArrowUp: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: 8,
    top: 8,
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
