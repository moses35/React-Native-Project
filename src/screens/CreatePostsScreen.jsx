import React from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { CreateNewPost } from "../components/CreateNewPost";

export const CreatePostsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-190}
        style={styles.keyboardView}
      >
        <View style={styles.postsContainer}>
          <View style={styles.publicationContainer}>
            <CreateNewPost />
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
  bottomContainer: {
    flex: 1,
    width: "100%",
    maxHeight: 49,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 34,
    borderColor: "#BDBDBD",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 31,
    marginTop: 9,
    alignItems: "center",
  },
  userContainer: {
    flexDirection: "row",
    gap: 8,
    height: 60,
    alignItems: "center",
    borderRadius: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: "500",
    marginTop: 11,
    marginBottom: 11,
  },
  textName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#212121",
  },
  textEmail: {
    fontSize: 11,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    height: "100%",
  },
  publicationContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  button: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    width: 120,
    height: 120,
    marginBottom: 26,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  imageContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  arrowLeft: {
    position: "absolute",
    left: 16,
    bottom: 10,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
