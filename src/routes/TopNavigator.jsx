import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../screens/PostsScreen";
import { MapScreen } from "../screens/MapScreen";
import { Feather, AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CommentsScreen } from "../screens/CommentsScreen";
import { logOut, selectIsLoggedIn } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { firebaseLogOut } from "../auth/auth";

export const TopNavigator = () => {
  const TopTabs = createBottomTabNavigator();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TopTabs.Navigator initialRouteName="PostsScreen">
      <TopTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitle: () => <Text style={styles.title}>Публікації</Text>,
          headerStyle: {
            borderBottomWidth: 1,
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                dispatch(logOut());
                firebaseLogOut();
              }}
            >
              <Feather
                style={styles.logOut}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </TopTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  logOut: {
    marginRight: 16,
  },
  arrowLeft: {
    marginLeft: 16,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto_500Medium",
    fontSize: 17,
  },
});
