import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Background } from "../components/Background";
import { Publication } from "../components/Publication";
import { SimpleLineIcons, Feather } from "@expo/vector-icons";
import UserPhoto from "../assets/images/userPhoto.jpg";
import { useNavigation } from "@react-navigation/native";
import { DATA } from "../data/data";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.profileContainer}>
      <Background>
        <FlatList
          style={styles.publicationsContainer}
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({ item }) => (
            <Publication item={item} profileScreen={true} showLikes={true} />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.registerContainer}>
              <TouchableOpacity
                style={styles.logOut}
                onPress={() => navigation.navigate("Login")}
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <View>
                <View style={styles.photoContainer}>
                  <Image
                    source={UserPhoto}
                    maxWidth={120}
                    maxHeight={120}
                    borderRadius={16}
                  />
                </View>
                <TouchableHighlight
                  onPress={() => null}
                  style={styles.buttonAdd}
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
              </View>
              <Text style={styles.text}>Natali Romanova</Text>
            </View>
          }
        />
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 32,
    textAlign: "center",
  },
  registerContainer: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 130,
  },

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
    right: -72,
    bottom: 46,
  },
  publicationsContainer: {
    flex: 1,
    width: "100%",
  },
  closeIcon: {
    borderRadius: 50,
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    minHeight: 83,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#BDBDBD",
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 31,
    alignItems: "center",
    marginBottom: 24,
  },
  button: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logOut: {
    position: "absolute",
    right: 16,
    top: 22,
  },
  profileContainer: {
    flex: 1,
  },
});
