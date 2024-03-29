import React, { useCallback, useState, useEffect } from "react";
import { Text, View, StyleSheet, SectionList } from "react-native";
import { useSelector } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { WP } from "../Utils/utils";
import { checkinSelectors } from "../store/checkin/checkinSlice";
import { Heading } from "../Component/Heading";
import Geolocation from "@react-native-community/geolocation";
import firebase from "@react-native-firebase/app";
import { upsertcheckin } from "../store/checkin/checkinSlice";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import { TouchableOpacity } from "react-native";
export default function LocationScreen() {
  const dispatch = useDispatch();
  const CheckInItem = useCallback((item) => {
    dispatch(upsertcheckin(item));
  }, []);
  const [currentData, setCurrentData] = useState({
    displayName: "",
    pinPoint: {
      latitude: 0,
      longitude: 0,
    },
  });
  const key = "pk.f3dfc2f41d80a467146ddf7a7e3ce040";

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        fetchCity(info.coords.latitude, info.coords.longitude);
      },
      (error) => {
        console.warn(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const fetchCity = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      setCurrentData({
        displayName: data.display_name,
        pinPoint: {
          latitude,
          longitude,
        },
      });
      //`${data.address.city ?? 'N/A' }, ${data.address.state ?? 'N/A'}, ${data.address.country ?? 'N/A'}`
    } catch (e) {
      console.log(e.meesage);
      return "Unknown";
    }
  };

  const AddCheckIn = () => {
    if (currentData) {
      CheckInItem({
        displayName: currentData.displayName,
        pinPoint: new firebase.firestore.GeoPoint(
          currentData.pinPoint.latitude,
          currentData.pinPoint.longitude
        ),
        timestamp: new Date().toISOString(), // remove in case of edit
        user: auth().currentUser.uid, // remove in case of edit
      });
    }
  };

  const locationItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 38,
          paddingVertical: 15,
        }}
      >
        <FontAwesomeIcon
          style={{ paddingRight: 15, marginTop: -60 }}
          name="map-pin"
          size={WP(5.5)}
          color="rgb(197,67,56)"
        />
        <View style={{ paddingTop: 0 }}>
          <Text style={styles.locationText}>{item.displayName}</Text>
          <Text style={styles.longlatText}>
            {item.pinPoint.latitude?.toFixed(2)} °N ,
            {item.pinPoint.longitude?.toFixed(2)} °E
          </Text>
        </View>
      </View>
    );
  };
  const renderSectionHeader = useCallback(
    ({ section: { title } }) => <Heading text={title} />,
    []
  );
  const renderListHeader = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          AddCheckIn();
        }}
      >
        <Heading text={"+ Check In"}></Heading>
      </TouchableOpacity>
    );
  };

  const checkins = useSelector(checkinSelectors.selectAll);

  const data = [
    {
      title: "Current Location",
      data: [currentData],
    },
    {
      title: "Prevoius Locations",
      data: checkins,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        ListHeaderComponent={renderListHeader()}
        sections={data}
        renderSectionHeader={renderSectionHeader}
        style={{ backgroundColor: "white" }}
        keyExtractor={(item) => item.id}
        renderItem={(item) => locationItem(item)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  longlatText: {
    fontSize: WP(4),
    color: "#9B9B9B",

    marginTop: 6,
  },
  locationText: {
    fontSize: WP(4.3),
    color: "black",
    lineHeight: 25,
  },
});
