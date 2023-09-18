import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { storage, auth, db } from "../../config";
import { getDownloadURL, ref } from "firebase/storage";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

export const Publication = ({
  showLikes = false,
  item,
  profileScreen = false,
  postOnPostsScreen,
  postOnProfileScreen,
}) => {
  const navigation = useNavigation();
  const [link, setLink] = React.useState(null);
  const [activeLike, setActiveLike] = React.useState(false);

  const {
    id,
    title = "No title",
    country = "No country",
    locationOnMap,
    url,
    comments,
    likes,
  } = item;

  const { uid } = auth.currentUser;
  let coord1 = 37.4219983;
  let coord2 = -122.084;

  const getlocationOnMap = () => {
    try {
      const { latitude, longitude } = locationOnMap;
      if (latitude && longitude) {
        coord1 = latitude;
        coord2 = longitude;
      }
    } catch (error) {}
  };

  getlocationOnMap();

  useEffect(() => {
    const func = async () => {
      const path = `/${url}`;
      try {
        const reference = ref(storage, path);
        await getDownloadURL(reference).then((link) => {
          setLink(link);
        });
      } catch (error) {
        console.log(error);
      }
    };

    func();
  }, [link, url]);

  useEffect(() => {
    const isLikeActive = likes.find((item) => item === uid);
    if (isLikeActive) {
      setActiveLike(true);
    } else {
      setActiveLike(false);
    }
  }, [likes]);

  return (
    <View
      style={[
        profileScreen
          ? styles.postContainerProfileScreen
          : styles.postContainerPostScreen,
      ]}
    >
      <View style={styles.photoContainer}>
        <Image source={{ uri: link }} style={styles.image} />
        {profileScreen && (
          <TouchableHighlight
            style={styles.deleteIcon}
            onPress={async () => {
              await deleteDoc(doc(db, "posts", id));
              postOnProfileScreen();
            }}
          >
            <Feather name="trash-2" size={24} color="#FFFFFF" />
          </TouchableHighlight>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <TouchableHighlight
          onPress={() => navigation.navigate("Comments", { id })}
          underlayColor="transparent"
        >
          <FontAwesome
            name="comment-o"
            size={24}
            color={comments.length > 0 ? "#FF6C00" : "#BDBDBD"}
          />
        </TouchableHighlight>
        <Text
          style={[
            comments.length > 0
              ? styles.numberOfCommentsActive
              : styles.numberOfComments,
          ]}
        >
          {comments.length}
        </Text>

        <View style={styles.likesContainer}>
          <TouchableHighlight
            onPress={async () => {
              if (activeLike) {
                const docRef = doc(db, "posts", id);
                await updateDoc(docRef, {
                  likes: arrayRemove(uid),
                });
                if (postOnPostsScreen) {
                  postOnPostsScreen();
                }
                if (postOnProfileScreen) {
                  postOnProfileScreen();
                }
              } else {
                const docRef = doc(db, "posts", id);
                await updateDoc(docRef, {
                  likes: arrayUnion(uid),
                });
                if (postOnPostsScreen) {
                  postOnPostsScreen();
                }
                if (postOnProfileScreen) {
                  postOnProfileScreen();
                }
              }
            }}
            underlayColor="transparent"
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={activeLike ? "#FF6C00" : "#BDBDBD"}
            />
          </TouchableHighlight>
          <Text
            style={[
              likes.length > 0
                ? styles.numberOfLikesActive
                : styles.numberOfLikes,
            ]}
          >
            {likes.length}
          </Text>
        </View>

        <Feather
          name="map-pin"
          size={24}
          color="#BDBDBD"
          style={styles.locitionIcon}
        />
        <Text
          style={styles.pressableText}
          onPress={() => navigation.navigate("Map", { coord1, coord2 })}
        >
          {country}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainerProfileScreen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  postContainerPostScreen: {
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
    flex: 1,
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
  numberOfCommentsActive: {
    color: "#212121",
    marginLeft: 6,
  },
  numberOfLikes: {
    color: "#BDBDBD",
    marginLeft: 6,
    marginRight: "auto",
  },
  numberOfLikesActive: {
    color: "#212121",
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
  deleteIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
