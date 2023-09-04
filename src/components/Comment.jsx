import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import UserPhoto from "../assets/images/userPhoto.jpg";

export const Comment = ({ comments }) => {
  return (
    <View style={styles.userComments}>
      {comments.map(({ comment, date }) => (
        <View style={styles.userContainer}>
          <View style={styles.photoContainer}>
            <Image
              source={UserPhoto}
              maxWidth={28}
              maxHeight={28}
              borderRadius={50}
            />
          </View>
          <View style={styles.commentContainer}>
            <Text>{comment}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    gap: 8,
  },
  text: {
    alignContent: "center",
  },
  date: {
    marginLeft: "auto",
  },
  userContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  userComments: {
    paddingTop: 32,
  },
});
