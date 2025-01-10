import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TrafficLocation() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Traffic Location Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
