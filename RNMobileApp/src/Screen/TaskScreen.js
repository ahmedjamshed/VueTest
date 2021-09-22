import React from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

export default function TaskScreen() {
  const tasks = useSelector((state) => state.todoSlice);
  console.log(tasks);
  return <Text style={{ marginTop: 100 }}>{JSON.stringify(tasks)}</Text>;
}
