import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
} from "react-native";

import { Background } from "../components/Background";
import { Publication } from "../components/Publication";
import { SimpleLineIcons } from "@expo/vector-icons";
import UserPhoto from "../assets/images/userPhoto.jpg";
import { LogOutButton } from "../components/LogOutButton";

export const ProfileScreen = () => {
  return (
    <Background>
      <View style={styles.registerContainer}>
        <LogOutButton profileScreen={true} />
        <View>
          <View style={styles.photoContainer}>
            <Image
              source={UserPhoto}
              maxWidth={120}
              maxHeight={120}
              borderRadius={16}
            />
          </View>
          <TouchableHighlight
            onPress={() => null}
            style={styles.buttonAdd}
            underlayColor="transparent"
          >
            <SimpleLineIcons
              style={styles.closeIcon}
              name="close"
              size={25}
              color="#E8E8E8"
              backgroundColor={"#FFFFFF"}
            />
          </TouchableHighlight>
        </View>
        <Text style={styles.text}>Natali Romanova</Text>

        <ScrollView style={styles.publicationsContainer}>
          <Publication showLikes={true} country={"Ukraine"} />
          <Publication showLikes={true} country={"Ukraine"} />
          <Publication showLikes={true} country={"Italy"} />
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
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
    marginTop: "60%",
  },

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
  publicationsContainer: {
    width: "100%",
  },
  closeIcon: {
    borderRadius: 50,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    minHeight: 83,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#BDBDBD",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 31,
    alignItems: "center",
    marginBottom: 24,
  },
  button: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
