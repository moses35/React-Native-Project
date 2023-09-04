import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import Forest from "../assets/images/forest.jpg";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Publication = ({ showLikes = false, country = "No country" }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.postContainer}>
      <View style={styles.photoContainer}>
        <Image source={Forest} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ліс</Text>
      </View>
      <View style={styles.infoContainer}>
        <TouchableHighlight
          onPress={() => navigation.navigate("CommentsScreen")}
          underlayColor="transparent"
        >
          <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
        </TouchableHighlight>
        <Text style={styles.numberOfComments}>0</Text>
        {showLikes && (
          <View style={styles.likesContainer}>
            <TouchableHighlight
              onPress={() => null}
              underlayColor="transparent"
            >
              <Feather name="thumbs-up" size={24} color="#BDBDBD" />
            </TouchableHighlight>
            <Text style={styles.numberOfLikes}>0</Text>
          </View>
        )}

        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.locitionIcon}
        />
        <Text
          style={styles.pressableText}
          onPress={() => navigation.navigate("Map")}
        >
          {country}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 34,
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
  textContainer: {
    margin: 0,
    padding: 0,
    marginBottom: 32,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
  image: {
    width: "100%",
    borderRadius: 16,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  pressableText: {
    color: "#212121",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    borderBottomWidth: 1,
    marginLeft: 4,
  },
  numberOfComments: {
    color: "#BDBDBD",
    marginLeft: 6,
  },
  numberOfLikes: {
    color: "#BDBDBD",
    marginLeft: 6,
    marginRight: "auto",
  },
  likesContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 14,
  },
  locitionIcon: {
    marginLeft: "auto",
  },
});
