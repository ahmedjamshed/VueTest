import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { todosSelectors } from "../store/todo/todoSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const TodoItem = (props) => {
  const { id } = props;
  const task = useSelector((state) => todosSelectors.selectById(state, id));

  return (
    <View style={styles.container}>
      <BouncyCheckbox
        isChecked={task.completed}
        onPress={(isChecked) => {
          console.log(isChecked);
        }}
      />
      <View style={{ flex: 1 }}>
        <Text>{task.summary}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },
});
