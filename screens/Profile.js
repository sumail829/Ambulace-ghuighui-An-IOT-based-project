import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useUser } from "../context/UserContext";

export default function Profile({ navigation }) {
  const { user, logout } = useUser(); // Access user details and logout function

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => {
        logout(); // Clear user data from context and storage
        navigation.navigate("Login"); // Redirect to login after logout
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: user?.profilePicture || "https://via.placeholder.com/150",
          }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>Name: {user?.name || "N/A"}</Text>
        <Text style={styles.detail}>Email: {user?.email || "N/A"}</Text>
        <Text style={styles.detail}>Phone: {user?.phone || "N/A"}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    marginVertical: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    padding: 15,
    backgroundColor: "#444",
    borderRadius: 5,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
  },
});
