import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Background } from "../components/Background";
import { Publication } from "../components/Publication";
import { Feather } from "@expo/vector-icons";
import { firebaseLogOut } from "../auth/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectId,
  selectIsLoggedIn,
  selectName,
} from "../redux/authSlice";
import { ProfilePhoto } from "../components/ProfilePhoto";
import { getData } from "../db/firestoreBase";
import { useNavigation } from "@react-navigation/native";
import { EmptyComponent } from "../components/EmtyComponent";

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigation = useNavigation();
  const userName = useSelector(selectName);
  const [data, setData] = React.useState([]);
  const userId = useSelector(selectId);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate("Login");
      dispatch(logOut());
      firebaseLogOut();
    }
  }, [isLoggedIn]);

  const getPosts = async () => {
    try {
      const data = await getData();
      const userPosts = data.filter((doc) => {
        return doc.owner === userId;
      });

      setData(userPosts);
    } catch (error) {}
  };

  const scrollToTop = () => {
    ListRef.scrollToOffset({ offset: 170, animted: true });
  };

  useEffect(() => {
    getPosts();
    scrollToTop();
  }, []);

  return (
    <SafeAreaView style={styles.profileContainer}>
      <Background>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <Publication
              item={item}
              profileScreen={true}
              showLikes={true}
              postOnProfileScreen={getPosts}
            />
          )}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View
              style={[
                data.length > 1
                  ? styles.headerComponentContainerData
                  : styles.headerComponentContainer,
              ]}
            >
              <TouchableOpacity
                style={styles.logOut}
                onPress={() => {
                  dispatch(logOut());
                  firebaseLogOut();
                }}
              >
                <Feather name="log-out" size={24} color="#BDBDBD" />
              </TouchableOpacity>

              <ProfilePhoto profile={true} />

              <Text style={styles.text}>{userName}</Text>
            </View>
          }
          ListEmptyComponent={EmptyComponent}
          ref={(ref) => {
            ListRef = ref;
          }}
        />
      </Background>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "center",
  },
  headerComponentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "70%",
  },

  headerComponentContainerData: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "40%",
  },
  buttonAdd: {
    position: "absolute",
    right: -72,
    bottom: 46,
  },
  publicationsContainer: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "red",
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
    justifyContent: "flex-end",
  },
});
