import React, { useCallback } from "react";
import auth from "@react-native-firebase/auth";
import { Pressable, SectionList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "../Component/Heading";
import { TodoItem } from "../Component/TodoItem";
import { todosSelectors, upsertTodo } from "../store/todo/todoSlice";

export default function TaskScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector(todosSelectors.selectAll);
  const inCompletedTasks = tasks.filter(
    (item) => (console.log(item), !item.completed)
  );
  const completedTasks = tasks.filter((item) => item.completed);
  const data = [
    {
      title: "Incomplete Tasks",
      data: inCompletedTasks,
    },
    {
      title: "Completed Tasks",
      data: completedTasks,
    },
  ];
  const addItem = useCallback((item) => {
    dispatch(upsertTodo(item));
  }, []);
  const renderItem = useCallback(
    ({ item }) => <TodoItem id={item.id}></TodoItem>,
    []
  );
  const renderSectionHeader = useCallback(
    ({ section: { title } }) => <Heading text={title} />,
    []
  );
  const renderListHeader = useCallback(
    () => (
      <Pressable
        onPress={() => {
          addItem({
            summary: "Add through",
            description: "desc",
            date: new Date().toISOString(),
            completed: false, // remove in case of edit
            timestamp: new Date().toISOString(), // remove in case of edit
            user: auth().currentUser.uid, // remove in case of edit
          });
        }}
      >
        <Heading text={"+ Add New Task"}></Heading>
      </Pressable>
    ),
    []
  );
  return (
    <SectionList
      ListHeaderComponent={renderListHeader}
      sections={data}
      renderSectionHeader={renderSectionHeader}
      style={{ backgroundColor: "white" }}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}
