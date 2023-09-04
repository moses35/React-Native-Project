import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { TopNavigator } from "./TopNavigator";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const BottomTabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  const checkScreenName = (route) => {
    const screenName = getFocusedRouteNameFromRoute(route) ?? "";
    if (screenName === "CommentsScreen") {
      return { display: "none" };
    }
    if (screenName === "Map") {
      return { display: "none" };
    } else {
      return {
        height: 80,
        paddingBottom: 31,
        paddingLeft: 90,
        paddingRight: 90,
      };
    }
  };

  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={({ route }) => ({
        tabBarStyle: checkScreenName(route),
      })}
    >
      <Tabs.Screen
        name="Posts"
        component={TopNavigator}
        options={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={styles.buttonAdd}>
                  <Feather name="grid" size={24} color="#FFFFFF" />
                </View>
              ) : (
                <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="CreatePost"
        component={CreatePostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <View style={styles.buttonAdd}>
                  <Feather name="plus" size={24} color="#FFFFFF" />
                </View>
              ) : (
                <Feather name="plus" size={24} color="rgba(33, 33, 33, 0.8)" />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                {focused ? (
                  <View style={styles.buttonAdd}>
                    <Feather name="user" size={24} color="#FFFFFF" />
                  </View>
                ) : (
                  <Feather
                    name="user"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                  />
                )}
              </View>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  buttonAdd: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
