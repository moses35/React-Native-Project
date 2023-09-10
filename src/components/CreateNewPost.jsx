import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";

import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

export const CreateNewPost = () => {
  const navigation = useNavigation();
  const [text, setOnChangeText] = React.useState("");
  const [locationName, setOnChangeLocationName] = React.useState("");
  const [isDisebled, setIsDisebled] = React.useState(true);
  const [isTrashBtnDisebled, setIsTrashBtnDisebled] = React.useState(true);
  const [loader, setLoader] = React.useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [imageFromGallery, setImageFromGallery] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();

        setHasPermission(status === "granted");
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (
      text === "" ||
      locationName === "" ||
      image === null ||
      imageFromGallery === null
    ) {
      setIsDisebled(true);
    }
    if (
      text !== "" &&
      locationName !== "" &&
      (image !== null || imageFromGallery !== null)
    ) {
      setIsDisebled(false);
    }
    if (
      text !== "" ||
      locationName !== "" ||
      image !== null ||
      imageFromGallery !== null
    ) {
      setIsTrashBtnDisebled(false);
    }
    if (
      text === "" &&
      locationName === "" &&
      image === null &&
      imageFromGallery === null
    ) {
      setIsTrashBtnDisebled(true);
    }
  }, [text, locationName, image, imageFromGallery]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(null);
        setImageFromGallery(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setOnChangeText("");
    setOnChangeLocationName("");
    setIsDisebled(true);
    setIsTrashBtnDisebled(true);
    setLoader(false);
    setType(Camera.Constants.Type.back);
    setImage(null);
    setImageFromGallery(null);
    setLocation(null);
  };

  return (
    <View style={styles.createNewPostContainer}>
      <View>
        <View style={styles.photoContainer}>
          {image && <Image source={image} style={styles.image} />}
          {imageFromGallery && (
            <Image source={{ uri: imageFromGallery }} style={styles.image} />
          )}
          {(image || imageFromGallery) && (
            <TouchableOpacity
              style={styles.addPhoto}
              onPress={() => {
                setImage(null);
                setImageFromGallery(null);
              }}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          )}

          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              {!loader && (
                <MaterialCommunityIcons
                  style={styles.flipIcon}
                  name="camera-flip-outline"
                  size={24}
                  color="#FFFFFF"
                />
              )}
            </TouchableOpacity>

            {loader ? (
              <ActivityIndicator
                color="#FFFFFF"
                size="large"
                style={styles.loader}
              />
            ) : (
              <TouchableOpacity
                style={styles.addPhoto}
                onPress={async () => {
                  try {
                    if (cameraRef) {
                      setLoader(true);
                      const { uri } = await cameraRef.takePictureAsync();
                      const asset = await MediaLibrary.createAssetAsync(uri);
                      setImage(asset);
                      setLoader(false);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            )}
          </Camera>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textUnderPhoto} onPress={() => pickImage()}>
            {image || imageFromGallery ? "Редагувати фото" : "Завантажте фото"}
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            onChangeText={setOnChangeText}
            value={text}
            placeholder="Назва..."
          />
          <View style={styles.inputLocationContainer}>
            <Feather
              style={styles.locationIcon}
              name="map-pin"
              size={24}
              color="#BDBDBD"
            />
            <TextInput
              style={styles.inputLocation}
              onChangeText={setOnChangeLocationName}
              value={locationName}
              placeholder="Місцевість..."
            />
          </View>
        </View>
        <TouchableOpacity
          style={[isDisebled ? styles.buttonDisabled : styles.button]}
          disabled={isDisebled}
          onPress={async () => {
            try {
              await getLocation();
              navigation.navigate("PostsScreen");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <Text
            style={[isDisebled ? styles.buttonTextDisabled : styles.buttonText]}
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            disabled={isTrashBtnDisebled}
            style={[
              isTrashBtnDisebled
                ? styles.buttonTrash
                : styles.buttonTrashActive,
            ]}
            onPress={() => reset()}
          >
            <Feather name="trash-2" size={24} color="#DADADA" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    marginBottom: 32,
  },
  input: {
    borderBottomColor: "#E8E8E8",
    height: 50,
    minWidth: "100%",
    borderBottomWidth: 1,
  },
  inputLocation: {
    borderBottomColor: "#E8E8E8",
    height: 50,
    minWidth: "100%",
    borderBottomWidth: 1,
    paddingLeft: 28,
  },
  inputLocationContainer: {
    justifyContent: "center",
  },
  locationIcon: {
    position: "absolute",
  },
  addPhoto: {
    position: "absolute",
    top: 90,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },
  textContainer: {
    margin: 0,
    padding: 0,
    marginBottom: 32,
  },
  textUnderPhoto: {
    color: "#BDBDBD",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
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
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonTextDisabled: {
    color: "#BDBDBD",
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    borderRadius: 16,
  },
  flipContainer: {
    flex: 1,
    alignSelf: "flex-end",
  },
  flipIcon: {
    marginTop: 10,
    marginRight: 10,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    maxHeight: 49,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 34,
    borderColor: "#BDBDBD",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 31,
    marginTop: 9,
    alignItems: "center",
  },
  buttonTrash: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTrashActive: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  createNewPostContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  image: {
    position: "relative",
    width: "100%",
    height: 240,
    borderRadius: 16,
  },
  loader: {
    position: "absolute",
    top: 90,
  },
});
