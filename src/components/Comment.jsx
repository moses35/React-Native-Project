import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export const Comment = () => {
  return <View style={styles.commentContainer}></View>;
};

const styles = StyleSheet.create({
  commentContainer: {
    width: "100%",
    height: 103,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
});
