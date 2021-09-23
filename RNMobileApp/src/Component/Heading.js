import React from "react";
import { StyleSheet, Text } from "react-native";

export const Heading = (props) => {
  const { text } = props;

  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 16,
  },
});
