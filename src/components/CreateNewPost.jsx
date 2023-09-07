import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
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

export const CreateNewPost = () => {
  const navigation = useNavigation();
  const [text, setOnChangeText] = React.useState("");
  const [locationName, setOnChangeLocationName] = React.useState("");
  const [isDisebled, setIsDisebled] = React.useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    if (text === "" || locationName === "") {
      setIsDisebled(true);
    }
    if (text !== "" && locationName !== "") {
      setIsDisebled(false);
    }
  }, [text, locationName]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
    console.log(coords);
  };

  return (
    <View>
      <View style={styles.photoContainer}>
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
            <MaterialCommunityIcons
              style={styles.flipIcon}
              name="camera-flip-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addPhoto}
            onPress={async () => {
              if (cameraRef) {
                const { uri } = await cameraRef.takePictureAsync();
                await MediaLibrary.createAssetAsync(uri);
              }
            }}
          >
            <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </Camera>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
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
          await getLocation();
          navigation.navigate("PostsScreen");
        }}
      >
        <Text
          style={[isDisebled ? styles.buttonTextDisabled : styles.buttonText]}
        >
          Опубліковати
        </Text>
      </TouchableOpacity>
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
});
