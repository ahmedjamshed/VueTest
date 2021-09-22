import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "../Screen/LoadingScreen";
// import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from "../Screen/LoginScreen";
import TopTabStack from "../Stacks/TopTabStack";
import auth from "@react-native-firebase/auth";
import { fetchandTrackToDoItems } from "../store/todo/todoListener";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let todoListener;
    const subscriber = auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        todoListener = fetchandTrackToDoItems(dispatch);
        setLoading(false);
      }
    });
    return () => {
      subscriber();
      todoListener?.();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Loading"
            options={{ headerShown: false }}
            component={LoadingScreen}
          />
        ) : user ? (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={TopTabStack}
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signin"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
