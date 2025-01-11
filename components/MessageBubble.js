import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isSent }) {
  return (
    <View
      style={[styles.bubble, isSent ? styles.sentBubble : styles.receivedBubble]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    maxWidth: "80%",
  },
  sentBubble: {
    backgroundColor: "#d1e7dd",
    alignSelf: "flex-end",
  },
  receivedBubble: {
    backgroundColor: "#f8d7da",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
  },
});
