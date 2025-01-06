import React, { ReactNode, useEffect, useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { Text } from "../libs/Text";
import { View } from "../libs/View";
import { Image, useTheme } from "tamagui";
import { Car } from "../utils/assets-png";
import MapViewDirections from "react-native-maps-directions";
import { useAtom } from "jotai";
import { CurrentUserLocation } from "../atoms";
import { useGetRequests } from "../../api/queries";

const { width, height } = Dimensions.get("window");

interface LocationType {
  latitude: number;
  longitude: number;
}
type Props = {
  modalHeight?: number | string;
  children: ReactNode;
};

const Map = ({ modalHeight = 300, children }: Props) => {
  const [userLocation, setUserLocation] = useAtom(CurrentUserLocation);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentCustomerIndex, setCurrentCustomerIndex] = useState(0);

  const theme = useTheme();
  const { refetch, data } = useGetRequests();

  const generateCustomerLocations = (baseLocation: LocationType) => {
    return [
      {
        id: 1,
        name: "Customer 1",
        latitude: baseLocation.latitude + 0.005,
        longitude: baseLocation.longitude + 0.003,
      },
      {
        id: 2,
        name: "Customer 2",
        latitude: baseLocation.latitude + 0.007,
        longitude: baseLocation.longitude - 0.004,
      },
      {
        id: 3,
        name: "Customer 3",
        latitude: baseLocation.latitude - 0.006,
        longitude: baseLocation.longitude + 0.005,
      },
      {
        id: 4,
        name: "Customer 4",
        latitude: baseLocation.latitude - 0.008,
        longitude: baseLocation.longitude - 0.006,
      },
      {
        id: 5,
        name: "Customer 5",
        latitude: baseLocation.latitude + 0.004,
        longitude: baseLocation.longitude - 0.007,
      },
      {
        id: 6,
        name: "Customer 6",
        latitude: baseLocation.latitude + 0.009,
        longitude: baseLocation.longitude + 0.008,
      },
      {
        id: 7,
        name: "Customer 7",
        latitude: baseLocation.latitude - 0.007,
        longitude: baseLocation.longitude - 0.009,
      },
      {
        id: 8,
        name: "Customer 8",
        latitude: baseLocation.latitude + 0.006,
        longitude: baseLocation.longitude + 0.009,
      },
      {
        id: 9,
        name: "Customer 9",
        latitude: baseLocation.latitude - 0.009,
        longitude: baseLocation.longitude + 0.004,
      },
      {
        id: 10,
        name: "Customer 10",
        latitude: baseLocation.latitude + 0.003,
        longitude: baseLocation.longitude - 0.008,
      },
    ];
  };
  // const generateCustomerLocations = (baseLocation: LocationType) => {
  //   return [
  //     {
  //       id: 1,
  //       name: "Customer 1",
  //       latitude: baseLocation.latitude + 0.005,
  //       longitude: baseLocation.longitude + 0.003,
  //       heading: Math.random() * 360,
  //     },
  //     {
  //       id: 2,
  //       name: "Customer 2",
  //       latitude: baseLocation.latitude + 0.007,
  //       longitude: baseLocation.longitude - 0.004,
  //       heading: Math.random() * 360,
  //     },
  //     {
  //       id: 3,
  //       name: "Customer 3",
  //       latitude: baseLocation.latitude - 0.006,
  //       longitude: baseLocation.longitude + 0.005,
  //       heading: Math.random() * 360,
  //     },
  //   ];
  // };

  const [cars, setCars] = useState<
    {
      id: number;
      name: string;
      latitude: number;
      longitude: number;
    }[]
  >([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setUserLocation(currentLocation);
      setCars(generateCustomerLocations(currentLocation));
    })();
  }, []);

  if (!userLocation) {
    return null;
  }

  const currentCustomerLocation = cars[currentCustomerIndex];

  if (!currentCustomerLocation) {
    return (
      <View style={styles.container}>
        <Text fontFamily="$body" fontSize={14}>
          No customers found nearby.
        </Text>
      </View>
    );
  }

  const route = [userLocation, currentCustomerLocation];


  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { height: height }]}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        region={{
          latitude: currentCustomerLocation.latitude,
          longitude: currentCustomerLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={userLocation}>
          <View
            width={56}
            height={56}
            backgroundColor={theme.lightBlue?.val}
            justifyContent="center"
            alignItems="center"
            borderRadius={50}
          >
            <View
              width={32}
              height={32}
              backgroundColor={theme.white1?.val}
              justifyContent="center"
              alignItems="center"
              borderRadius={50}
            >
              <View style={styles.userMarker} />
            </View>
          </View>
        </Marker>

        {cars.map((car) => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
            // rotation={car.heading}
            // anchor={{ x: 0.5, y: 0.5 }}
            onPress={() =>
              setCurrentCustomerIndex(cars.findIndex((c) => c.id === car.id))
            }
          >
            <Image source={Car} style={styles.carImage} />
          </Marker>
        ))}

        <MapViewDirections
          origin={userLocation}
          destination={currentCustomerLocation}
          apikey={"AIzaSyBdxVEAejknQRZ-7cGbkg-lGVGKokK2-Ss"}
          strokeWidth={3}
          strokeColor="#0468F6"
          onReady={(result) => {
            // console.log(`Distance: ${result.distance} km`);
            // console.log(`Duration: ${result.duration} min`);
          }}
          onError={(errorMessage) => {
            console.log("Error with directions: ", errorMessage);
          }}
        />
      </MapView>

      <View style={styles.bottomSheet} height={modalHeight}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height - 150,
  },
  userMarker: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#0468F6",
  },
  carMarker: {
    width: 15,
    height: 15,
    backgroundColor: "gray",
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 50,
  },
  statusBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  inTransitBadge: {
    backgroundColor: "#FFA500",
    padding: 5,
    borderRadius: 5,
  },
  inTransitText: {
    color: "#fff",
    fontWeight: "bold",
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userDetails: {
    color: "gray",
  },
  carImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    color: "#0000FF",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default Map;
