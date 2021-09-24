import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { WP } from "../Utils/utils";
import { checkinSelectors } from "../store/checkin/checkinSlice";

export default function LocationScreen() {
  const locationItem = ({ item }) => {
    console.log("item value: ", item);
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 25,
          paddingVertical: 10,
        }}
      >
        <FontAwesomeIcon
          style={{ paddingRight: 10 }}
          name="map-pin"
          size={WP(5.5)}
          color="rgb(197,67,56)"
        />
        <View>
          <Text style={styles.locationText}>{item.displayName}</Text>
          <Text style={styles.longlatText}>
            {item.pinPoint._latitude} °N , {item.pinPoint._longitude} °E
          </Text>
        </View>
      </View>
    );
  };

  const checkins = useSelector(checkinSelectors.selectAll);

  return (
    <View style={styles.container}>
      <FlatList
        data={checkins}
        renderItem={(item) => locationItem(item)}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 25,
  },
  detailContainer: {
    flex: 1,
    // margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  longlatText: {
    fontSize: WP(3.5),
    color: "grey",
    fontWeight: "500",
    // marginLeft: 6,
  },
  locationText: {
    fontSize: WP(4.5),
    color: "black",
    fontWeight: "500",
  },
});
