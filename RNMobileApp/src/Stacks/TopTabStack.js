import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TaskScreen from "../Screen/TaskScreen";
import LocationScreen from "../Screen/LocationScreen";
import { SafeAreaView } from "react-native";
export default function TopTabStack() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Task"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarIndicatorStyle: {
            backgroundColor: "#fff",
          },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
          tabBarStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen
          name="Task"
          component={TaskScreen}
          options={{ tabBarLabel: "Task" }}
        />
        <Tab.Screen
          name="Location"
          component={LocationScreen}
          options={{ tabBarLabel: "Location" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
