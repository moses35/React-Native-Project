import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import UserPhoto from "../assets/images/userPhoto.jpg";
import { Publication } from "../components/Publication";
import { DATA } from "../data/data";

export const PostsScreen = () => {
  return (
    <SafeAreaView style={styles.postsContainer}>
      <View style={styles.publicationContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={DATA}
          renderItem={({ item }) => <Publication item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View style={styles.userContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={UserPhoto}
                  maxWidth={60}
                  maxHeight={60}
                  borderRadius={16}
                />
              </View>
              <View>
                <Text style={styles.textName}>Natali Romanova</Text>
                <Text style={styles.textEmail}>email@example.com</Text>
              </View>
            </View>
          }
        />
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
});
