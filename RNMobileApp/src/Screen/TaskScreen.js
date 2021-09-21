import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function TaskScreen({userId}) {
  // const list = [];
  // function onResult(documentSnapshot) {
  //   if (documentSnapshot.exists) {
  //     // console.log('User data: ', documentSnapshot.data());
  //     // list.push(documentSnapshot.data());
  //   }
  // }
  // function onError(error) {
  //   console.error(error);
  // }
  // useEffect(() => {
  //   const subscriber = firestore()
  //     .collection('todos')
  //     .get()
  //     .onSnapshot(onResult, onError);
  //   return () => subscriber();
  // }, [userId]);
  return (
    <View style={{marginTop: 100}}>
      <Text>Task Screen</Text>
    </View>
  );
}
