import { StyleSheet, Text, View } from "react-native";

export const EmptyComponent = () => {
  return (
    <View style={styles.emptyComponentContainer}>
      <Text style={styles.text}>Your posts will be here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyComponentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 30,
    textAlign: "center",
  },
});
