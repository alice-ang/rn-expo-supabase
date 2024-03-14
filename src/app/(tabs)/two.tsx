import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

export default function TabTwoScreen() {
  const mapRef = useRef<any>();
  const [region, setRegion] = useState<Region | null>();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });

    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.041,
      longitudeDelta: 0.041,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={{
          latitude: 58.39118,
          longitude: 13.84506,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
