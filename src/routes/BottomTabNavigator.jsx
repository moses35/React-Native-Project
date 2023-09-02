import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { PostsScreen } from "../screens/PostsScreen";
import { CreatePostsScreen } from "../screens/CreatePostsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export const BottomTabNavigator = () => {
  const Tabs = createBottomTabNavigator();

  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={() => ({
        tabBarStyle: {
          height: 80,
          paddingBottom: 31,
          paddingLeft: 90,
          paddingRight: 90,
        },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="grid" size={24} color="rgba(33, 33, 33, 0.8)" />
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
          tabBarIcon: () => (
            <View style={styles.buttonAdd}>
              <Feather name="plus" size={24} color="white" />
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
                  <Feather
                    name="plus"
                    size={24}
                    color="rgba(33, 33, 33, 0.8)"
                  />
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
