import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import FirebaseUtils from '../Utils/FirebaseUtils';
import {useSelector} from 'react-redux';

export default function HomeScreen({navigation}) {
  const {user} = useSelector(state => state.Counter);
  const SignOut = () => {
    FirebaseUtils.signout().catch(e => {
      console.log(e);
      alert('Something Went Wrong');
    });
  };
  const [create, setCreate] = useState(true);
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.button} onPress={() => SignOut()}>
        <Text style={styles.buttontext}>logout</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    padding: 5,
    width: '100%',
    // paddingTop: Platform.OS === 'ios' ? 50 : 25,
  },

  // button: {
  //   backgroundColor: '#F05A22',
  //   padding: 10,
  //   marginBottom: 20,
  //   borderRadius: 15,
  //   fontWeight: '600',
  //   fontSize: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '20%',
  //   marginLeft: '62%',
  // },
  // buttontext: {
  //   fontWeight: '600',
  //   fontSize: 16,
  // },
});
