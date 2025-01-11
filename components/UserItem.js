import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function UserItem({ user, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{user.username}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
