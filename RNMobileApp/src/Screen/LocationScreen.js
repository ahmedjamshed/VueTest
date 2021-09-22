import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default function LocationScreen() {
  return (
    <View style={{ marginTop: 100 }}>
      <Text>Location Screen</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}
