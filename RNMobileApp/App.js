import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AppStack from './src/Stacks/AppStack';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {onAuthStateChange} from './src/Component/Counter';

const App = () => {
  const dispatch = useDispatch();
  const onAuthStateChanged = users => {
    dispatch(onAuthStateChange(users));
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return (
    <View style={styles.Container}>
      <AppStack />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
