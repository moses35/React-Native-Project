import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import UserPhoto from "../assets/images/userPhoto.jpg";
import { Publication } from "../components/Publication";
import { LogOutButton } from "../components/LogOutButton";

export const PostsScreen = () => {
  return (
    <View style={styles.postsContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Публікації</Text>
        <LogOutButton />
      </View>
      <View style={styles.publicationContainer}>
        <View style={styles.userContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={UserPhoto}
              maxWidth={60}
              maxHeight={60}
              borderRadius={16}
            />
          </View>
          <View>
            <Text style={styles.textName}>Natali Romanova</Text>
            <Text style={styles.textEmail}>email@example.com</Text>
          </View>
        </View>
        <ScrollView>
          <Publication country={"Ivano-Frankivs'k Region, Ukraine"} />
          <Publication country={"Ivano-Frankivs'k Region, Ukraine"} />
          <Publication country={"Ivano-Frankivs'k Region, Ukraine"} />
        </ScrollView>
      </View>
    </View>
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

  userContainer: {
    flexDirection: "row",
    gap: 8,
    height: 60,
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 32,
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
});
