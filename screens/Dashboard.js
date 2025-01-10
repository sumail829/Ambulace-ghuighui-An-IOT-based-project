import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Dashboard() {
  const ambulanceLocation = {
    latitude: 27.7172,  // Replace with actual coordinates
    longitude: 85.3240, // Replace with actual coordinates
    latitudeDelta: 0.01, 
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={ambulanceLocation}
      >
        <Marker
          coordinate={{
            latitude: ambulanceLocation.latitude,
            longitude: ambulanceLocation.longitude,
          }}
          title="Ambulance"
          description="Live ambulance location"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
