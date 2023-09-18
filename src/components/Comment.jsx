import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { getDownloadURL, ref } from "firebase/storage";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { storage, auth, db } from "../../config";
import { Feather } from "@expo/vector-icons";

export const Comment = ({ item, getComments }) => {
  const [image, setImage] = React.useState(null);
  const { uid } = auth.currentUser;
  const { postId, commentText, date, owner, photo } = item;

  useEffect(() => {
    const func = async () => {
      try {
        const reference = ref(storage, photo);
        await getDownloadURL(reference).then((link) => {
          setImage(link);
        });
      } catch (error) {
        console.log(error);
      }
    };

    func();
  }, [photo]);

  return (
    <View style={styles.userComments}>
      <View style={styles.userContainer}>
        {uid !== owner && (
          <Image style={styles.image} source={{ uri: image }} />
        )}
        <View style={styles.commentContainer}>
          <Text>{commentText}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {uid === owner && (
          <View style={styles.userBlock}>
            <Image style={styles.image} source={{ uri: image }} />
            <TouchableOpacity
              onPress={async () => {
                try {
                  const userComment = {
                    postId,
                    photo,
                    commentText,
                    date,
                    owner,
                  };

                  const docRef = doc(db, "posts", postId);
                  await updateDoc(docRef, {
                    comments: arrayRemove(userComment),
                  });
                  getComments();
                } catch (error) {}
              }}
            >
              <Feather name="trash-2" size={24} color="#212121" />
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  image: {
    flex: 1,
    maxWidth: 28,
    maxHeight: 28,
    borderRadius: 50,
  },
  userBlock: {
    width: 30,
    gap: 25,
  },
});
