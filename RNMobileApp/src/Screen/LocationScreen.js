import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FirebaseUtils from '../Utils/FirebaseUtils';
import {useSelector} from 'react-redux';
export default function LocationScreen() {
  const {user} = useSelector(state => state.Counter);
  const SignOut = () => {
    FirebaseUtils.signout().catch(e => {
      console.log(e);
      alert('Something Went Wrong');
    });
  };
  return (
    <View style={{marginTop: 100}}>
      <Text>Location Screen</Text>
      <TouchableOpacity onPress={() => SignOut()}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  );
}
