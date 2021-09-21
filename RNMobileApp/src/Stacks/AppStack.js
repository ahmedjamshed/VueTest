import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoadingScreen from '../Screen/LoadingScreen';
import {useSelector} from 'react-redux';
import HomeScreen from '../Screen/HomeScreen';
import LoginScreen from '../Screen/LoginScreen';
import TopTabStack from '../Stacks/TopTabStack';
const Stack = createNativeStackNavigator();

export default function AppStack() {
  const {user, isLoading} = useSelector(state => state.Counter);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoading ? (
          <Stack.Screen
            name="Loading"
            options={{headerShown: false}}
            component={LoadingScreen}
          />
        ) : user ? (
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={TopTabStack}
          />
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="Signin"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
