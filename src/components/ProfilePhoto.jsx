import React, { useEffect } from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { storage } from "../../config";
import { updateUserPhoto } from "../auth/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { makePath } from "../helpers/makePath";
import { auth } from "../../config";

export const ProfilePhoto = ({ getImage, profile = false }) => {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function () {
            reject(new Error("uriToBlob failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.assets[0].uri, true);
          xhr.send(null);
        });

        const filename = makePath(30);
        const storageRef = ref(storage, filename);

        const path = await uploadBytes(storageRef, blob).then((snapshot) => {
          return snapshot.ref._location.path_;
        });
        await updateUserPhoto(path);
        getImage(path);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const func = async () => {
      try {
        if (auth.currentUser) {
          const { photoURL } = auth.currentUser;
          const reference = ref(storage, photoURL);
          await getDownloadURL(reference).then((userPhotolink) => {
            setImage(userPhotolink);
          });
        }
      } catch (error) {}
    };

    func();
  }, [setImage]);

  return (
    <View style={[profile ? styles.containerProfile : styles.container]}>
      <View
        style={[
          profile ? styles.photoContainerProfileScreen : styles.photoContainer,
        ]}
      >
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {image ? (
          <TouchableHighlight
            onPress={async () => {
              await updateUserPhoto("");
              setImage(null);
            }}
            style={[profile ? styles.buttonAddProfileScreen : styles.buttonAdd]}
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
        ) : (
          <TouchableHighlight
            onPress={() => pickImage()}
            style={[profile ? styles.buttonAddProfileScreen : styles.buttonAdd]}
            underlayColor="transparent"
          >
            <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
          </TouchableHighlight>
        )}
      </View>
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
    right: -12,
    bottom: 14,
  },
  photoContainerProfileScreen: {
    flex: 1,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  buttonAddProfileScreen: {
    flex: 1,
    position: "absolute",
    right: -12,
    bottom: 14,
  },
  container: {
    position: "absolute",
    top: 92,
    alignSelf: "center",
  },
  containerProfile: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
  },
  image: {
    flex: 1,
    width: "100%",
    overflow: "visible",
    objectFit: "cover",
    borderRadius: 16,
  },
  closeIcon: {
    borderRadius: 50,
  },
});
