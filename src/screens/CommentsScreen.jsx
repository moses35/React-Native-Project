import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Comment } from "../components/Comment";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRoute } from "@react-navigation/native";
import { getData } from "../db/firestoreBase";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "../../config";

export const CommentsScreen = () => {
  const [text, onChangeText] = React.useState("");
  const [postComments, setPostComments] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const {
    params: { id },
  } = useRoute();

  const getComments = async () => {
    try {
      const data = await getData();
      const userComments = data.filter((doc) => {
        return doc.id === id;
      });

      const { comments, url } = userComments[0];
      setPostComments(comments);
      setImageUrl(url);
    } catch (error) {}
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const reference = ref(storage, imageUrl);
        await getDownloadURL(reference).then((link) => {
          setImage(link);
        });
      } catch (error) {}
    };

    func();
  }, [imageUrl]);

  const sendComment = async (text, id) => {
    try {
      const { photoURL, uid } = auth.currentUser;
      const time = Date.now();
      const today = new Date(time);

      const userComment = {
        postId: id,
        photo: photoURL,
        commentText: text,
        date: today.toLocaleString(),
        owner: uid,
      };

      const docRef = doc(db, "posts", id);
      await updateDoc(docRef, {
        comments: arrayUnion(userComment),
      });
      getComments();
    } catch (error) {}
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
        style={styles.keyboardView}
      >
        <SafeAreaView style={styles.commentsContainer}>
          <View style={styles.publicationContainer}>
            <View style={styles.comments}>
              <View style={styles.photoContainer}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={postComments}
              renderItem={({ item }) => (
                <Comment item={item} getComments={getComments} />
              )}
              keyExtractor={(item) => item.id}
            />
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Коментувати..."
              />
              <TouchableOpacity
                style={styles.iconArrowUp}
                onPress={async () => {
                  await sendComment(text, id);
                  onChangeText("");
                }}
              >
                <AntDesign name="arrowup" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    height: "100%",
  },
  publicationContainer: {
    flex: 1,
    paddingTop: 17,
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
    flex: 1,
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
