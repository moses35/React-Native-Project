import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";

import Svg, { Rect, Path } from "react-native-svg";
import UserPhoto from "../assets/images/userPhoto.jpg";

export const PostsScreen = () => {
  return (
    <View style={styles.postsContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.text}>Публікації</Text>
        <TouchableHighlight
          onPress={() => null}
          style={styles.buttonLogOut}
          underlayColor="transparent"
        >
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M17 16L21 12L17 8"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Path
              d="M21 12H9"
              stroke="#BDBDBD"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </TouchableHighlight>
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
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Rect width="24" height="24" fill="white" />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 3H10V10H3V3Z"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 3H21V10H14V3Z"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 14H21V21H14V14Z"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 14H10V21H3V14Z"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.5 0.5H6.5V6.5H0.5V7.5H6.5V13.5H7.5V7.5H13.5V6.5H7.5V0.5Z"
                fill="white"
              />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="#212121"
                stroke-opacity="0.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
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
  bottomContainer: {
    flex: 1,
    width: "100%",
    maxHeight: 49,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 34,
    borderTopWidth: 1,
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
    backgroundColor: "#FF6C00",
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
  buttonLogOut: {
    position: "absolute",
    right: 16,
    bottom: 10,
  },
});
