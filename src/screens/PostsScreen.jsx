import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Publication } from "../components/Publication";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectEmail,
  selectIsLoggedIn,
  selectName,
} from "../redux/authSlice";
import { useNavigation } from "@react-navigation/native";
import { storage, auth } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";
import { getData } from "../db/firestoreBase";
import { firebaseLogOut } from "../auth/auth";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectName);
  const [data, setData] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [link, setLink] = React.useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
      dispatch(logOut());
      firebaseLogOut();
    }
  }, [isLoggedIn]);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (!isLoggedIn) {
          return;
        }

        e.preventDefault();

        navigation.navigate("PostsScreen");
      }),
    [isLoggedIn]
  );
  const getPosts = async () => {
    try {
      const data = await getData();

      setData(data);
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const func = async () => {
      if (auth.currentUser) {
        const { photoURL } = auth.currentUser;
        setLink(photoURL);
      }
      try {
        const reference = ref(storage, link);
        await getDownloadURL(reference).then((userPhotolink) => {
          setImage(userPhotolink);
        });
      } catch (error) {}
    };

    func();
  }, [image, link]);

  return (
    <SafeAreaView style={styles.postsContainer}>
      <View style={styles.publicationContainer}>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <Publication item={item} postOnPostsScreen={getPosts} />
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <View style={styles.userContainer}>
                <View style={styles.imageContainer}>
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}
                </View>
                <View>
                  <Text style={styles.textName}>{userName}</Text>
                  <Text style={styles.textEmail}>{userEmail}</Text>
                </View>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: "row",
    gap: 8,
    height: 60,
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 32,
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
  image: {
    flex: 1,
    width: "100%",

    borderRadius: 16,
  },
});
