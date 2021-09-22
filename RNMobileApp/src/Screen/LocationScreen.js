import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

export default function LocationScreen() {
  const checkins = useSelector((state) => state.checkinSlice);
  console.log(checkins);
  return <Text style={{ marginTop: 100 }}>{JSON.stringify(checkins)}</Text>;
}

