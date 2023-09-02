import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const ProfilePhoto = () => {
  return (
    <View>
      <View style={styles.photoContainer}></View>
      <TouchableHighlight
        onPress={() => null}
        style={styles.buttonAdd}
        underlayColor="transparent"
      >
        <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  buttonAdd: {
    position: "absolute",
    right: -72,
    bottom: 46,
  },
});
