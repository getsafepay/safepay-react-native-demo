import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

const Splash: React.FC<Props<'Splash'>> = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Home');
  }, 3000);
  return (
    <>
      <View style={styles.view}>
        <Image
          style={styles.myState}
          source={require('../assets/safepay.png')}
        />
        <Text style={styles.text}>Developed by Ehsaantech.com</Text>
      </View>
    </>
  );
};
export default Splash;

const styles = StyleSheet.create({
  myState: {
    resizeMode: 'contain',
    width: 'auto',
  },
  view: {
    marginTop: '50%',
  },
  text: {
    textAlign: 'center',
    marginTop: '90%',
    color: 'black',
    fontSize: 20,
  },
});
